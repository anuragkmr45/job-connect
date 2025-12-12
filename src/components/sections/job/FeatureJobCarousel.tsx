'use client';

import { useRef } from 'react';
import Slider from 'react-slick';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import CustomCarousel from '@/components/CustomCarousel';
import JobListingCard from '@/components/cards/JobListingCard';
import { Job } from '@/types/job';
import { Button } from 'antd';

interface FeatureJobCarouselProps {
    featuredJobs: Job[];
    cardBg?: string
}

export default function FeatureJobCarousel({ featuredJobs, cardBg }: FeatureJobCarouselProps) {
    const sliderRef = useRef<Slider>(null);

    const handlePrev = () => sliderRef.current?.slickPrev();
    const handleNext = () => sliderRef.current?.slickNext();

    return (
        <section className="mx-auto">
            {/* Header row: title + buttons */}
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl text=[#1E293B] font-semibold">Featured Opportunities</h2>

                <div className="flex gap-2">
                    <Button
                        onClick={handlePrev}
                        className="rounded-full p-2 bg-gray-100 hover:bg-gray-200"
                        aria-label="Previous jobs"
                        type='default'
                    >
                        <IoChevronBack />
                    </Button>
                    <Button
                        onClick={handleNext}
                        className="rounded-full p-2 bg-gray-100 hover:bg-gray-200"
                        aria-label="Next jobs"
                        type='default'
                    >
                        <IoChevronForward />
                    </Button>
                </div>
            </div>

            {/* Carousel itself */}
            <CustomCarousel
                ref={sliderRef}
                slidesToShow={3}
                arrows={false}
                dots={false}
                infinite
                autoplay
                className="max-h-96"
            >
                {featuredJobs?.map((job) => (
                    <div key={job.id} className="px-2">
                        <JobListingCard data={job} cardBg={cardBg} />
                    </div>
                ))}
            </CustomCarousel>
        </section>
    );
}
