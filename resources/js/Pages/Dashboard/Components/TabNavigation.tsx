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
    className?: string;
}

export default function TabNavigation({
    status,
    setStatus,
    className = "",
}: TabNavigationProps) {
    const pageProps = useSelector(selectPageProps);

    return (
        <div
            className={
                "text-secondary-400 font-semibold border-b border-gray-200 " +
                className
            }
        >
            <div className="flex flex-col justify-between md:flex-row">
                <div className="flex items-center justify-between gap-4 md:justify-normal">
                    <h3 className="text-xl font-semibold text-secondary-dark">
                        My lessons:
                    </h3>
                    <OutlineButton className="text-sm">
                        Book a lesson
                    </OutlineButton>
                </div>
                <ul className="flex flex-wrap gap-2 -mb-px text-sm md:text-base ">
                    <li className="mr-2">
                        <TabButton
                            onClick={() => setStatus("upcoming")}
                            active={status === "upcoming"}
                        >
                            Upcoming ({pageProps.countLessons.upcoming})
                        </TabButton>
                    </li>
                    <li className="mr-2">
                        <TabButton
                            onClick={() => setStatus("completed")}
                            active={status === "completed"}
                        >
                            Completed ({pageProps.countLessons.completed})
                        </TabButton>
                    </li>
                    <li className="mr-2">
                        <TabButton
                            onClick={() => setStatus("canceled")}
                            active={status === "canceled"}
                        >
                            Canceled ({pageProps.countLessons.canceled})
                        </TabButton>
                    </li>
                </ul>
            </div>
        </div>
    );
}
