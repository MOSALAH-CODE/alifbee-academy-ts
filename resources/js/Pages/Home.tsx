import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Home({ auth }: PageProps) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative min-h-screen sm:flex sm:justify-center sm:items-center bg-secondary-dark">
                <div className="p-6 text-right sm:fixed sm:top-0 sm:right-0">
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route("register")}
                                className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="p-6 mx-auto max-w-7xl lg:p-8">
                    <div className="flex justify-center">
                        <ApplicationLogo />
                    </div>
                </div>
            </div>
        </>
    );
}
