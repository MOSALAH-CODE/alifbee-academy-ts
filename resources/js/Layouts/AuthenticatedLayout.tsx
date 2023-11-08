import { useState, PropsWithChildren, ReactNode } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import { Avatar } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import DashboardIcon from "@/Components/Icons/DashboardIcon";
import TutorIcon from "@/Components/Icons/TutorIcon";
import CalendarIcon from "@/Components/Icons/CalendarIcon";

export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-body">
            <nav className="border-b border-gray-100 bg-secondary-dark">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <Link href="/">
                                <ApplicationLogo className="block w-auto text-gray-800 fill-current h-9" />
                            </Link>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <div className="bg-body inline-block opacity-25 w-0.5"></div>

                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    <DashboardIcon />
                                    <span className={"text-base"}>
                                        Dashboard
                                    </span>
                                </NavLink>
                                <NavLink
                                    href={route("tutors")}
                                    active={route().current("tutors")}
                                >
                                    <TutorIcon />
                                    <span className={"text-base"}>
                                        Find tutors
                                    </span>
                                </NavLink>
                                <NavLink
                                    href={route("calendar")}
                                    stroke={true}
                                    active={route().current("calendar")}
                                >
                                    <CalendarIcon />
                                    <span className={"text-base"}>
                                        My calendar
                                    </span>
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:gap-4 sm:items-center sm:ml-6">
                            <Link
                                href={"/book-lesson"}
                                className={
                                    "bg-white px-4 py-1.5 text-secondary-dark font-medium rounded-lg"
                                }
                            >
                                <ArrowBackIosNewRoundedIcon
                                    style={{ fontSize: "16px" }}
                                />
                                AlifBee
                            </Link>
                            <Link
                                href={"/book-lesson"}
                                className={
                                    "bg-primary hover:bg-primary px-4 py-1.5 text-secondary-dark font-medium rounded-lg"
                                }
                            >
                                Book a lesson
                            </Link>
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button type="button">
                                            <Avatar
                                                className={
                                                    "border-primary-400 border-2"
                                                }
                                                src={user?.profile_picture}
                                            />
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="flex items-center -mr-2 sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
                            >
                                <svg
                                    className="w-6 h-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {user?.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user?.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className={"mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 p-12"}>
                {children}
            </main>
        </div>
    );
}
