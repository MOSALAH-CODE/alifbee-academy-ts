export enum SlotType {
    NotAvailable = "Not available",
    Available = "Available",
    BookedByYou = "Booked by you",
    Booked = "Booked",
}

type SlotProps = {
    type?: SlotType;
};

const Slot = ({ type = SlotType.NotAvailable }: SlotProps) => {
    let slotContent;

    switch (type) {
        case SlotType.NotAvailable:
            slotContent = <div className="col-span-1 h-14 bg-body"></div>;
            break;
        case SlotType.Available:
            slotContent = (
                <div className="col-span-1 h-14 bg-success-100 border-2 border-success hover:bg-success"></div>
            );
            break;
        case SlotType.BookedByYou:
            slotContent = (
                <div className="col-span-1 h-14 bg-primary-600 hover:bg-primary-800"></div>
            );
            break;
        case SlotType.Booked:
            slotContent = (
                <div className="col-span-1 h-14 bg-success-light border-2 border-success border-dashed deg45 stripes"></div>
            );
            break;
        default:
            slotContent = null;
    }

    return slotContent;
};

export default Slot;
