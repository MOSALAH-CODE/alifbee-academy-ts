import { useState, useEffect } from "react";
import { Lesson, Statuses } from "./types";

export function formatDate(
    date: Date | string,
    options: Intl.DateTimeFormatOptions = {
        month: "long",
        day: "2-digit",
        year: "numeric",
    }
) {
    if (typeof date === "string") {
        date = new Date(date);
    }
    return date.toLocaleDateString(undefined, options);
}

export function formatLessonTime(
    startTime: Date | string,
    endTime: Date | string
) {
    if (typeof startTime === "string") {
        startTime = new Date(startTime);
    }
    if (typeof endTime === "string") {
        endTime = new Date(endTime);
    }
    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);

    return `${formattedStartTime} - ${formattedEndTime}`;
}

export function formatTime(time: Date | string) {
    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    };

    if (typeof time === "string") {
        time = new Date(time);
    }
    const formattedTime = time.toLocaleTimeString(undefined, timeOptions);

    return `${formattedTime}`;
}

export function getDayOfDate(date: Date) {
    const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        timeZone: "Europe/Istanbul",
    };

    if (date) {
        return new Intl.DateTimeFormat("en-US", options).format(date);
    }
    return "";
}

export function getLessonsDuration(startDate: Date, endDate: Date) {
    const dateDiffInMilliseconds = endDate.getTime() - startDate.getTime();

    const hours = Math.floor(dateDiffInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor(
        (dateDiffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );

    return { hours, minutes };
}

export const getStatusSortValue = (status: string) => {
    switch (status) {
        case "upcoming":
            return 1;
        case "completed":
            return 2;
        case "canceled":
            return 3;
        default:
            return 0;
    }
};

type SortOrder = "asc" | "desc";

export function sortLessons(
    lessons: Lesson[],
    sortBy: "date" | "status",
    sortOrder: SortOrder,
    showMore: boolean
): Lesson[] {
    return lessons
        .slice()
        .sort((a, b) => {
            if (sortBy === "date") {
                const dateA = new Date(a.start_date).getTime();
                const dateB = new Date(b.start_date).getTime();

                return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
            } else if (sortBy === "status") {
                return sortOrder === "asc"
                    ? getStatusSortValue(a.status) -
                          getStatusSortValue(b.status)
                    : getStatusSortValue(b.status) -
                          getStatusSortValue(a.status);
            }

            return 0;
        })
        .slice(0, showMore ? lessons.length : 3);
}

export function useCurrentTime() {
    const [currentTime, setCurrentTime] = useState<string>(
        new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })
    );

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(
                new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                })
            );
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return currentTime;
}

export function getTimeZone() {
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    return timeZone;
}

export function hasAnyLessons(countLessons: Statuses) {
    return (
        countLessons.upcoming + countLessons.completed + countLessons.canceled >
        0
    );
}

export function getLessonCountByStatus(countLessons: Statuses, status: string) {
    switch (status) {
        case "upcoming":
            return countLessons.upcoming;
        case "completed":
            return countLessons.completed;
        case "canceled":
            return countLessons.canceled;
        default:
            return 0;
    }
}
