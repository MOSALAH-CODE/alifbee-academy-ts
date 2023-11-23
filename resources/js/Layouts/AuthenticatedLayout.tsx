import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import NavLink from "@/Components/NavLink";
import { User } from "@/types";
import { Avatar } from "@mui/material";
import DashboardIcon from "@/Components/Icons/DashboardIcon";
import TutorIcon from "@/Components/Icons/TutorIcon";
import CalendarIcon from "@/Components/Icons/CalendarIcon";
import PageFooter from "@/Components/PageFooter";
import NavBar from "@/Components/NavBar";

export default function Authenticated({
    user,
    header,
    children,
    loading = false,
    nav = true,
    footer = true,
}: PropsWithChildren<{
    user: User;
    header?: ReactNode;
    loading?: boolean;
    nav?: boolean;
    footer?: boolean;
}>) {
    const [scaleValue, setScaleValue] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            const scale = Math.max(0.8, 1 - scrolled / window.innerHeight);
            setScaleValue(scale);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            {loading ? (
                <>
                    <div className="loader-container">
                        <div className="spinner"></div>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex flex-col min-h-screen bg-body">
                        {nav && (
                            <>
                                <NavBar user={user} />

                                {/* <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-around py-2 bg-secondary-dark md:hidden"> */}
                                <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-around py-2 md:hidden bg-secondary-dark ">
                                    <NavLink
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                    >
                                        <DashboardIcon />
                                    </NavLink>
                                    <NavLink
                                        href={route("tutors")}
                                        active={route().current("tutors")}
                                    >
                                        <TutorIcon />
                                    </NavLink>
                                    <NavLink
                                        href={route("calendar")}
                                        stroke={true}
                                        active={route().current("calendar")}
                                    >
                                        <CalendarIcon />
                                    </NavLink>
                                    <NavLink
                                        href={route("profile.edit")}
                                        active={route().current("dashboard")}
                                    >
                                        <Avatar
                                            sx={{ width: 24, height: 24 }}
                                            className={
                                                "border-primary-400 border-2"
                                            }
                                            src={user?.profile_picture}
                                        />
                                    </NavLink>
                                </div>
                            </>
                        )}

                        {header && (
                            <header
                                style={{
                                    position: "sticky",
                                    top: 0,
                                    width: "100%",
                                    zIndex: 1000,
                                }}
                                className={`bg-white shadow`}
                            >
                                <div
                                    style={{
                                        transform: `scale(${scaleValue})`,
                                        padding: `${scaleValue * 5}px 24px`,
                                    }}
                                    className="mx-auto max-w-7xl md:px-6 lg:px-8"
                                >
                                    {header}
                                </div>
                            </header>
                        )}

                        {/* Main Content */}
                        <main className="flex-1 max-w-6xl p-12 px-4 mx-auto md:px-6 lg:px-8">
                            {children}
                        </main>

                        {/* Footer */}
                        {footer && <PageFooter />}
                    </div>
                </>
            )}
        </>
    );
}
