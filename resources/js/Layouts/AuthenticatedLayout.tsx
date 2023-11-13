import { PropsWithChildren, ReactNode } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import { Avatar } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import DashboardIcon from "@/Components/Icons/DashboardIcon";
import TutorIcon from "@/Components/Icons/TutorIcon";
import CalendarIcon from "@/Components/Icons/CalendarIcon";
import { PrimaryButton } from "@/Components/Buttons";
import PageFooter from "@/Components/PageFooter";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";

export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    return (
        <div className="flex flex-col min-h-screen bg-body">
            <nav className="border-b border-gray-100 bg-secondary-dark">
                <div className="px-4 mx-auto max-w-7xl md:px-6 lg:px-8">
                    <div className="items-center justify-between hidden h-16 md:flex">
                        {/* Logo and Navigation Links */}
                        <div className="flex items-center space-x-4">
                            <Link href="/">
                                <ApplicationLogo className="block w-auto text-gray-800 fill-current h-9" />
                            </Link>

                            <div className="hidden space-x-8 md:flex">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    <DashboardIcon />
                                    <span>Dashboard</span>
                                </NavLink>
                                <NavLink
                                    href={route("tutors")}
                                    active={route().current("tutors")}
                                >
                                    <TutorIcon />
                                    <span>Find tutors</span>
                                </NavLink>
                                <NavLink
                                    href={route("calendar")}
                                    stroke={true}
                                    active={route().current("calendar")}
                                >
                                    <CalendarIcon />
                                    <span>My calendar</span>
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden lg:flex lg:gap-4 lg:items-center">
                            <Link href={"/buy-credits"}>
                                <PrimaryButton className="bg-white hover:bg-gray-50">
                                    <ArrowBackIosNewRoundedIcon
                                        className="mr-1"
                                        style={{ fontSize: "16px" }}
                                    />
                                    AlifBee
                                </PrimaryButton>
                            </Link>

                            <Link href={"/buy-credits"}>
                                <PrimaryButton>Book a lesson</PrimaryButton>
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

                        {/* Tablet Navigation Icon */}
                        <div className="flex items-center -mr-2 lg:hidden">
                            <button
                                onClick={() => {}}
                                className="p-2 transition duration-150 ease-in-out hover:text-gray-500"
                            >
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
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center p-4 md:hidden">
                        <Link href="/">
                            <KeyboardArrowLeftRoundedIcon className="text-gray-100" />
                        </Link>
                        <div className="flex justify-center flex-grow mx-auto text-center">
                            <Link href="/">
                                <ApplicationLogo className="block w-auto text-gray-800 fill-current h-9" />
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

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
                        className={"border-primary-400 border-2"}
                        src={user?.profile_picture}
                    />
                </NavLink>
            </div>

            {header && (
                <header className="bg-white shadow">
                    <div className="px-4 py-6 mx-auto max-w-7xl md:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main className="flex-1 max-w-6xl p-12 px-4 mx-auto md:px-6 lg:px-8">
                {children}
            </main>

            {/* Footer */}
            <PageFooter />
        </div>
    );
}
