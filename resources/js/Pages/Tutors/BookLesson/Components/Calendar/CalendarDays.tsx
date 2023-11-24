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
};

type CalendarGridProps = {
    days: Day[];
};

const DayCell = ({ day, first = false }: { day: Day; first: boolean }) => {
    return (
        <div className={`${first && "col-start-2"} col-span-1 p-2`}>
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
        <div className="grid grid-cols-9 divide-x-2">
            {days.map((day, index) => (
                <DayCell key={index} day={day} first={index === 0} />
            ))}
        </div>
    );
};

export default CalendarDays;
