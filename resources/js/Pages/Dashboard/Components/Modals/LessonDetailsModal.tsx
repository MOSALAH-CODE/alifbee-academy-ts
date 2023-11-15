import Modal from "@/Components/Modal";
import CopyToClipboardButton from "@/Components/CopyToClipboardButton";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { Lesson } from "@/types";
import {
    formatDate,
    formatLessonTime,
    formatTime,
    getDayOfDate,
    getTimeZone,
} from "@/utils";
import HexagonIcon from "@/Components/Icons/HexagonIcon";
import { getIconColor, getStatusColor } from "../LessonsTable";
import { OutlineButton, PrimaryButton } from "@/Components/Buttons";
import TrashIcon from "@/Components/Icons/TrashIcon";
import HistoryIcon from "@/Components/Icons/HistoryIcon";

interface LessonDetailsModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    selectedLesson: Lesson | null;
    openCancelLessonModal: (lesson: Lesson) => void;
}

function LessonDetailsModal({
    isModalOpen,
    setIsModalOpen,
    selectedLesson,
    openCancelLessonModal,
}: LessonDetailsModalProps) {
    return (
        <Modal
            show={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            maxWidth="xl"
        >
            {selectedLesson && (
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-secondary-dark">
                            Lesson Details
                        </h2>
                        <button onClick={() => setIsModalOpen(false)}>
                            <CloseRoundedIcon className="text-secondary-dark" />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-secondary-dark">
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="h-16">
                                        <div className="flex gap-2">
                                            <HexagonIcon
                                                width={24}
                                                height={24}
                                                fill="#F0EEF0"
                                            >
                                                <DoneRoundedIcon />
                                            </HexagonIcon>
                                            <p className="text-secondary-400">
                                                Status
                                            </p>
                                        </div>
                                    </td>
                                    <td className="h-16">
                                        <div className="flex items-center">
                                            <div
                                                className={`px-2 py-1 capitalize border rounded whitespace-nowrap ${getStatusColor(
                                                    selectedLesson.status
                                                )} text-secondary-dark`}
                                            >
                                                <FiberManualRecordIcon
                                                    className={`mr-1 ${getIconColor(
                                                        selectedLesson.status
                                                    )}`}
                                                    style={{ fontSize: "8px" }}
                                                />
                                                {selectedLesson.status}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="h-16">
                                        <div className="flex gap-2">
                                            <HexagonIcon
                                                width={24}
                                                height={24}
                                                fill="#F0EEF0"
                                            >
                                                <DoneRoundedIcon />
                                            </HexagonIcon>
                                            <p className="text-secondary-400">
                                                Date/Time
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <p>
                                            {formatLessonTime(
                                                selectedLesson.start_date,
                                                selectedLesson.end_date
                                            )}
                                            {", "}
                                            {getDayOfDate(
                                                selectedLesson.start_date
                                            )}
                                            {", "}
                                            <br />
                                            {formatDate(
                                                selectedLesson.start_date
                                            )}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="h-16">
                                        <div className="flex gap-2">
                                            <HexagonIcon
                                                width={24}
                                                height={24}
                                                fill="#F0EEF0"
                                            >
                                                <DoneRoundedIcon />
                                            </HexagonIcon>
                                            <p className="text-secondary-400">
                                                Lesson objective
                                            </p>
                                        </div>
                                    </td>
                                    <td>Reading</td>
                                </tr>
                                <tr>
                                    <td className="h-16">
                                        <div className="flex gap-2">
                                            <HexagonIcon
                                                width={24}
                                                height={24}
                                                fill="#F0EEF0"
                                            >
                                                <DoneRoundedIcon />
                                            </HexagonIcon>
                                            <p className="text-secondary-400">
                                                Language level
                                            </p>
                                        </div>
                                    </td>
                                    <td>B2: Intermediate</td>
                                </tr>
                                <tr>
                                    <td className="h-16">
                                        <div className="flex gap-2">
                                            <HexagonIcon
                                                width={24}
                                                height={24}
                                                fill="#F0EEF0"
                                            >
                                                <DoneRoundedIcon />
                                            </HexagonIcon>
                                            <p className="text-secondary-400">
                                                Tutor
                                            </p>
                                        </div>
                                    </td>
                                    <td>{selectedLesson?.tutor?.name}</td>
                                </tr>
                                <tr>
                                    <td className="h-16">
                                        <div className="flex gap-2">
                                            <HexagonIcon
                                                width={24}
                                                height={24}
                                                fill="#F0EEF0"
                                            >
                                                <DoneRoundedIcon />
                                            </HexagonIcon>
                                            <p className="text-secondary-400">
                                                Price
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <p>
                                            {selectedLesson.credit_cost}{" "}
                                            {selectedLesson.credit_cost === 1
                                                ? "credit"
                                                : "credits"}
                                        </p>
                                    </td>
                                </tr>
                                {selectedLesson.status === "upcoming" && (
                                    <tr>
                                        <td className="h-16">
                                            <div className="flex gap-2">
                                                <HexagonIcon
                                                    width={24}
                                                    height={24}
                                                    fill="#F0EEF0"
                                                >
                                                    <DoneRoundedIcon />
                                                </HexagonIcon>
                                                <p className="text-secondary-400">
                                                    Zoom link
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="grid">
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        className="flex-none"
                                                        src="/icons/zoom.png"
                                                        width={16}
                                                        height={16} // Add height to maintain aspect ratio
                                                        alt=""
                                                    />
                                                    <p>
                                                        <span>Meet ID:</span>{" "}
                                                        {selectedLesson.meet_id}
                                                    </p>
                                                    <CopyToClipboardButton
                                                        text={
                                                            selectedLesson?.meet_id
                                                        }
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        className="flex-none"
                                                        src="/icons/zoom.png"
                                                        width={16}
                                                        height={16} // Add height to maintain aspect ratio
                                                        alt=""
                                                    />
                                                    <p>
                                                        <span>Password:</span>{" "}
                                                        {
                                                            selectedLesson.password
                                                        }
                                                    </p>
                                                    <CopyToClipboardButton
                                                        text={
                                                            selectedLesson?.password
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {selectedLesson.status === "upcoming" && (
                        <div className="flex gap-6 mt-4">
                            <OutlineButton
                                className="text-sm"
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setTimeout(() => {
                                        openCancelLessonModal(selectedLesson);
                                    }, 300);
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <TrashIcon />
                                    <p>Cancel lesson</p>
                                </div>
                            </OutlineButton>
                            <PrimaryButton className="text-sm">
                                <div className="flex items-center gap-2">
                                    <HistoryIcon />
                                    <p>Reschedule</p>
                                </div>
                            </PrimaryButton>
                        </div>
                    )}
                </div>
            )}
        </Modal>
    );
}

export default LessonDetailsModal;
