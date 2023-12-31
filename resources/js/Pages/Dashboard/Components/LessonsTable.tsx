import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";

import Dropdown from "@/Components/Dropdown";
import TrashIcon from "@/Components/Icons/TrashIcon";
import HistoryIcon from "@/Components/Icons/HistoryIcon";
import SortIcon from "@/Components/Icons/SortIcon";

import { Lesson } from "@/types";
import {
    formatDate,
    formatLessonTime,
    getLessonCountByStatus,
    sortLessons,
} from "@/utils";
import LessonDetailsModal from "./Modals/LessonDetailsModal";
import CancelLessonModal from "./Modals/CancelLessonModal";

import { Shimmer, Image } from "react-shimmer";
import { useSelector } from "react-redux";
import { selectPageProps } from "@/features/pagePropsSlice";

export const getStatusColor = (status: string) => {
    switch (status) {
        case "upcoming":
            return "bg-amber-50 border-amber-400";
        case "completed":
            return "bg-green-50 border-green-400";
        case "canceled":
            return "bg-danger-light border-danger";
        default:
            return "";
    }
};

export const getIconColor = (status: string) => {
    switch (status) {
        case "upcoming":
            return "text-amber-400";
        case "completed":
            return "text-green-400";
        case "canceled":
            return "text-danger";
        default:
            return "";
    }
};

interface LessonsTableProps {
    lessons: Lesson[];
    status: string;
    className?: string;
    disabled?: boolean;
    active?: boolean;
    children?: React.ReactNode;
    loading?: boolean;
    showMoreLessons?: boolean;
    setShowMoreLessons: (value: boolean) => void;
}

