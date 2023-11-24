import React, { useState } from "react";

export enum SlotType {
    NotAvailable = "not-available",
    Available = "available",
    BookedByYou = "booked-by-you",
    Booked = "booked",
}

type SlotProps = {
    type?: SlotType;
    onSelect?: () => void;
    selected?: boolean;
};

const Slot = ({
    type = SlotType.NotAvailable,
    onSelect,
    selected = false,
}: SlotProps) => {
    let slotContent;

    const handleSlotClick = () => {
        if (type === SlotType.Available && onSelect) {
            onSelect();
        }
    };

    switch (type) {
        case SlotType.NotAvailable:
            slotContent = <div className="h-14 bg-body"></div>;
            break;
        case SlotType.Available:
            slotContent = (
                <div
                    className={`h-14 cursor-pointer transition ease-in-out duration-150 ${
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
                <div className="h-14 bg-primary-600 hover:bg-primary-800"></div>
            );
            break;
        case SlotType.Booked:
            slotContent = (
                <div className="h-14 bg-success-light border-2 border-success border-dashed deg45 stripes"></div>
            );
            break;
        default:
            slotContent = null;
    }

    return slotContent;
};

export default Slot;
