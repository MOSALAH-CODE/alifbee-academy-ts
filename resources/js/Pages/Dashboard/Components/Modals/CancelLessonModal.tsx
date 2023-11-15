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
    getLessonsDuration,
} from "@/utils";
import HexagonIcon from "@/Components/Icons/HexagonIcon";
import { getIconColor, getStatusColor } from "../LessonsTable";
import { OutlineButton, PrimaryButton } from "@/Components/Buttons";
import TrashIcon from "@/Components/Icons/TrashIcon";
import HistoryIcon from "@/Components/Icons/HistoryIcon";
import { Link } from "@inertiajs/react";

interface CancelLessonModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    selectedLesson: Lesson | null;
}

function CancelLessonModal({
    isModalOpen,
    setIsModalOpen,
    selectedLesson,
}: CancelLessonModalProps) {
    let hours: number = 0;
    let minutes: number = 0;

    if (selectedLesson) {
        const duration = getLessonsDuration(
            selectedLesson.start_date,
            selectedLesson.end_date
        );
        hours = duration.hours;
        minutes = duration.minutes;
    }

    return (
        <Modal
            show={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            maxWidth="xl"
        >
            {selectedLesson && (
                <div className="p-6">
                    <div className="flex items-center justify-end">
                        <button onClick={() => setIsModalOpen(false)}>
                            <CloseRoundedIcon className="text-secondary-dark" />
                        </button>
                    </div>
                    <div className="mt-2 overflow-x-auto">
                        <h2 className="text-2xl font-semibold text-secondary-dark">
                            Canceled lesson,{" "}
                            {formatTime(selectedLesson.start_date)}
                            {", "}
                            {getDayOfDate(selectedLesson.start_date)}
                            {", "}
                            {formatDate(selectedLesson.start_date)}{" "}
                            {hours > 0 && hours + " hour "}
                            {minutes > 0 && minutes + " minutes "}
                            Live Lesson
                        </h2>
                        <p className="mt-3 text-gray-600">
                            If you cancel less than 24 hours before your
                            scheduled lesson, this is considered a late
                            cancellation, and you will forfeit the lesson,{" "}
                            <Link
                                href="#"
                                className="font-semibold text-secondary-dark hover:text-primary-dark"
                            >
                                privacy policy
                            </Link>
                        </p>
                        <div className="flex gap-6 mt-8">
                            <OutlineButton
                                className="text-sm"
                                onClick={() => {
                                    setIsModalOpen(false);
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <p>No, Don't Cancel</p>
                                </div>
                            </OutlineButton>
                            <PrimaryButton className="text-sm">
                                <div className="flex items-center gap-2">
                                    <TrashIcon />
                                    <p>Yes, Cancel My lesson</p>
                                </div>
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
}

export default CancelLessonModal;
