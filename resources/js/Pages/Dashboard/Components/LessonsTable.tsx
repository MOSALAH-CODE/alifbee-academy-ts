import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Lesson } from "@/types";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Dropdown from "../../../Components/Dropdown";
import TrashIcon from "../../../Components/Icons/TrashIcon";
import HistoryIcon from "../../../Components/Icons/HistoryIcon";
import SortIcon from "../../../Components/Icons/SortIcon";
import { useState } from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { useSelector } from "react-redux";
import { selectPageProps } from "@/features/pagePropsSlice";

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

const getStatusColor = (status: string) => {
    switch (status) {
        case "upcoming":
            return "bg-amber-50 border-amber-400";
        case "completed":
            return "bg-green-50 border-green-400";
        case "canceled":
            return "bg-red-50 border-red-400";
        default:
            return "";
    }
};

const getIconColor = (status: string) => {
    switch (status) {
        case "upcoming":
            return "text-amber-400";
        case "completed":
            return "text-green-400";
        case "canceled":
            return "text-red-400";
        default:
            return "";
    }
};

const getStatusSortValue = (status: string) => {
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

interface LessonsTableProps {
    lessons: Lesson[];
    className?: string;
    disabled?: boolean;
    active?: boolean;
    children?: React.ReactNode;
}

export default function LessonsTable({
    lessons,
    className = "",
    disabled,
    active,
    children,
    ...props
}: LessonsTableProps) {
    const pageProps = useSelector(selectPageProps);

    const [showMore, setShowMore] = useState(false);

    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [sortBy, setSortBy] = useState<"date" | "status">("date");

    const sortedLessons = lessons.slice().sort((a, b) => {
        if (sortBy === "date") {
            const dateA = new Date(a.start_date).getTime();
            const dateB = new Date(b.start_date).getTime();

            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        } else if (sortBy === "status") {
            return sortOrder === "asc"
                ? getStatusSortValue(a.status) - getStatusSortValue(b.status)
                : getStatusSortValue(b.status) - getStatusSortValue(a.status);
        }

        return 0;
    });

    const slicedLessons = showMore ? sortedLessons : sortedLessons.slice(0, 3);

    return (
        <div className={"relative overflow-x-auto w-full " + className}>
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
                                <div
                                    className="flex items-center justify-between w-full pr-4 cursor-pointer"
                                    onClick={() => {
                                        setSortBy("date");
                                        setSortOrder(
                                            sortOrder === "asc" ? "desc" : "asc"
                                        );
                                    }}
                                >
                                    <p>Date/Time</p>
                                    <SortIcon
                                        order={sortBy === "date"}
                                        asc={sortOrder === "asc"}
                                    />
                                </div>
                            </div>
                        </th>
                        <th scope="col" className="py-2">
                            <div className="flex items-center">
                                <div
                                    className="bg-gray-300 inline-block min-h-[1.25rem] mr-4"
                                    style={{ width: "1.5px" }}
                                ></div>
                                <div
                                    className="flex items-center justify-between w-full pr-4 cursor-pointer"
                                    onClick={() => {
                                        setSortBy("status");
                                        setSortOrder(
                                            sortOrder === "asc" ? "desc" : "asc"
                                        );
                                    }}
                                >
                                    <p>Status</p>
                                    {!pageProps.lessons_status.status && (
                                        <SortIcon
                                            order={sortBy === "status"}
                                            asc={sortOrder === "asc"}
                                        />
                                    )}
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
                    {slicedLessons.map((lesson) => (
                        <tr
                            key={lesson.id}
                            className="mx-2 bg-white border border-white border-b-gray-200 "
                        >
                            <th
                                scope="row"
                                className="pl-2 font-medium text-gray-900 whitespace-nowrap"
                            >
                                <div className="flex items-center gap-2 py-2">
                                    <Avatar
                                        src={lesson?.tutor?.profile_picture}
                                    />

                                    <h4 className="font-semibold hover:underline hover:underline-offset-2 ">
                                        {lesson?.tutor?.name}
                                    </h4>
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
                                    <div
                                        className={`px-2 py-1 capitalize border rounded ${getStatusColor(
                                            lesson.status
                                        )} text-secondary-dark`}
                                    >
                                        <FiberManualRecordIcon
                                            className={`mr-1 ${getIconColor(
                                                lesson.status
                                            )}`}
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
            {lessons.length > 3 && (
                <div className="mt-4 text-xs font-semibold text-center transition duration-150 ease-in-out text-secondary-400 hover:text-secondary-dark">
                    {showMore ? (
                        <button onClick={() => setShowMore(false)}>
                            Show Less
                            <KeyboardArrowUpRoundedIcon />
                        </button>
                    ) : (
                        <button onClick={() => setShowMore(true)}>
                            Show More
                            <KeyboardArrowDownRoundedIcon />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
