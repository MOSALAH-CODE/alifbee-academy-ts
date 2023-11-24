import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useSelector } from "react-redux";
import { selectPageProps } from "@/features/pagePropsSlice";
import withPageProps from "@/Pages/withPageProps";
import HexagonIcon from "@/Components/Icons/HexagonIcon";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { useEffect, useMemo, useState } from "react";
import DurationOption from "./Components/DurationOption";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { OutlineButton } from "@/Components/Buttons";
import { getTimeZone, useCurrentTime } from "@/utils";
import Slot, { SlotType } from "./Components/Calendar/Slot";
import CalendarDays, {
    Day,
    DayAbbreviation,
} from "./Components/Calendar/CalendarDays";
import { addDays, format, startOfWeek, endOfWeek } from "date-fns";

const LessonTime = ({
    time,
    textEnd = false,
}: {
    time: string;
    textEnd?: boolean;
}) => {
    return (
        <p
            className={`text-sm h-14 text-secondary-400 ${
                textEnd ? "text-end  pr-4" : "pl-2"
            }`}
        >
            {time}
        </p>
    );
};

const BookLesson = () => {
    const [dateRangeStart, setDateRangeStart] = useState(new Date());

    const handleShiftLeft = () => {
        const previousWeekStart = addDays(dateRangeStart, -7);
        const currentWeekStart = startOfWeek(new Date());

        // Prevent shifting beyond the current week
        if (previousWeekStart >= currentWeekStart) {
            setDateRangeStart(previousWeekStart);
        }
    };

    const handleShiftRight = () => {
        const nextWeekStart = addDays(dateRangeStart, 7);
        const oneMonthFromNow = addDays(new Date(), 30);

        // Allow shifting to the next week if it's within one month
        if (nextWeekStart <= oneMonthFromNow) {
            setDateRangeStart(nextWeekStart);
        }
    };

    const daysOfWeek: Day[] = [];
    const start = startOfWeek(dateRangeStart);

    for (let i = 0; i < 7; i++) {
        const day = addDays(start, i);
        const dayInfo: Day = {
            abbreviation: format(day, "EEE").toUpperCase() as DayAbbreviation,
            number: parseInt(format(day, "d"), 10),
        };
        daysOfWeek.push(dayInfo);
    }

    const currentTime = useCurrentTime();

    const pageProps = useSelector(selectPageProps);

    const [selectedDuration, setSelectedDuration] = useState(1);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDuration(Number(event.target.value));
    };
    // State to manage selected slots
    const [selectedSlots, setSelectedSlots] = useState<number[]>([]);

    // Handler to select slots
    const handleSlotSelect = (slotIndex: number) => {
        if (!selectedSlots.includes(slotIndex)) {
            setSelectedSlots([...selectedSlots, slotIndex]);
        } else {
            setSelectedSlots(
                selectedSlots.filter((index) => index !== slotIndex)
            );
        }
    };

    return (
        <div className="bg-white">
            <div className="flex-1 max-w-6xl p-12 px-4 mx-auto md:px-6 lg:px-8">
                <div className="flex gap-8">
                    <div className="flex gap-2 items-center">
                        <HexagonIcon fill="primary">
                            <CheckRoundedIcon className="text-secondary-900" />
                        </HexagonIcon>
                        <p className="text-secondary-900">Your Tutor</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <HexagonIcon fill="primary">
                            <p className="text-secondary-900">02</p>
                        </HexagonIcon>
                        <p className="text-secondary-900">Date / time</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <HexagonIcon fill="primary">
                            <p className="text-secondary-900">03</p>
                        </HexagonIcon>
                        <p className="text-secondary-900">Lesson objective</p>
                    </div>
                </div>

                {/* Introduction to lesson duration */}
                <div className="my-8">
                    <h1 className="text-2xl pb-1 text-secondary-dark font-bold">
                        Lesson duration
                    </h1>
                    <p className="text-base text-secondary-400">
                        Choose the time for your first lesson. The timings are
                        displayed in your local timezone.
                    </p>
                </div>

                {/* Duration options */}
                <div className="flex gap-4 justify-between">
                    <DurationOption
                        value={1}
                        label="30 minutes"
                        selected={selectedDuration === 1}
                        onChange={handleRadioChange}
                    />
                    <DurationOption
                        value={2}
                        label="1 hour"
                        selected={selectedDuration === 2}
                        onChange={handleRadioChange}
                    />
                    <DurationOption
                        value={3}
                        label="1 hour 30 minutes"
                        selected={selectedDuration === 3}
                        onChange={handleRadioChange}
                    />
                </div>

                <div className="my-8">
                    <h1 className="text-2xl pb-1 text-secondary-dark font-bold">
                        Choose a time that works for you
                    </h1>
                    <p className="text-base text-secondary-400">
                        Choose the time for your first lesson. The timings are
                        displayed in your local timezone.
                    </p>
                </div>

                {/* Calendar */}
                <div className="grid gap-4">
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <h2 className="w-60 text-xl font-bold text-secondary-dark">
                                {format(startOfWeek(dateRangeStart), "MMM d")} –{" "}
                                {format(
                                    endOfWeek(dateRangeStart),
                                    "MMM d, yyyy"
                                )}
                            </h2>

                            <div className="mr-8">
                                <ChevronLeftRoundedIcon
                                    className="text-secondary-900 cursor-pointer hover:text-primary-500"
                                    onClick={handleShiftLeft}
                                />
                                <ChevronRightRoundedIcon
                                    className="text-secondary-900 cursor-pointer hover:text-primary-500"
                                    onClick={handleShiftRight}
                                />
                            </div>
                            <OutlineButton>Today</OutlineButton>
                        </div>

                        <div className="grid gap-2">
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="block w-3 h-3 rounded-full bg-secondary-50"></span>
                                    <p className="text-sm text-secondary-dark">
                                        Not availlable
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="block w-3 h-3 rounded-full bg-success"></span>
                                    <p className="text-sm text-secondary-dark">
                                        Available
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="block w-3 h-3 rounded-full bg-primary-600"></span>
                                    <p className="text-sm text-secondary-dark">
                                        Booked by you
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="block w-3 h-3 rounded-full bg-success-light border border-dashed border-success"></span>
                                    <p className="text-sm text-secondary-dark">
                                        Booked
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-end items-center gap-2">
                                <p className="text-xs text-secondary-400">
                                    {currentTime} {getTimeZone()} Not your time
                                    zone?
                                </p>
                                <p className="text-sm font-semibold underline text-secondary-dark">
                                    Change
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-0.5">
                        <CalendarDays days={daysOfWeek} />
                        <div className="grid grid-cols-9 gap-0.5 ">
                            <div className="col-span-1">
                                <div className="grid gap-0.5">
                                    <LessonTime textEnd={true} time={"08:00"} />
                                    <LessonTime textEnd={true} time={"08:30"} />
                                    <LessonTime textEnd={true} time={"09:00"} />
                                    <LessonTime textEnd={true} time={"09:30"} />
                                    <LessonTime textEnd={true} time={"10:00"} />
                                    <LessonTime textEnd={true} time={"10:30"} />
                                </div>
                            </div>
                            <div className="col-span-1 grid gap-0.5">
                                <Slot />
                                <Slot />
                                <Slot
                                    type={SlotType.Available}
                                    onSelect={() => handleSlotSelect(0)}
                                    selected={selectedSlots.includes(0)}
                                />
                                <Slot
                                    type={SlotType.Available}
                                    onSelect={() => handleSlotSelect(1)}
                                    selected={selectedSlots.includes(1)}
                                />
                                <Slot />
                                <Slot />
                            </div>
                            <div className="col-span-1 grid gap-0.5">
                                <Slot
                                    type={SlotType.Available}
                                    onSelect={() => handleSlotSelect(0)}
                                    selected={selectedSlots.includes(0)}
                                />
                                <Slot
                                    type={SlotType.Available}
                                    onSelect={() => handleSlotSelect(1)}
                                    selected={selectedSlots.includes(1)}
                                />
                                <Slot />
                                <Slot />
                                <Slot />
                                <Slot />
                            </div>
                            <div className="col-span-1 grid gap-0.5">
                                <Slot />
                                <Slot />
                                <Slot />
                                <Slot />
                                <Slot
                                    type={SlotType.Available}
                                    onSelect={() => handleSlotSelect(0)}
                                    selected={selectedSlots.includes(0)}
                                />
                                <Slot />
                            </div>
                            <div className="col-span-1 grid gap-0.5">
                                <Slot
                                    type={SlotType.Available}
                                    onSelect={() => handleSlotSelect(0)}
                                    selected={selectedSlots.includes(0)}
                                />
                                <Slot />
                                <Slot />
                                <Slot />
                                <Slot />
                                <Slot />
                            </div>
                            <div className="col-span-1 grid gap-0.5">
                                <Slot />
                                <Slot />
                                <Slot />
                                <Slot />
                                <Slot />
                                <Slot />
                            </div>
                            <div className="col-span-1 grid gap-0.5">
                                <Slot />
                                <Slot />
                                <Slot />
                                <Slot />
                                <Slot />
                                <Slot />
                            </div>
                            <div className="col-span-1 grid gap-0.5">
                                <Slot />
                                <Slot />
                                <Slot />
                                <Slot />
                                <Slot />
                                <Slot />
                            </div>
                            <div className="col-span-1 grid gap-0.5">
                                <LessonTime time={"08:00"} />
                                <LessonTime time={"08:30"} />
                                <LessonTime time={"09:00"} />
                                <LessonTime time={"09:30"} />
                                <LessonTime time={"10:00"} />
                                <LessonTime time={"10:30"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withPageProps(BookLesson);
