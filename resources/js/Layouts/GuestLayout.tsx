import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <main>
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-secondary-dark">
                <div>
                    <Link href={"/"}>
                        <ApplicationLogo width={"150"} height={"100"} />
                    </Link>
                </div>

                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                    {children}
                </div>
            </div>
        </main>
    );
}
