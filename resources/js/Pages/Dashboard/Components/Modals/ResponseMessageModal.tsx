import Modal from "@/Components/Modal";

import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HexagonIcon from "@/Components/Icons/HexagonIcon";
import { router } from "@inertiajs/react";

interface ResponseMessageModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    lessonCancelResponse: {
        success: boolean | null;
        message: string;
    };
}

function ResponseMessageModal({
    isModalOpen,
    setIsModalOpen,
    lessonCancelResponse,
}: ResponseMessageModalProps) {
    function closeModal() {
        setIsModalOpen(false);
        router.get(route("dashboard"));
    }

    return (
        <Modal show={isModalOpen} onClose={() => closeModal()} maxWidth="xl">
            <div className="p-6">
                <div className="flex items-center justify-end">
                    <button onClick={() => closeModal()}>
                        <CloseRoundedIcon className="text-secondary-dark" />
                    </button>
                </div>
                <div className="mt-2 overflow-x-auto">
                    <div className="grid justify-items-center">
                        <HexagonIcon
                            width={75}
                            height={75}
                            fill={`${
                                lessonCancelResponse.success
                                    ? "#479F55"
                                    : "#E5383D"
                            }`}
                        >
                            <DoneRoundedIcon />
                        </HexagonIcon>
                        <h2 className="text-2xl font-semibold text-secondary-dark">
                            You cancel lesson{" "}
                            {lessonCancelResponse.success
                                ? "successful"
                                : "failed"}
                        </h2>
                        <h5 className="text-sm text-gray-500">
                            {lessonCancelResponse.message}
                        </h5>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ResponseMessageModal;
