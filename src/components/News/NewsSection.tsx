"use client";

import { useEffect, useState } from "react";

const NewsSection = () => {
    const newsItems = [
        "New MoU signed with Indian Army for facilitating defense-to-civilian career transitions.",
        "Exclusive partnership with Air Force Welfare Board to support veterans in aerospace roles.",
        "Launch of Navy-to-Tech initiative connecting naval engineers with leading IT companies.",
        "MoU with Ministry of Defence contractors to prioritize hiring of ex-servicemen.",
        "Army Skill Development Program introduces AI-driven upskilling for retiring soldiers.",
        "Veteran Entrepreneurship Fund launched to support ex-servicemen starting businesses.",
        "Collaboration with defense universities to offer scholarships for military families.",
        "Cybersecurity reskilling bootcamps opened for veterans transitioning into IT security.",
        "Special hiring drive announced for ex-servicemen in logistics and supply chain firms.",
        "New wellness and career counseling centers inaugurated for retired officers and JCOs.",
        "Defense contractors pledge 20% workforce quota for qualified veterans.",
        "Partnership with global aviation firms to recruit Air Force veterans into pilot training.",
        "Launch of Women in Uniform program supporting female veterans in STEM careers.",
        "MoU with railways to provide priority recruitment to ex-army personnel.",
        "SkillBridge initiative rolled out to match veterans with Fortune 500 companies.",
        // Notifications
        "New VA Benefits Update: Enhanced education benefits now available for all veterans (2 hours ago).",
        "Tech Sector Growth: Cybersecurity roles increased by 45% this quarter (5 hours ago).",
        "Military Skills Translation: New certification program launched for translating military experience (1 day ago).",
        "Virtual Career Fair: Major defense contractors hiring - Register by March 15th (2 days ago).",

        // Job News
        "Lockheed Martin Expands Veteran Hiring Initiative: Company commits to hiring 5,000 veterans over next two years across all divisions. (3 hours ago).",
        "Cybersecurity Skills in High Demand: Military cybersecurity professionals seeing 30% salary increases in civilian roles. (6 hours ago).",
        "Federal Hiring Preference Updates: New guidelines for veteran preference in federal job applications announced. (1 day ago).",
        "Free Certification Programs Available: Microsoft and Amazon offering free cloud certifications for veterans. (2 days ago)."
    ];


    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % newsItems.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [newsItems.length]);

    return (
        <div className="p-4 bg-[#fff7f7]">
            <h3 className="text-lg font-semibold text-gray-700 rounded-2xl">
                What's New
            </h3>
            <div className="!h-96 overflow-hidden relative">
                <div
                    className="transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateY(-${index * 6}rem)` }} // Adjust based on row height
                >
                    {newsItems.map((item, i) => (
                        <div
                            key={i}
                            className="h-24 flex items-center border-b border-slate-200 px-2 text-slate-700 hover:text-indigo-600 cursor-pointer"
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsSection;
