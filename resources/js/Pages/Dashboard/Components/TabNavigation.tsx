import { useSelector } from "react-redux";
import TabLink from "./TabLink";
import { selectPageProps } from "@/features/pagePropsSlice";
import { OutlineButton } from "../../../Components/Buttons";
import { Statuses } from "@/types";

interface TabNavigationProps {
    status: string;
    className?: string;
    countLessons: Statuses;
}

export default function TabNavigation({
    status,
    className = "",
    countLessons,
}: TabNavigationProps) {
    // const pageProps = useSelector(selectPageProps);

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
                        <TabLink
                            href="/dashboard?status=upcoming"
                            active={status === "upcoming"}
                        >
                            Upcoming ({countLessons.upcoming})
                        </TabLink>
                    </li>
                    <li className="mr-2">
                        <TabLink
                            href="/dashboard?status=completed"
                            active={status === "completed"}
                        >
                            Completed ({countLessons.completed})
                        </TabLink>
                    </li>
                    <li className="mr-2">
                        <TabLink
                            href="/dashboard?status=canceled"
                            active={status === "canceled"}
                        >
                            Canceled ({countLessons.canceled})
                        </TabLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}
