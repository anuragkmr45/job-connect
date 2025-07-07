// pages/profile.tsx
"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { AVATAR_FALLBACK } from "@/constants/app.constanst";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/services/profileService";
import { useFetchDropdownsQuery } from "@/services/dropdownService";
import { Button, message } from "antd";
import Image from "next/image";
import { FaRegEdit } from "react-icons/fa";
import ProfileEditModal from "@/components/sections/profile/ProfileEditModal";

export default function Profile() {
  const { data: profile, isLoading, isError, refetch } = useGetProfileQuery();
  const [updateProfile, { isLoading: saving }] = useUpdateProfileMutation();
  const { data: dd, isLoading: ddLoading } = useFetchDropdownsQuery();

  const [editVisible, setEditVisible] = useState(false);

  if (isLoading || ddLoading) {
    return (
      <DashboardLayout>
        <p>Loading your profile…</p>
      </DashboardLayout>
    );
  }
  if (isError || !profile) {
    return (
      <DashboardLayout>
        <p>Sorry, we couldn’t load your profile. Please try again later.</p>
      </DashboardLayout>
    );
  }

  // Destructure for display
  const {
    profile_pic_url,
    name,
    email,
    contact,
    aadhaar,
    pan,
    service_status_id,
    preferred_location_ids,
    work_role_ids,
    qualification_id,
    service_start_date,
    service_end_date,
    created_at,
  } = profile;

  // Utilities for display
  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  const maskValue = (val: string) =>
    val.length <= 4 ? val : "*".repeat(val.length - 4) + val.slice(-4);

  const userData = [
    { id: 1, title: "Contact", value: contact, isPrivate: false },
    { id: 2, title: "Aadhaar", value: aadhaar, isPrivate: true },
    { id: 3, title: "PAN", value: pan, isPrivate: true },
    { id: 4, title: "Service Status", value: service_status_id, isPrivate: false },
    {
      id: 5,
      title: "Service Period",
      value: `${fmtDate(service_start_date)} – ${fmtDate(service_end_date)}`,
      fullWidth: true,
      isPrivate: false,
    },
    {
      id: 6,
      title: "Preferred Locations",
      value: preferred_location_ids?.join(", ") || "—",
      isPrivate: false,
    },
    {
      id: 7,
      title: "Work Roles",
      value: work_role_ids?.join(", ") || "—",
      isPrivate: false,
    },
    { id: 8, title: "Qualification", value: qualification_id, isPrivate: false },
    {
      id: 9,
      title: "Joined On",
      value: fmtDate(created_at),
      fullWidth: true,
      isPrivate: false,
    },
  ];

  // Prepare dropdown options
  const tradeOptions: Option[] = dd.trades.map(t => ({ value: t.id, label: t.name }));
  const statusOptions: Option[] = dd.statuses.map(s => ({ value: s.id, label: s.name }));
  const qualOptions: Option[] = dd.quals.map(q => ({ value: q.id, label: q.stream }));
  const locOptions: Option[] = dd.locations.map(l => ({ value: l.id, label: l.name }));
  const roleOptions: Option[] = dd.roles.map(r => ({ value: r.id, label: r.name }));

  // Build initialValues shape for the modal
  const initialValues = {
    name,
    email,
    contact,
    aadhaar,
    pan,
    military_trade_id: profile.military_trade_id,
    service_status_id,
    preferred_location_ids,
    work_role_ids,
    qualification_id,
    profile_pic_url: profile_pic_url ?? AVATAR_FALLBACK,
  };

  // Handler when modal form is submitted
  const handleSave = async (values: any) => {
    const fd = new FormData();
    Object.entries(values).forEach(([key, val]) => {
      if (key === "profile_pic" && val) {
        fd.append(key, val as Blob);
      } else if (Array.isArray(val)) {
        fd.append(key, val.join(","));
      } else {
        fd.append(key, val as string);
      }
    });

    try {
      await updateProfile(fd).unwrap();
      message.success("Profile updated successfully!");
      setEditVisible(false);
      refetch();
    } catch (err) {
      console.error(err);
      message.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto space-y-6 p-6 bg-white rounded-lg shadow">
        {/* Avatar + Name/Email/Edit Button */}
        <div className="flex items-center space-x-4">
          <Image
            src={profile_pic_url || AVATAR_FALLBACK}
            alt={name}
            width={120}
            height={120}
            className="rounded-full"
          />
          <div className="flex justify-between items-center w-full">
            <div>
              <h1 className="text-2xl font-semibold">{name}</h1>
              <p className="text-gray-500">{email}</p>
            </div>
            <Button onClick={() => setEditVisible(true)} type="default">
              <FaRegEdit />
            </Button>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          {userData.map(({ id, title, value, fullWidth, isPrivate }) => {
            const display =
              isPrivate && typeof value === "string"
                ? maskValue(value)
                : value;
            return (
              <div
                key={id}
                className={`flex space-x-2 rounded-xl ${fullWidth ? "col-span-2" : ""
                  }`}
              >
                <h3 className="font-medium bg-gray-200 rounded-tl-xl rounded-bl-xl px-3 py-2">
                  {title}
                </h3>
                <span className="px-3 py-2 rounded-tr-xl rounded-br-xl">
                  {display}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Modal */}
      <ProfileEditModal
        visible={editVisible}
        onCancel={() => setEditVisible(false)}
        initialValues={initialValues}
        onFinish={handleSave}
        saving={saving}
        tradeOptions={tradeOptions}
        statusOptions={statusOptions}
        qualOptions={qualOptions}
        locOptions={locOptions}
        roleOptions={roleOptions}
      />
    </DashboardLayout>
  );
}
