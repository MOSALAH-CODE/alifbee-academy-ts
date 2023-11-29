import CalendarIcon from "@/Components/Icons/CalendarIcon";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Tooltip, Button } from "@material-tailwind/react";
import { CustomTooltip } from "@/Components/CustomTooltip";

export enum SlotType {
    NotAvailable = "Not available",
    Available = "Available",
    BookedByYou = "Booked by you",
    Booked = "Booked",
}

export const getStatusColor = (status: string) => {
    switch (status) {
        case "Available":
            return "bg-success-light border-success";
        case "Booked by you":
            return "bg-amber-50 border-amber-400";
        case "Booked":
            return "bg-success-light border-2 border-success border-dashed deg45 stripes";
        default:
            return "";
    }
};

export const getIconColor = (status: string) => {
    switch (status) {
        case "Available":
            return "text-green-400";
        case "Booked by you":
            return "text-amber-400";
        case "Booked":
            return "text-success";
        default:
            return "";
    }
};

type SlotProps = {
    type?: SlotType | string;
    onSelect?: (date: string, timeKeyId: number) => void;
    selected?: boolean;
    formattedDate?: string;
    timeKeyId?: number;
    date?: string;
    timeRange?: string;
};

const Slot = ({
    type = SlotType.NotAvailable,
    onSelect,
    selected = false,
    formattedDate = "",
    timeKeyId = -1,
    date = "",
    timeRange = "",
}: SlotProps) => {
    let slotContent;

    const handleSlotClick = () => {
        if (type === SlotType.Available && onSelect) {
            onSelect(formattedDate, timeKeyId);
        }
    };

    switch (type) {
        case SlotType.NotAvailable:
            slotContent = <div className="h-10 md:h-14 bg-body"></div>;
            break;
        case SlotType.Available:
            slotContent = (
                <div
                    className={`h-10 md:h-14 cursor-pointer transition ease-in-out duration-150 ${
                        selected
                            ? "bg-secondary-800"
                            : "bg-success-100 border-2 border-success hover:bg-success"
                    }`}
                    onClick={handleSlotClick}
                ></div>
            );
            break;
        case SlotType.BookedByYou:
            slotContent = (
                <div className="h-10 cursor-pointer md:h-14 bg-primary-600 hover:bg-primary-800"></div>
            );
            break;
        case SlotType.Booked:
            slotContent = (
                <div className="h-10 border-2 border-dashed cursor-pointer md:h-14 bg-success-light border-success deg45 stripes"></div>
            );
            break;
        default:
            slotContent = <div></div>;
    }

    return (
        <>
            {type === SlotType.NotAvailable ? (
                <>{slotContent}</>
            ) : (
                <>
                    <CustomTooltip
                        content={
                            <div>
                                <div className="grid justify-center gap-2 justify-items-center">
                                    <div className="flex gap-2">
                                        <CalendarIcon className="stroke-secondary-dark pt-0.5" />
                                        <div className="text-base text-secondary-dark">
                                            <p>{date}</p>
                                            <p>{timeRange}</p>
                                        </div>
                                    </div>
                                    <div
                                        className={`flex w-fit items-center px-2 py-1 capitalize border rounded whitespace-nowrap ${getStatusColor(
                                            type
                                        )} text-secondary-dark`}
                                    >
                                        <FiberManualRecordIcon
                                            className={`mr-1 ${getIconColor(
                                                type
                                            )}`}
                                            style={{ fontSize: "8px" }}
                                        />
                                        {type}
                                    </div>
                                </div>
                            </div>
                        }
                    >
                        {slotContent}
                    </CustomTooltip>
                </>
            )}
        </>
    );
};

export default Slot;
