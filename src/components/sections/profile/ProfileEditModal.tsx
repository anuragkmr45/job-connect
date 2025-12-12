"use client";

import React, { useRef, useState, useEffect } from "react";
import { Modal, Button, Form, message } from "antd";
import Image from "next/image";
import { FaRegEdit } from "react-icons/fa";

import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/SelectField";
import { AVATAR_FALLBACK } from "@/constants/app.constanst";

export interface Option {
    value: number | string;
    label: string;
}

export interface ProfileEditModalProps {
    /** whether the modal is visible */
    visible: boolean;
    /** callback for closing */
    onCancel: () => void;
    /** initial form values (just pass the same shape you were using before) */
    initialValues: {
        name: string;
        email: string;
        contact: string;
        aadhaar: string;
        pan: string;
        military_trade_id?: string | number;
        service_status?: string | number;
        qualification?: string | number;
        preferred_locations?: string[] | number[];
        work_roles?: string[] | number[];
        service_status_id?: number;
        preferred_location_ids?: number[];
        work_role_ids?: number[];
        qualification_id?: number;
        /** pass the existing URL so the preview shows it */
        profile_pic_url?: string;
    };
    /** submit handler: receives plain-form values */
    onFinish: (values: any) => void;
    /** whether the “Save” button shows loading */
    saving: boolean;
    /** dropdown options from your page */
    tradeOptions: Option[];
    statusOptions: Option[];
    qualOptions: Option[];
    locOptions: Option[];
    roleOptions: Option[];
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
    visible,
    onCancel,
    initialValues,
    onFinish,
    saving,
    tradeOptions,
    statusOptions,
    qualOptions,
    locOptions,
    roleOptions,
}) => {
    const [form] = Form.useForm();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState(
        initialValues.profile_pic_url ?? AVATAR_FALLBACK
    );

    useEffect(() => {
        if (visible) {
            form.resetFields();

            const findValueByLabel = (options: Option[], value: string | number | undefined): string | number | undefined => {
                if (value === undefined) return undefined;
                if (typeof value === 'number') return value;
                return options.find(opt => opt.label === value)?.value;
            };

            const findValuesByLabels = (options: Option[], values: (string | number)[] | undefined): (string | number)[] => {
                if (!values || !Array.isArray(values)) return [];
                return values
                    .map(value => {
                        if (typeof value === 'number') return value;
                        return options.find(opt => opt.label === value)?.value;
                    })
                    .filter((val): val is string | number => val !== undefined);
            };

            form.setFieldsValue({
                name: initialValues.name,
                email: initialValues.email,
                contact: initialValues.contact,
                aadhaar: initialValues.aadhaar,
                pan: initialValues.pan,
                military_trade_id: findValueByLabel(tradeOptions, initialValues.military_trade_id),
                service_status_id: findValueByLabel(statusOptions, initialValues.service_status),
                qualification_id: findValueByLabel(qualOptions, initialValues.qualification),
                preferred_location_ids: findValuesByLabels(locOptions, initialValues.preferred_locations),
                work_role_ids: findValuesByLabels(roleOptions, initialValues.work_roles),
                profile_pic: undefined,
            });
            setPreview(initialValues.profile_pic_url ?? AVATAR_FALLBACK);
        }
    }, [visible, initialValues, form]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        // form.setFieldValue({profile_pic: file});
        form.setFieldValue("profile_pic", file);
        setPreview(URL.createObjectURL(file));
    };

    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            footer={null}
            width="60%"
            title="Edit Profile"
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <InputField name="name" label="Name" placeholder="Full name" />
                <InputField
                    name="email"
                    label="Email"
                    type="email"
                    isDisabled
                />
                <InputField
                    name="contact"
                    label="Contact"
                    placeholder="+91-..."
                />
                <InputField
                    name="aadhaar"
                    label="Aadhaar"
                    placeholder="1234-5678-9012"
                />
                <InputField
                    name="pan"
                    label="PAN"
                    placeholder="ABCDE1234F"
                />

                <SelectField
                    name="military_trade_id"
                    label="Trade"
                    options={tradeOptions}
                    placeholder="Select your trade"
                />
                <SelectField
                    name="service_status_id"
                    label="Service Status"
                    options={statusOptions}
                    placeholder="Select status"
                />
                <SelectField
                    name="qualification_id"
                    label="Qualification"
                    options={qualOptions}
                    placeholder="Select qualification"
                />

                <SelectField
                    name="preferred_location_ids"
                    label="Preferred Locations"
                    options={locOptions}
                    mode="multiple"
                    placeholder="Pick up to 3"
                    maxCount={3}
                />
                <SelectField
                    name="work_role_ids"
                    label="Work Roles"
                    options={roleOptions}
                    mode="multiple"
                    placeholder="Pick your roles"
                    maxCount={5}
                />

                {/* Profile Picture */}
                {/* <Form.Item name="profile_pic" label="Profile Picture">
                    <div className="flex flex-col items-start">
                        <img
                            src={preview}
                            alt="Profile Preview"
                            className="w-28 h-28 rounded-full cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                    </div>
                </Form.Item> */}

                <div style={{ textAlign: "right" }}>
                    <Button
                        type="primary"
                        onClick={() => form.submit()}
                        loading={saving}
                    >
                        Save Changes
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default ProfileEditModal;
