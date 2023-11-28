export type DayAbbreviation =
    | "MON"
    | "TUE"
    | "WED"
    | "THU"
    | "FRI"
    | "SAT"
    | "SUN";

export type Day = {
    abbreviation: DayAbbreviation;
    number: number;
    formattedDate: string;
};

type CalendarGridProps = {
    days: Day[];
};

const currentDate = new Date();
const formattedCurrentDate = currentDate.toISOString().split("T")[0];

const DayCell = ({ day, first = false }: { day: Day; first: boolean }) => {
    return (
        <div
            className={`${first && "col-start-2"} col-span-1 p-2 ${
                day.formattedDate === formattedCurrentDate && "bg-primary-100"
            }`}
        >
            <div>
                <p className="text-sm text-secondary-400">{day.abbreviation}</p>
                <p className="text-2xl font-bold text-secondary-dark">
                    {day.number}
                </p>
            </div>
        </div>
    );
};

const CalendarDays = ({ days }: CalendarGridProps) => {
    return (
        <div
            className="grid grid-cols-9 divide-x-2 bg-white shadow-sm"
            style={{ position: "sticky", top: 0, width: "100%", zIndex: 0 }}
        >
            {days.map((day, index) => (
                <DayCell key={index} day={day} first={index === 0} />
            ))}
        </div>
    );
};

export default CalendarDays;
