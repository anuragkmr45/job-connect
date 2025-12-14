import NewsTicker from "@/components/News/NewsTicker";
import Link from "next/link";
import { MdWorkOutline, MdNewspaper } from "react-icons/md";

export default function AdminUploadPage() {
    const uploadModules = [
        {
            title: "Upload Job",
            description: "Post new job listings and opportunities for veterans and military personnel",
            icon: MdWorkOutline,
            to: "/admin/jobUpload",
            color: "bg-indigo-600"
        },
        {
            title: "Upload News",
            description: "Share latest updates, announcements, and news articles with the community",
            icon: MdNewspaper,
            to: "/admin/job-news-upload",
            color: "bg-emerald-600"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">

               <NewsTicker />
               
            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-3">
                            Content Management
                        </h2>
                        <p className="text-slate-600">
                            Select a module to manage platform content
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {uploadModules.map((module, index) => (
                            <div
                                key={index}
                                className="group bg-white hover:shadow-xl transition-all duration-300 cursor-pointer rounded-xl border-2 border-slate-200 hover:border-indigo-200 overflow-hidden"
                            >
                                {/* Card Header */}
                                <div className="p-6 pb-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-3 rounded-lg ${module.color} text-white`}>
                                            <module.icon className="h-6 w-6" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                {module.title}
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="px-6 pb-6">
                                    <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                                        {module.description}
                                    </p>

                                    <Link
                                        href={module.to}
                                        className="block w-full text-center bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200"
                                    >
                                        Access Module →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer */}
            {/* <footer className="bg-white border-t mt-16">
                <div className="container mx-auto px-4 py-6 text-center">
                    <p className="text-sm text-slate-600">
                        © 2025 Job Connect - Admin Panel
                    </p>
                </div>
            </footer> */}
        </div>
    );
}