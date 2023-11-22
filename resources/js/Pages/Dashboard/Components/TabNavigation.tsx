import { useSelector } from "react-redux";
import { selectPageProps } from "@/features/pagePropsSlice";
import { OutlineButton } from "../../../Components/Buttons";
import TabButton from "./TabButton";
import { Lesson } from "@/types";
import axios from "axios";
import { useEffect } from "react";

interface TabNavigationProps {
    status: string;
    setStatus: (status: string) => void;
    bookLessonButton?: boolean;
    justifyBetween?: boolean;
    title?: string;
    border?: boolean;
    className?: string;
}

export default function TabNavigation({
    status,
    setStatus,
    bookLessonButton = true,
    justifyBetween = true,
    title = "My lessons:",
    border = true,
    className = "",
}: TabNavigationProps) {
    const pageProps = useSelector(selectPageProps);

    return (
        <div
            className={
                `text-secondary-400 font-semibold ${
                    border && "border-b border-gray-200"
                } ` + className
            }
        >
            <div
                className={`flex flex-col ${
                    justifyBetween ? "justify-between" : "gap-4"
                } md:flex-row`}
            >
                <div className="flex items-center justify-between gap-4 md:justify-normal">
                    <h3 className="text-xl font-semibold text-secondary-dark">
                        {title}
                    </h3>
                    {bookLessonButton && (
                        <OutlineButton className="text-sm">
                            Book a lesson
                        </OutlineButton>
                    )}
                </div>
                <ul className="flex flex-wrap gap-2 -mb-px text-sm md:text-base ">
                    {pageProps.countLessons.upcoming > 0 && (
                        <li className="mr-2">
                            <TabButton
                                onClick={() => setStatus("upcoming")}
                                active={status === "upcoming"}
                            >
                                Upcoming ({pageProps.countLessons.upcoming})
                            </TabButton>
                        </li>
                    )}
                    {pageProps.countLessons.completed > 0 && (
                        <li className="mr-2">
                            <TabButton
                                onClick={() => setStatus("completed")}
                                active={status === "completed"}
                            >
                                Completed ({pageProps.countLessons.completed})
                            </TabButton>
                        </li>
                    )}
                    {pageProps.countLessons.canceled > 0 && (
                        <li className="mr-2">
                            <TabButton
                                onClick={() => setStatus("canceled")}
                                active={status === "canceled"}
                            >
                                Canceled ({pageProps.countLessons.canceled})
                            </TabButton>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