export default function LessonsTable({
    lessons,
    status,
    className = "",
    disabled,
    active,
    children,
    loading = false,
    showMoreLessons = false,
    setShowMoreLessons,
    ...props
}: LessonsTableProps) {
    const pageProps = useSelector(selectPageProps);

    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [sortBy, setSortBy] = useState<"date" | "status">("date");

    const slicedLessons = sortLessons(
        lessons,
        sortBy,
        sortOrder,
        showMoreLessons
    );

    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const [lessonDetailsModalOpen, setLessonDetailsModalOpen] = useState(false);
    const [cancelLessonModalOpen, setCancelLessonModalOpen] = useState(false);

    const openLessonDetailsModal = (lesson: Lesson) => {
        setSelectedLesson(lesson);
        setLessonDetailsModalOpen(true);
    };

    const openCancelLessonModal = (lesson: Lesson) => {
        setSelectedLesson(lesson);
        setCancelLessonModalOpen(true);
    };

    return (
        <div className={"overflow-x-auto w-full " + className}>
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-secondary-dark bg-body ">
                    <tr>
                        <th
                            scope="col"
                            className="pl-2 rounded-l-lg"
                            style={{ width: "40%" }}
                        >
                            Tutors
                        </th>
                        <th
                            scope="col"
                            className="py-2"
                            style={{ width: "25%" }}
                        >
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
                        <th
                            scope="col"
                            className="py-2"
                            style={{ width: "25%" }}
                        >
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
                                    {!status && (
                                        <SortIcon
                                            order={sortBy === "status"}
                                            asc={sortOrder === "asc"}
                                        />
                                    )}
                                </div>
                            </div>
                        </th>

                        <th
                            scope="col"
                            className="w-6 rounded-r-lg"
                            style={{ width: "10%" }}
                        >
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
                    {loading ? (
                        <>
                            {Array.from({
                                length: showMoreLessons
                                    ? getLessonCountByStatus(
                                          pageProps.countLessons,
                                          status
                                      )
                                    : getLessonCountByStatus(
                                          pageProps.countLessons,
                                          status
                                      ) > 3
                                    ? 3
                                    : getLessonCountByStatus(
                                          pageProps.countLessons,
                                          status
                                      ),
                            }).map((_, index) => (
                                <tr
                                    key={index}
                                    className="mx-2 bg-white border border-white border-b-gray-200 "
                                    style={{ height: "60px" }}
                                >
                                    <th
                                        scope="row"
                                        className="pl-2 pr-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        <div className="flex items-center gap-2 py-2">
                                            <Shimmer
                                                className="rounded-full"
                                                width={30}
                                                height={30}
                                                duration={0.95}
                                            />
                                            <Shimmer
                                                className="rounded"
                                                width={150}
                                                height={25}
                                                duration={0.95}
                                            />
                                        </div>
                                    </th>

                                    <td className="py-2">
                                        <div className="flex items-center pr-4">
                                            <div
                                                className="bg-gray-300 inline-block min-h-[1.25rem] mr-4 h-9"
                                                style={{ width: "1.5px" }}
                                            ></div>
                                            <div className="grid gap-1">
                                                <Shimmer
                                                    className="rounded"
                                                    width={100}
                                                    height={10}
                                                    duration={0.95}
                                                />
                                                <Shimmer
                                                    className="rounded"
                                                    width={85}
                                                    height={8}
                                                    duration={0.95}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2">
                                        <div className="flex items-center pr-4">
                                            <div
                                                className="bg-gray-300 inline-block min-h-[1.25rem] mr-4 h-9"
                                                style={{ width: "1.5px" }}
                                            ></div>
                                            <Shimmer
                                                className="rounded"
                                                width={90}
                                                height={25}
                                                duration={0.95}
                                            />
                                        </div>
                                    </td>
                                    <td className="">
                                        <div className="flex items-center justify-between">
                                            <div
                                                className="bg-gray-300 inline-block min-h-[1.25rem] mr-4 h-9"
                                                style={{ width: "1.5px" }}
                                            ></div>
                                            <div className="">
                                                <button type="button">
                                                    <MoreVertIcon className="text-gray-300" />
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </>
                    ) : (
                        <>
                            {slicedLessons.map((lesson) => (
                                <tr
                                    key={lesson.id}
                                    className="mx-2 bg-white border border-white border-b-gray-200 "
                                    style={{ height: "60px" }}
                                >
                                    <th
                                        scope="row"
                                        className="pl-2 pr-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        <div className="flex items-center gap-2 py-2">
                                            <Avatar
                                                src={
                                                    lesson?.tutor
                                                        ?.profile_picture
                                                }
                                            />

                                            <h4 className="font-semibold hover:underline hover:underline-offset-2 ">
                                                {lesson?.tutor?.name}
                                            </h4>
                                        </div>
                                    </th>

                                    <td className="py-2">
                                        <div className="flex items-center pr-4">
                                            <div
                                                className="bg-gray-300 inline-block min-h-[1.25rem] mr-4 h-9"
                                                style={{ width: "1.5px" }}
                                            ></div>
                                            <div className="text-secondary-dark whitespace-nowrap">
                                                <p>
                                                    {formatDate(
                                                        lesson.start_date,
                                                        {
                                                            year: "numeric",
                                                            month: "2-digit",
                                                            day: "2-digit",
                                                        }
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
                                        <div className="flex items-center pr-4">
                                            <div
                                                className="bg-gray-300 inline-block min-h-[1.25rem] mr-4 h-9"
                                                style={{ width: "1.5px" }}
                                            ></div>
                                            <div
                                                className={`px-2 py-1 capitalize border rounded whitespace-nowrap ${getStatusColor(
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
                                                        <Dropdown.Button
                                                            onClick={() =>
                                                                openLessonDetailsModal(
                                                                    lesson
                                                                )
                                                            }
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
                                                        </Dropdown.Button>

                                                        {lesson.status ===
                                                            "upcoming" && (
                                                            <>
                                                                <Dropdown.Button
                                                                    onClick={() => {
                                                                        openCancelLessonModal(
                                                                            lesson
                                                                        );
                                                                    }}
                                                                >
                                                                    <div className="flex items-center gap-2 text-secondary-dark">
                                                                        <TrashIcon />
                                                                        <p className="whitespace-nowrap">
                                                                            Cancel
                                                                        </p>
                                                                    </div>
                                                                </Dropdown.Button>
                                                                <Dropdown.Button
                                                                    onClick={() => {}}
                                                                >
                                                                    <div className="flex items-center gap-2 text-secondary-dark">
                                                                        <HistoryIcon />
                                                                        <p className="whitespace-nowrap">
                                                                            Reschedule
                                                                        </p>
                                                                    </div>
                                                                </Dropdown.Button>
                                                            </>
                                                        )}
                                                    </Dropdown.Content>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </>
                    )}
                </tbody>
            </table>
            {getLessonCountByStatus(pageProps.countLessons, status) > 3 && (
                <div className="mt-4 text-xs font-semibold text-center transition duration-15095ease-in-out text-secondary-400 hover:text-secondary-dark">
                    {showMoreLessons ? (
                        <button onClick={() => setShowMoreLessons(false)}>
                            Show Less
                            <KeyboardArrowUpRoundedIcon />
                        </button>
                    ) : (
                        <button onClick={() => setShowMoreLessons(true)}>
                            Show More
                            <KeyboardArrowDownRoundedIcon />
                        </button>
                    )}
                </div>
            )}

            <LessonDetailsModal
                isModalOpen={lessonDetailsModalOpen}
                setIsModalOpen={setLessonDetailsModalOpen}
                selectedLesson={selectedLesson}
                openCancelLessonModal={openCancelLessonModal}
            />

            <CancelLessonModal
                isModalOpen={cancelLessonModalOpen}
                setIsModalOpen={setCancelLessonModalOpen}
                selectedLesson={selectedLesson}
                // setResponseMessageModalOpen={setResponseMessageModalOpen}
            />
        </div>
    );
}
