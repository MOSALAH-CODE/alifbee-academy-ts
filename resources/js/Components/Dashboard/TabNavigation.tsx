import { Lesson } from "@/types";
import TabLink from "./TabLink";
import { useState, useEffect } from "react";

interface TabNavigationProps {
    lessons: Lesson[];
    status: string;
    setStatus: (status: string) => void;
    className?: string;
}

function countStatus(lessons: Lesson[], status: string) {
    return lessons.filter((lesson) => lesson.status === status).length;
}

export default function TabNavigation({
    lessons,
    status,
    className = "",
}: TabNavigationProps) {
    const upcomingCount = countStatus(lessons, "upcoming");
    const completedCount = countStatus(lessons, "completed");
    const canceledCount = countStatus(lessons, "canceled");

    return (
        <div
            className={
                "text-secondary-400 font-semibold border-b border-gray-200 " +
                className
            }
        >
            <div className="flex justify-between">
                <div className="flex items-center gap-4">
                    <h3 className="text-xl font-semibold text-secondary-dark">
                        My lessons:
                    </h3>
                    <div className="px-2 py-1 border-2 rounded-lg border-amber-400 text-secondary-dark">
                        Book a lesson
                    </div>
                </div>
                <ul className="flex flex-wrap gap-2 -mb-px">
                    <li className="mr-2">
                        <TabLink
                            href="/dashboard?status=upcoming"
                            active={status === "upcoming"}
                            // onClick={() => setStatus("upcoming")}
                        >
                            Upcoming ({upcomingCount})
                        </TabLink>
                    </li>
                    <li className="mr-2">
                        <TabLink
                            href="/dashboard?status=completed"
                            active={status === "completed"}
                            // onClick={() => setStatus("completed")}
                        >
                            Completed ({completedCount})
                        </TabLink>
                    </li>
                    <li className="mr-2">
                        <TabLink
                            href="/dashboard?status=canceled"
                            active={status === "canceled"}
                            // onClick={() => setStatus("canceled")}
                        >
                            Canceled ({canceledCount})
                        </TabLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}
