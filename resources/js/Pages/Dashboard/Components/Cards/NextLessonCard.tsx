import { useEffect, useState } from "react";
import CalendarIcon from "@/Components/Icons/CalendarIcon";
import Card from "@/Components/Card";
import { Lesson } from "@/types";
import {
    formatDate,
    useCurrentTime,
    getTimeZone,
    formatTime,
    formatLessonTime,
} from "@/utils";
import CopyToClipboardButton from "@/Components/CopyToClipboardButton";
import { Link } from "@inertiajs/react";
import { PrimaryButton } from "@/Components/Buttons";
import NoLessonsIcon from "@/Components/Icons/NoLessonsIcon";

import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";

interface NextLessonCardProps {
    lesson: Lesson | null;
}

const NextLessonCard = ({ lesson }: NextLessonCardProps) => {
    const currentTime = useCurrentTime();

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
                        {currentTime} {getTimeZone()} Not your time zone?
                    </p>
                    <p className="text-sm font-semibold underline text-secondary-dark">
                        Change
                    </p>
                </div>
            }
        >
            {lesson ? (
                <>
                    <div className="grid gap-3 pt-2 grid-col-1">
                        {/* Calendar */}
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <CalendarIcon
                                    width="16"
                                    height="16"
                                    className="stroke-secondary-dark"
                                />
                                <p className="text-sm text-secondary-400">
                                    Date/Time:
                                </p>
                            </div>
                            <p className="text-sm text-secondary-dark">
                                {formatDate(lesson?.start_date, {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                })}{" "}
                                at{" "}
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
                                <p className="text-sm text-secondary-400">
                                    Meet ID:
                                </p>
                            </div>
                            <p className="text-sm text-secondary-dark">
                                {lesson?.meet_id}
                            </p>
                            <CopyToClipboardButton text={lesson?.meet_id} />
                        </div>

                        {/* Zoom Password */}
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <img src="/icons/zoom.png" width={16} alt="" />
                                <p className="text-sm text-secondary-400">
                                    Password:
                                </p>
                            </div>
                            <p className="text-sm text-secondary-dark">
                                {lesson?.password}
                            </p>
                            <CopyToClipboardButton text={lesson?.password} />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-2 justify-items-center">
                        <NoLessonsIcon width={50} height={50} />
                        <div className="grid grid-cols-1 justify-items-center">
                            <h3 className="font-semibold text-secondary-dark">
                                No upcoming lesson
                            </h3>
                        </div>
                    </div>
                </>
            )}
        </Card>
    );
};

export default NextLessonCard;
