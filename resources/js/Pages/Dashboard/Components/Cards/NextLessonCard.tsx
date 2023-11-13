// NextLessonCard.tsx
import { useEffect, useState } from "react";
import CalendarIcon from "@/Components/Icons/CalendarIcon";
import CopyIcon from "@/Components/Icons/CopyIcon";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Card from "@/Components/Card";
import { Lesson } from "@/types";
const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

function formatLessonDate(dateString: string) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    };
    return date.toLocaleDateString(undefined, options);
}

function formatLessonTime(startTime: string, endTime: string) {
    const start = new Date(startTime);
    const end = new Date(endTime);

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    };
    const formattedStartTime = start.toLocaleTimeString(undefined, timeOptions);
    const formattedEndTime = end.toLocaleTimeString(undefined, timeOptions);

    return `${formattedStartTime} - ${formattedEndTime}`;
}

interface NextLessonCardProps {
    lesson: Lesson;
    copiedZoomId: boolean;
    copiedPassword: boolean;
    handleCopyToClipboard: (text: string, isZoomId: boolean) => void;
}

const NextLessonCard = ({
    lesson,
    copiedZoomId,
    copiedPassword,
    handleCopyToClipboard,
}: NextLessonCardProps) => {
    const [currentTime, setCurrentTime] = useState(
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

    return (
        <Card
            header={
                <h2 className="text-xl font-semibold text-secondary-dark">
                    Next lesson:
                </h2>
            }
            footer={
                <div className="flex items-center gap-2">
                    <p className="text-xs text-secondary-400">
                        {currentTime} ({timeZone}) Not your time zone?
                    </p>
                    <p className="text-sm font-semibold underline text-secondary-dark">
                        Change
                    </p>
                </div>
            }
        >
            <div className="grid gap-3 pt-2 grid-col-1">
                {/* Calendar */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <CalendarIcon
                            width="16"
                            height="16"
                            className="stroke-secondary-dark"
                        />
                        <p className="text-sm text-secondary-400">Date/Time:</p>
                    </div>
                    <p className="text-sm text-secondary-dark">
                        {formatLessonDate(lesson?.start_date)} at &nbsp;
                        <b>
                            {formatLessonTime(
                                lesson?.start_date,
                                lesson?.end_date
                            )}
                        </b>
                    </p>
                </div>
                {/*  Zoom Id */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <img src="/icons/zoom.png" width={16} alt="" />
                        <p className="text-sm text-secondary-400">Meet ID:</p>
                    </div>
                    <p className="text-sm text-secondary-dark">
                        {lesson?.meet_id}
                    </p>
                    <Tooltip
                        open={copiedZoomId}
                        title="Copied"
                        TransitionComponent={Zoom}
                        placement="top"
                        arrow
                        PopperProps={{
                            modifiers: [
                                {
                                    name: "offset",
                                    options: {
                                        offset: [0, -5],
                                    },
                                },
                            ],
                        }}
                    >
                        <button
                            onClick={() => {
                                handleCopyToClipboard(lesson?.meet_id, true);
                            }}
                            className={`${copiedZoomId ? "jelly-anim" : ""}`}
                        >
                            <CopyIcon />
                        </button>
                    </Tooltip>
                </div>

                {/* Zoom Password */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <img src="/icons/zoom.png" width={16} alt="" />
                        <p className="text-sm text-secondary-400">Password:</p>
                    </div>
                    <p className="text-sm text-secondary-dark">
                        {lesson?.password}
                    </p>
                    <Tooltip
                        open={copiedPassword}
                        title="Copied"
                        TransitionComponent={Zoom}
                        placement="top"
                        arrow
                        PopperProps={{
                            modifiers: [
                                {
                                    name: "offset",
                                    options: {
                                        offset: [0, -5],
                                    },
                                },
                            ],
                        }}
                    >
                        <button
                            onClick={() => {
                                handleCopyToClipboard(lesson?.password, false);
                            }}
                            className={`${copiedPassword ? "jelly-anim" : ""}`}
                        >
                            <CopyIcon />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </Card>
    );
};

export default NextLessonCard;
