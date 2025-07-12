// components/JobDetailsModal.tsx
"use client";

import React from 'react';
import CustomModal from './../CustomModal';
import { Job } from '@/types/job';
import { Button } from 'antd';

interface JobDetailsModalProps {
    visible: boolean;
    onClose: () => void;
    job: Job;
    /** Optional overrides */
    width?: string | number;
    height?: string | number;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
    visible,
    onClose,
    job,
    width = "60%",
    height = "400px",
}) => {
    const { id: jobId, title, company: { display_name: companyDisplayName }, location: { display_name: locationDisplayName }, salary_min, salary_max, redirect_url: applyLink, created, category: { label: catLabel, tag: catTag }, description } = job || {}
    console.log({ job });

    return (
        <CustomModal
            visible={visible}
            onClose={onClose}
            width={width}
            height={height}
            header={
                <div>
                    <h2 className="font-semibold text-2xl">Job Description: <span className='text-[#1E293B]'>{title}</span> </h2>
                    <span className='border border-[#1E293B] px-2 py-1 rounded-full text-xs'>{catLabel}</span>
                </div>
            }
            footer={
                <div className="flex justify-end space-x-4">
                    <Button
                        type='default'
                        onClick={onClose}
                        className="px-4 py-2 mx-6 rounded bg-gray-200 hover:bg-gray-300"
                    >
                        Close
                    </Button>
                    <Button
                        onClick={() => { window.open(applyLink, '_blank') }}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        type='primary'
                    >
                        More Details
                    </Button>
                </div>
            }
        >
            <div className="space-y-4">
                <p>
                    <strong>Company Name:</strong>{" "}
                    {companyDisplayName}
                </p>
                <div>
                    <h3>Job Description</h3>
                    <article>{description}</article>
                </div>
                <p>
                    <strong>Posted:</strong>{" "}
                    {new Date(created).toLocaleDateString()}
                </p>
                <p>
                    <strong>Location:</strong> {locationDisplayName}
                </p>
                <p>
                    <strong>Salary:</strong>{" "}
                    {salary_min && salary_max
                        ? `$${salary_min} – $${salary_max}`
                        : salary_max
                            ? `$${salary_max}`
                            : salary_min
                                ? `$${salary_min}`
                                : "N/A"}
                </p>
                {/* Add more details here as needed */}
            </div>
        </CustomModal>
    );
};

export default JobDetailsModal;
