import { useSelector } from "react-redux";
import { selectPageProps } from "@/features/pagePropsSlice";
import withPageProps from "@/Pages/withPageProps";
import HexagonIcon from "@/Components/Icons/HexagonIcon";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { useEffect, useState } from "react";
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
import { TutorLesson } from "@/types";

type TimeKey = {
    id: number;
    hour: number;
    minutes: number;
};

type LessonsMap = {
    [date: string]: {
        [timeKeyId: number]: TutorLesson;
    };
};

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
            formattedDate: format(day, "yyyy-MM-dd"),
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
    const [selectedSlots, setSelectedSlots] = useState<
        { date: string; timeKeyId: number }[]
    >([]);

    const handleSlotSelect = (_date: string, _timeKeyId: number) => {
        // Check if the selected slot is available
        const isAvailable =
            mappedLessons[_date]?.[_timeKeyId]?.status === SlotType.Available;

        if (!isAvailable) return; // Return if the selected slot is not available

        let slotsToSelect = 1;

        if (selectedDuration === 2) {
            // If duration is 2, select the next available slot if it exists
            const nextSlotAvailable =
                mappedLessons[_date]?.[_timeKeyId + 1]?.status ===
                SlotType.Available;
            if (nextSlotAvailable) {
                slotsToSelect = 2;
            } else {
                slotsToSelect = 0;
            }
        } else if (selectedDuration === 3) {
            // If duration is 3, select the next 2 available slots if they exist
            const nextTwoSlotsAvailable =
                mappedLessons[_date]?.[_timeKeyId + 1]?.status ===
                    SlotType.Available &&
                mappedLessons[_date]?.[_timeKeyId + 2]?.status ===
                    SlotType.Available;
            if (nextTwoSlotsAvailable) {
                slotsToSelect = 3;
            } else {
                slotsToSelect = 0;
            }
        }

        // Select the slots
        let selectedSlotsArr: { date: string; timeKeyId: number }[] = [];
        for (let i = 0; i < slotsToSelect; i++) {
            if (
                mappedLessons[_date]?.[_timeKeyId + i]?.status ===
                SlotType.Available
            ) {
                selectedSlotsArr.push({
                    date: _date,
                    timeKeyId: _timeKeyId + i,
                });
            } else {
                // If any of the consecutive slots are not available, break the loop
                break;
            }
        }

        setSelectedSlots(selectedSlotsArr);
    };

    const timeKeys: TimeKey[] = [];

    let id = 0;
    for (let hour = 8; hour <= 16; hour++) {
        for (let minutes = 0; minutes < 60; minutes += 30) {
            timeKeys.push({
                id,
                hour,
                minutes,
            });
            id++;
        }
    }

    const mapOnLessons = () => {
        const tutorLessonsMap: LessonsMap = {};

        // Assuming pageProps.tutorLessons contains lesson data
        pageProps.tutorLessons.forEach((lesson) => {
            const lessonStartDate = lesson.start_date; // Start date of the lesson

            const lessonDate = format(lessonStartDate, "yyyy-MM-dd"); // Format lesson date

            // Get the hour and minutes from the lesson start date
            const hour = lessonStartDate.getHours();
            const minutes = lessonStartDate.getMinutes();

            // Find the timeKeyId that matches the lesson time
            const timeKey = timeKeys.find(
                (key) => key.hour === hour && key.minutes === minutes
            );

            // If a matching timeKey is found, use its id as timeKeyId
            if (timeKey) {
                const { id } = timeKey;

                // Check if the lessonsMap already has the date key
                if (!tutorLessonsMap[lessonDate]) {
                    tutorLessonsMap[lessonDate] = {};
                }

                // Check if the lessonsMap for the specific date has the timeKeyId key
                if (!tutorLessonsMap[lessonDate][id]) {
                    tutorLessonsMap[lessonDate][id] = lesson;
                }
            }
        });

        const lessonsMap: LessonsMap = {};

        let index = 1000; // Initialize index outside the mapping functions

        daysOfWeek.forEach((day) => {
            lessonsMap[day.formattedDate] = {}; // Initialize each day's map

            timeKeys.forEach((timeKey) => {
                const lessonDate = day.formattedDate;
                const lessonId = timeKey.id;

                if (tutorLessonsMap[lessonDate]?.[lessonId]) {
                    // Copy the existing lesson from tutorLessonsMap
                    lessonsMap[lessonDate][lessonId] =
                        tutorLessonsMap[lessonDate][lessonId];
                } else {
                    // Create a new TutorLesson if not found in tutorLessonsMap
                    const startDate = new Date(lessonDate);
                    startDate.setHours(timeKey.hour, timeKey.minutes);

                    // if (new Date() >)

                    const endDate = new Date(startDate);
                    endDate.setMinutes(startDate.getMinutes() + 30);

                    lessonsMap[lessonDate][lessonId] = new TutorLesson(
                        index,
                        pageProps.auth.user.id,
                        1,
                        startDate,
                        endDate,
                        "Available"
                    );

                    index++;
                }
            });
        });

        return lessonsMap;
    };

    const mappedLessons: LessonsMap = mapOnLessons();

    useEffect(() => {
        console.log(selectedSlots);
    }, [selectedSlots]);

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
                                    {timeKeys.map((timeKey) => (
                                        <LessonTime
                                            key={timeKey.id}
                                            textEnd={true}
                                            time={`${String(
                                                timeKey.hour
                                            ).padStart(2, "0")}:${String(
                                                timeKey.minutes
                                            ).padStart(2, "0")}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            {daysOfWeek.map((day) => (
                                <div className="col-span-1 grid gap-0.5">
                                    {timeKeys.map((timeKey) => {
                                        const startDate = new Date(
                                            day.formattedDate
                                        );
                                        startDate.setHours(
                                            timeKey.hour,
                                            timeKey.minutes
                                        );

                                        const endDate = new Date(startDate);
                                        endDate.setMinutes(
                                            startDate.getMinutes() + 30
                                        );

                                        return (
                                            <div className="h-14">
                                                <Slot
                                                    type={
                                                        mappedLessons[
                                                            day.formattedDate
                                                        ]?.[timeKey.id]?.status
                                                    }
                                                    onSelect={() =>
                                                        handleSlotSelect(
                                                            day.formattedDate,
                                                            timeKey.id
                                                        )
                                                    }
                                                    selected={selectedSlots.some(
                                                        (slot) =>
                                                            slot.date ===
                                                                day.formattedDate &&
                                                            slot.timeKeyId ===
                                                                timeKey.id
                                                    )}
                                                    date={format(
                                                        startDate,
                                                        "EEE, MMM d, yyyy"
                                                    )} // Format date
                                                    timeRange={`${format(
                                                        startDate,
                                                        "hh:mm a"
                                                    )} - ${format(
                                                        endDate,
                                                        "hh:mm a"
                                                    )}`}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                            <div className="col-span-1 grid gap-0.5">
                                {timeKeys.map((timeKey) => (
                                    <LessonTime
                                        key={timeKey.id}
                                        time={`${String(timeKey.hour).padStart(
                                            2,
                                            "0"
                                        )}:${String(timeKey.minutes).padStart(
                                            2,
                                            "0"
                                        )}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withPageProps(BookLesson);
