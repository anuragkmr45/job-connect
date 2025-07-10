'use client';

import { useRef } from 'react';
import Slider from 'react-slick';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import CustomCarousel from '@/components/CustomCarousel';
import JobListingCard from '@/components/cards/JobListingCard';
import { Job } from '@/types/job';

interface FeatureJobCarouselProps {
    featuredJobs: Job[];
}

export default function FeatureJobCarousel({ featuredJobs }: FeatureJobCarouselProps) {
    const sliderRef = useRef<Slider>(null);

    const handlePrev = () => sliderRef.current?.slickPrev();
    const handleNext = () => sliderRef.current?.slickNext();

    return (
        <section className="max-w-6xl mx-auto">
            {/* Header row: title + buttons */}
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-semibold">Featured Opportunities</h2>

                <div className="flex gap-2">
                    <button
                        onClick={handlePrev}
                        className="rounded-full p-2 bg-gray-100 hover:bg-gray-200"
                        aria-label="Previous jobs"
                    >
                        <IoChevronBack />
                    </button>
                    <button
                        onClick={handleNext}
                        className="rounded-full p-2 bg-gray-100 hover:bg-gray-200"
                        aria-label="Next jobs"
                    >
                        <IoChevronForward />
                    </button>
                </div>
            </div>

            {/* Carousel itself */}
            <CustomCarousel
                ref={sliderRef}          // 🔗 gives our buttons control
                slidesToShow={2}
                arrows={false}           // hide built-ins → we’re using custom ones
                dots={false}
                infinite
                autoplay
                className="px-1"
            >
                {featuredJobs?.map((job) => (
                    <div key={job.id} className="px-2">
                        <JobListingCard data={job} />
                    </div>
                ))}
            </CustomCarousel>
        </section>
    );
}
