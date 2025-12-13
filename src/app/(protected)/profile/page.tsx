// pages/profile.tsx
"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { AVATAR_FALLBACK } from "@/constants/app.constanst";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/services/profileService";
import { useFetchDropdownsQuery } from "@/services/dropdownService";
import { Button, message } from "antd";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ProfileEditModal from "@/components/sections/profile/ProfileEditModal";
import { Option } from "@/components/form/SelectField";
import ProfileCompletionCard from "@/components/cards/ProfileCompletionCard";
import CardLayout from "@/components/layouts/CardLayout";
import ContactCard from "@/components/cards/ContactCard";
import PreferencesCard from "@/components/cards/PreferencesCard";

export default function Profile() {
  const { data: profile, isLoading: loadingProfile, isError, refetch } = useGetProfileQuery();
  const [updateProfile, { isLoading: saving }] = useUpdateProfileMutation();

  const { data: dd = {
    trades: [],
    statuses: [],
    locations: [],
    roles: [],
    quals: [],
  }, isLoading: ddLoading } = useFetchDropdownsQuery();

  const [editVisible, setEditVisible] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  if (loadingProfile || ddLoading) {
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
    military_trade,       // e.g. "Infantry"
    service_status,       // e.g. "Complete Service"
    preferred_locations,  // string[]
    work_roles,           // string[]
    qualification,        // string
    service_start_date,   // ISO string
    service_end_date,     // ISO string
    created_at,           // ISO string
  } = profile || {};

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
    {
      id: 4,
      title: "Aadhaar",
      value: aadhaar,
      isPrivate: true,
    },
    {
      id: 5,
      title: "PAN",
      value: pan,
      isPrivate: true,
    },
    {
      id: 6,
      title: "Military Trade",
      value: military_trade,
      isPrivate: false,
    },
    {
      id: 7,
      title: "Service Status",
      value: service_status,
      isPrivate: false,
    },
    {
      id: 8,
      title: "Service Period",
      value: `${fmtDate(service_start_date)} – ${fmtDate(service_end_date)}`,
      isPrivate: false,
    },
    {
      id: 9,
      title: "Preferred Locations",
      value: preferred_locations.join(", "),
      isPrivate: false,
    },
    {
      id: 10,
      title: "Work Roles (Preferred)",
      value: work_roles.join(", "),
      isPrivate: false,
    },
    {
      id: 11,
      title: "Qualification",
      value: qualification,
      isPrivate: false,
    },
    {
      id: 12,
      title: "Joined On",
      value: fmtDate(created_at),
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
    military_trade_id: profile.military_trade,
    service_status,
    preferred_locations,
    work_roles,
    qualification,
    profile_pic_url: profile_pic_url ?? AVATAR_FALLBACK,
  };

  // Handler when modal form is submitted
  // const handleSave = async (values: any) => {
  //   const fd = new FormData();

  //   // only these keys get sent:
  //   const allowed = [
  //     "name",
  //     "contact",
  //     "military_trade_id",
  //     "service_status_id",
  //     "preferred_location_ids",
  //     "work_role_ids",
  //     "qualification_id",
  //     "aadhaar",
  //     "pan",
  //     "profile_pic",
  //   ];

  //   allowed.forEach(key => {
  //     const val = values[key];
  //     if (key === "profile_pic" && val) {
  //       console.log({ key, val });

  //       fd.append(key, val as Blob);
  //     } else if (Array.isArray(val)) {
  //       fd.append(key, val.join(","));
  //     } else if (val !== undefined && val !== null) {
  //       fd.append(key, String(val));
  //     }
  //   });

  //   try {
  //     await updateProfile(fd).unwrap();
  //     message.success("Profile updated successfully!");
  //     await refetch();
  //     setEditVisible(false);
  //   } catch (err) {
  //     console.error(err);
  //     message.error("Failed to update profile. Please try again.");
  //   }
  // };
  const allowedKeys = [
    "name",
    "contact",
    "military_trade_id",
    "service_status_id",
    "preferred_location_ids",
    "work_role_ids",
    "qualification_id",
    "aadhaar",
    "pan",
    "profile_pic",
  ];

  const handleSave = async (values: any) => {
    const fd = new FormData();
    allowedKeys.forEach(key => {
      const val = values[key];
      if (key === "profile_pic" && val) {
        fd.append(key, val as Blob);
      } else if (Array.isArray(val)) {
        fd.append(key, val.join(","));
      } else if (val != null) {
        fd.append(key, String(val));
      }
    });

    for (let [k, v] of fd.entries()) {
      console.log(k, v);
    }

    try {
      await updateProfile(fd).unwrap();
      message.success("Profile updated successfully!");
      await refetch();
      setEditVisible(false);
    } catch (err) {
      console.error(err);
      message.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <DashboardLayout>
      <div className="grid grid-cols-6 gap-2 h-full min-h-0">
        <div className="col-span-4 space-y-6 pr-4">
          {!loadingProfile && <ProfileCompletionCard avatarImg={profile_pic_url ?? AVATAR_FALLBACK} email={email ?? ""} username={name ?? ""} trade={military_trade ?? ""} serviceStart={service_start_date ?? 0} serviceEnd={service_end_date ?? 0} />}
          <ContactCard email={email ?? ""} location="" phone={contact ?? 0} editProfile={() => setEditVisible(true)} />

          <CardLayout
            header={
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">More Detail</h3>
                <Button
                  onClick={() => setDetailsOpen(o => !o)}
                  aria-label={detailsOpen ? "Collapse details" : "Expand details"}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  {detailsOpen ? <FaChevronUp /> : <FaChevronDown />}
                </Button>
              </div>
            }
          >
            <div
              className={`
      overflow-hidden transition-[max-height] duration-300
      ${detailsOpen ? 'max-h-96' : 'max-h-0'}
    `}
            >
              <div className="grid grid-cols-2 gap-2 text-sm">
                {userData?.map(({ id, title, value, isPrivate }) => {
                  const display =
                    isPrivate && typeof value === "string"
                      ? maskValue(value)
                      : value;
                  return (
                    <div
                      key={id}
                      className="flex space-x-2 rounded-xl col-span-2"
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
          </CardLayout>

        </div>
        {/* <div className="col-span-2 self-start">
          <div className="sticky top-6">
            <PreferencesCard />
          </div>
        </div> */}
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
