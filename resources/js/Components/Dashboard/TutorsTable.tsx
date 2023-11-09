import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Lesson } from "@/types";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Dropdown from "../Dropdown";
import TrashIcon from "../Icons/TrashIcon";
import HistoryIcon from "../Icons/HistoryIcon";
import { Link } from "@inertiajs/react";
import SortIcon from "../Icons/SortIcon";

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
    };
    const formattedStartTime = start.toLocaleTimeString(undefined, timeOptions);
    const formattedEndTime = end.toLocaleTimeString(undefined, timeOptions);

    return `${formattedStartTime} - ${formattedEndTime}`;
}

interface TutorsTableProps {
    lessons: Lesson[];
    className?: string;
    disabled?: boolean;
    active?: boolean;
    children?: React.ReactNode;
}

export default function TurorsTable({
    lessons,
    className = "",
    disabled,
    active,
    children,
    ...props
}: TutorsTableProps) {
    lessons = lessons.map((lessonObject) => Lesson.fromJson(lessonObject));

    return (
        <div className={"relative overflow-x-auto " + className}>
            <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-secondary-dark bg-body ">
                    <tr>
                        <th scope="col" className="pl-2 rounded-l-lg">
                            Tutors
                        </th>
                        <th scope="col" className="py-2">
                            <div className="flex items-center">
                                <div
                                    className="bg-gray-300 inline-block min-h-[1.25rem] mr-4"
                                    style={{ width: "1.5px" }}
                                ></div>
                                <div className="flex items-center justify-between w-full pr-4">
                                    <p>Date/Time</p>
                                    <Link href="#">
                                        <SortIcon />
                                    </Link>
                                </div>
                            </div>
                        </th>
                        <th scope="col" className="py-2">
                            <div className="flex items-center">
                                <div
                                    className="bg-gray-300 inline-block min-h-[1.25rem] mr-4"
                                    style={{ width: "1.5px" }}
                                ></div>
                                <div className="flex items-center justify-between w-full pr-4">
                                    <p>Status</p>
                                    <Link href="#">
                                        <SortIcon />
                                    </Link>
                                </div>
                            </div>
                        </th>

                        <th scope="col" className="rounded-r-lg ">
                            <div className="flex items-center">
                                <div
                                    className="bg-gray-300 inline-block min-h-[1.25rem] mr-4"
                                    style={{ width: "1.5px" }}
                                ></div>
                                <span className="sr-only">Edit</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {lessons.map((lesson) => (
                        <tr key={lesson.id} className="mx-2 bg-white border-b">
                            <th
                                scope="row"
                                className="pl-2 font-medium text-gray-900 whitespace-nowrap"
                            >
                                <div className="flex items-center gap-2 py-2">
                                    <Avatar
                                        src={lesson?.tutor?.profile_picture}
                                    />

                                    <h4>{lesson?.tutor?.name}</h4>
                                </div>
                            </th>

                            <td className="py-2">
                                <div className="flex items-center">
                                    <div
                                        className="bg-gray-300 inline-block min-h-[1.25rem] mr-4 h-9"
                                        style={{ width: "1.5px" }}
                                    ></div>
                                    <div className="text-secondary-dark">
                                        <p>
                                            {formatLessonDate(
                                                lesson.start_date
                                            )}
                                        </p>
                                        <p>
                                            {formatLessonTime(
                                                lesson.start_date,
                                                lesson.end_date
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="py-2">
                                <div className="flex items-center">
                                    <div
                                        className="bg-gray-300 inline-block min-h-[1.25rem] mr-4 h-9"
                                        style={{ width: "1.5px" }}
                                    ></div>
                                    <div className="px-2 py-1 capitalize border rounded bg-amber-50 border-amber-400 text-secondary-dark">
                                        <FiberManualRecordIcon
                                            className="mr-1 text-amber-400"
                                            style={{ fontSize: "8px" }}
                                        />
                                        {lesson.status}
                                    </div>
                                </div>
                            </td>
                            <td className="">
                                <div className="flex items-center justify-between">
                                    <div
                                        className="bg-gray-300 inline-block min-h-[1.25rem] mr-4 h-9"
                                        style={{ width: "1.5px" }}
                                    ></div>
                                    <div className="">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <button type="button">
                                                    <MoreVertIcon className="text-gray-300" />
                                                </button>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content width="1">
                                                <Dropdown.Link
                                                    href={route("profile.edit")}
                                                >
                                                    <div className="flex items-center gap-2 text-secondary-dark">
                                                        <RemoveRedEyeOutlinedIcon
                                                            style={{
                                                                fontSize:
                                                                    "16px",
                                                            }}
                                                        />
                                                        <p className="whitespace-nowrap">
                                                            View detail
                                                        </p>
                                                    </div>
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route("profile.edit")}
                                                >
                                                    <div className="flex items-center gap-2 text-secondary-dark">
                                                        <TrashIcon />
                                                        <p className="whitespace-nowrap">
                                                            Cancel
                                                        </p>
                                                    </div>
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route("profile.edit")}
                                                >
                                                    <div className="flex items-center gap-2 text-secondary-dark">
                                                        <HistoryIcon />
                                                        <p className="whitespace-nowrap">
                                                            Reschedule
                                                        </p>
                                                    </div>
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
