
import JobListingCard from "@/components/cards/JobListingCard";
import { Job } from "@/types/job";
import { Button } from "antd";
import Link from "next/link";

const Index = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <HeroSection />
            <FeaturesSection />
            <JobsSection />
            <NewsNotifications />
            <Footer />
        </div>
    );
};

export default Index;

const Header = () => {
    return (
        <header className="bg-indigo-600 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center">
                        <span className="text-indigo-800 font-bold text-xl">JC</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Job Connect</h1>
                        <p className="text-sm/5 opacity-90">
                            AI-Powered Military Career Portal
                        </p>
                    </div>
                </div>
                <nav className="hidden md:flex items-center space-x-6">
                    <a href="#jobs" className="hover:text-amber-300 transition-colors">
                        Jobs
                    </a>
                    <a href="#about" className="hover:text-amber-300 transition-colors">
                        About
                    </a>
                    <a href="#news" className="hover:text-amber-300 transition-colors">
                        News
                    </a>
                    <Link href='/signin'>
                        <Button
                            size="large"
                            type="default"
                            className="border border-white text-white hover:!bg-white hover:!text-indigo-700"
                        >
                            Sign In
                        </Button>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

const HeroSection = () => {
    return (
        <section className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                    Your Next Mission:
                    <span className="text-amber-300"> Career Success</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
                    AI-powered job matching for military personnel. Find your perfect role
                    in civilian careers, government positions, and defense contractors.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href='/signup'>
                        <Button
                            size="large"
                            type="primary"
                            className="!bg-amber-400 !border-amber-400 !text-indigo-900 hover:!bg-amber-500 text-lg px-8 py-5"
                        >
                            Find Your Next Role
                        </Button>
                    </Link>
                    <Button
                        size="large"
                        type="default"
                        className="border border-white text-white hover:!bg-white hover:!text-indigo-700 text-lg px-8 py-5"
                    >
                        Browse Companies
                    </Button>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <h3 className="text-3xl font-bold text-amber-300">50,000+</h3>
                        <p className="text-white/90">Active Job Listings</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-amber-300">15,000+</h3>
                        <p className="text-white/90">Veterans Placed</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-amber-300">500+</h3>
                        <p className="text-white/90">Partner Companies</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const FeaturesSection = () => {
    const features = [
        {
            title: "AI-Powered Matching",
            description:
                "Our advanced AI analyzes your military experience and matches you with roles that value your unique skills.",
        },
        {
            title: "Security Clearance Jobs",
            description:
                "Access exclusive opportunities requiring security clearances that leverage your military background.",
        },
        {
            title: "Skills Translation",
            description:
                "Automatically translate military skills and experience into civilian-friendly terms for your resume.",
        },
        {
            title: "Veteran Network",
            description:
                "Connect with other veterans who have successfully transitioned to civilian careers.",
        },
        {
            title: "Career Coaching",
            description:
                "Get personalized career coaching from experts who understand military-to-civilian transitions.",
        },
        {
            title: "Interview Prep",
            description:
                "Prepare for civilian interviews with tailored coaching and practice sessions.",
        },
    ];

    return (
        <section id="about" className="py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-indigo-700 mb-4">
                        Built for Military Professionals
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        We understand the unique challenges of transitioning from military
                        to civilian careers. Our platform is designed specifically to help
                        you succeed.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="text-center rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 border-t-4 border-t-indigo-600"
                        >
                            <div className="mx-auto w-16 h-16 bg-indigo-600/10 rounded-full flex items-center justify-center mb-4">
                                <span className="text-2xl text-indigo-600" aria-hidden="true">
                                    ★
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-slate-900">
                                {feature.title}
                            </h3>
                            <p className="text-slate-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const JobsSection = () => {
    const featuredJobs: Job[] = [
        {
            id: "1",
            title: "Cybersecurity Specialist",
            description:
                "Lead cybersecurity initiatives for defense contracts. Military experience preferred.",
            redirect_url: "/signin",
            adref: "CYBERSEC-LOCKHEED-1",
            contract_type: "Full Time",
            contract_time: "Permanent",
            salary_min: 85000,
            salary_max: 120000,
            salary_is_predicted: "0",
            created: "2025-08-13T10:00:00Z",
            latitude: 38.9072,
            longitude: -77.0369,
            category: { label: "Cybersecurity", tag: "Cybersecurity" },
            company: { display_name: "Lockheed Martin" },
            location: { display_name: "Washington, DC", area: [] },
        },
        {
            id: "2",
            title: "Operations Manager",
            description:
                "Manage complex operations for aerospace defense programs. Leadership experience required.",
            redirect_url: "/signin",
            adref: "OPS-BOEING-2",
            contract_type: "Full Time",
            contract_time: "Permanent",
            salary_min: 95000,
            salary_max: 130000,
            salary_is_predicted: "0",
            created: "2025-08-13T10:00:00Z",
            latitude: 47.6062,
            longitude: -122.3321,
            category: { label: "Cybersecurity", tag: "Cybersecurity" },
            company: { display_name: "Lockheed Martin" },
            location: { display_name: "Washington, DC", area: [] },
        },
        {
            id: "3",
            title: "Project Manager",
            description:
                "Oversee defense contractor projects. PMP certification and military background preferred.",
            redirect_url: "/signin",
            adref: "PM-GENDYNAMICS-3",
            contract_type: "Full Time",
            contract_time: "Permanent",
            salary_min: 80000,
            salary_max: 110000,
            salary_is_predicted: "0",
            created: "2025-08-13T10:00:00Z",
            latitude: 36.8508,
            longitude: -76.2859,
            category: { label: "Cybersecurity", tag: "Cybersecurity" },
            company: { display_name: "Lockheed Martin" },
            location: { display_name: "Washington, DC", area: [] },
        },
        {
            id: "4",
            title: "Logistics Coordinator",
            description:
                "Coordinate supply chain operations for defense systems. Military logistics experience valued.",
            redirect_url: "/signin",
            adref: "LOG-NORTHROP-4",
            contract_type: "Full Time",
            contract_time: "Permanent",
            salary_min: 70000,
            salary_max: 95000,
            salary_is_predicted: "0",
            created: "2025-08-13T10:00:00Z",
            latitude: 34.0522,
            longitude: -118.2437,
            category: { label: "Cybersecurity", tag: "Cybersecurity" },
            company: { display_name: "Lockheed Martin" },
            location: { display_name: "Washington, DC", area: [] },
        },
        {
            id: "5",
            title: "Technical Analyst",
            description:
                "Analyze technical systems for defense applications. Engineering or technical military background preferred.",
            redirect_url: "/signin",
            adref: "TECHANALYST-RAYTHEON-5",
            contract_type: "Full Time",
            contract_time: "Permanent",
            salary_min: 75000,
            salary_max: 105000,
            salary_is_predicted: "0",
            created: "2025-08-13T10:00:00Z",
            latitude: 42.3601,
            longitude: -71.0589,
            category: { label: "Cybersecurity", tag: "Cybersecurity" },
            company: { display_name: "Lockheed Martin" },
            location: { display_name: "Washington, DC", area: [] },
        },
        {
            id: "6",
            title: "Training Specialist",
            description:
                "Develop and deliver training programs for defense systems. Military training experience highly valued.",
            redirect_url: "/signin",
            adref: "TRAINING-L3HARRIS-6",
            contract_type: "Full Time",
            contract_time: "Permanent",
            salary_min: 65000,
            salary_max: 85000,
            salary_is_predicted: "0",
            created: "2025-08-13T10:00:00Z",
            latitude: 28.0836,
            longitude: -80.6081,
            category: { label: "Cybersecurity", tag: "Cybersecurity" },
            company: { display_name: "Lockheed Martin" },
            location: { display_name: "Washington, DC", area: [] },
        },
    ];

    return (
        <section id="jobs" className="py-16 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-indigo-700 mb-4">
                        Featured Opportunities
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Discover career opportunities tailored for military professionals.
                        Our AI matches your skills with the perfect role.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {featuredJobs.map((job, index) => (
                        <JobListingCard key={index} data={job} />
                    ))}
                </div>

                <div className="text-center">
                    <Link href="/signin">
                        <Button
                            size="large"
                            type="default"
                            className="border border-indigo-600 text-indigo-600 hover:!bg-indigo-600 hover:!text-white"
                        >
                            View All Jobs
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

const NewsNotifications = () => {
    const notifications = [
        {
            type: "urgent",
            title: "New VA Benefits Update",
            content: "Enhanced education benefits now available for all veterans",
            time: "2 hours ago",
        },
        {
            type: "trend",
            title: "Tech Sector Growth",
            content: "Cybersecurity roles increased by 45% this quarter",
            time: "5 hours ago",
        },
        {
            type: "policy",
            title: "Military Skills Translation",
            content:
                "New certification program launched for translating military experience",
            time: "1 day ago",
        },
        {
            type: "event",
            title: "Virtual Career Fair",
            content:
                "Major defense contractors hiring - Register by March 15th",
            time: "2 days ago",
        },
    ];

    const jobNews = [
        {
            category: "Defense",
            title: "Lockheed Martin Expands Veteran Hiring Initiative",
            summary:
                "Company commits to hiring 5,000 veterans over next two years across all divisions.",
            time: "3 hours ago",
        },
        {
            category: "Technology",
            title: "Cybersecurity Skills in High Demand",
            summary:
                "Military cybersecurity professionals seeing 30% salary increases in civilian roles.",
            time: "6 hours ago",
        },
        {
            category: "Government",
            title: "Federal Hiring Preference Updates",
            summary:
                "New guidelines for veteran preference in federal job applications announced.",
            time: "1 day ago",
        },
        {
            category: "Training",
            title: "Free Certification Programs Available",
            summary:
                "Microsoft and Amazon offering free cloud certifications for veterans.",
            time: "2 days ago",
        },
    ];

    const typeStyles: Record<
        string,
        { badge: string; ring: string; dot: string }
    > = {
        urgent: {
            badge: "bg-red-500/10 text-red-600 border-red-200",
            ring: "border-l-red-500",
            dot: "bg-red-500",
        },
        trend: {
            badge: "bg-blue-500/10 text-blue-600 border-blue-200",
            ring: "border-l-blue-500",
            dot: "bg-blue-500",
        },
        policy: {
            badge: "bg-amber-500/10 text-amber-700 border-amber-200",
            ring: "border-l-amber-500",
            dot: "bg-amber-500",
        },
        event: {
            badge: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
            ring: "border-l-emerald-500",
            dot: "bg-emerald-500",
        },
    };

    return (
        <section id="news" className="py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-indigo-700 mb-4">
                        Stay Informed
                    </h2>
                    <p className="text-xl text-slate-600">
                        Latest notifications and career news for military professionals
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Notifications Column */}
                    <div>
                        <h3 className="text-2xl font-semibold text-indigo-700 mb-6">
                            Notifications
                        </h3>
                        <div className="space-y-4">
                            {notifications.map((n, i) => {
                                const s = typeStyles[n.type] ?? typeStyles.trend;
                                return (
                                    <div
                                        key={i}
                                        className={`flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border-l-4 ${s.ring}`}
                                    >
                                        <div
                                            className={`mt-1 w-2.5 h-2.5 rounded-full ${s.dot}`}
                                            aria-hidden="true"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <span
                                                    className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-md border ${s.badge}`}
                                                >
                                                    {n.type.charAt(0).toUpperCase() + n.type.slice(1)}
                                                </span>
                                                <span className="text-sm text-slate-500">
                                                    {n.time}
                                                </span>
                                            </div>
                                            <h4 className="text-base font-semibold mt-2 text-slate-900">
                                                {n.title}
                                            </h4>
                                            <p className="text-sm text-slate-600">{n.content}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Job News Column */}
                    <div>
                        <h3 className="text-2xl font-semibold text-indigo-700 mb-6">
                            Career News
                        </h3>
                        <div className="space-y-4">
                            {jobNews.map((news, index) => (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-md bg-indigo-600/10 text-indigo-700 border border-indigo-200">
                                            {news.category}
                                        </span>
                                        <span className="text-sm text-slate-500">{news.time}</span>
                                    </div>
                                    <h4 className="text-lg font-semibold text-slate-900">
                                        {news.title}
                                    </h4>
                                    <p className="text-slate-600 mt-2">{news.summary}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="bg-indigo-700 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center">
                            <span className="text-indigo-800 font-bold text-sm">JC</span>
                        </div>
                        <h3 className="text-lg font-semibold">Job Connect</h3>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
                        <a href="#" className="hover:text-amber-300 transition-colors">
                            About
                        </a>
                        <a href="#" className="hover:text-amber-300 transition-colors">
                            Contact
                        </a>
                        <a href="#" className="hover:text-amber-300 transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-amber-300 transition-colors">
                            Terms of Service
                        </a>
                        <a href="#" className="hover:text-amber-300 transition-colors">
                            Accessibility
                        </a>
                    </div>
                </div>

                <div className="border-t border-white/20 mt-6 pt-6 text-center">
                    <p className="text-sm text-white/90">
                        Official U.S. Government Website | © 2024 Job Connect
                    </p>
                </div>
            </div>
        </footer>
    );
};
