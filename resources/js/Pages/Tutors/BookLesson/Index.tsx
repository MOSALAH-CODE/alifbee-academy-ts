import { useDispatch, useSelector } from "react-redux";
import { selectPageProps } from "@/features/pagePropsSlice";
import withPageProps from "@/Pages/withPageProps";
import HexagonIcon from "@/Components/Icons/HexagonIcon";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { useEffect, useState } from "react";
import DurationOption from "./Components/DurationOption";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { OutlineButton, PrimaryButton } from "@/Components/Buttons";
import { getTimeZone, useCurrentTime } from "@/utils";
import Slot, { SlotType } from "./Components/Calendar/Slot";
import CalendarDays, {
    Day,
    DayAbbreviation,
} from "./Components/Calendar/CalendarDays";
import { addDays, format, startOfWeek, endOfWeek } from "date-fns";
import { Lesson, Tutor, TutorLesson, User } from "@/types";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link, useForm } from "@inertiajs/react";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import { selectBookLesson, setBookLesson } from "@/features/bookLessonSlice";

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

const currentTime = new Date();

const LessonTime = ({
    time,
    textEnd = false,
}: {
    time: string;
    textEnd?: boolean;
}) => {
    const [hour, minute] = time.split(":").map(Number);
    const lessonTime = new Date();
    lessonTime.setHours(hour, minute);
    const thirtyMinutesAfter = new Date(lessonTime.getTime() + 30 * 60000);
    const isActive =
        currentTime >= lessonTime && currentTime <= thirtyMinutesAfter;
    return (
        <p
            className={`text-xs md:text-sm h-10 md:h-14 text-secondary-400 ${
                textEnd ? "text-end pr-4" : "pl-2"
            } ${isActive && "bg-primary-100"}`}
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

    useEffect(() => {
        setSelectedSlots([]);
    }, [selectedDuration]);

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
        pageProps.tutorLessons.forEach((lesson) => {
            const lessonStartDate = new Date(lesson.start_date);
            const lessonEndDate = new Date(lesson.end_date);

            const timeDiffInMilliseconds =
                lessonEndDate.getTime() - lessonStartDate.getTime();
            const timeDiffInMinutes = timeDiffInMilliseconds / (1000 * 60);

            // Assuming the duration is 30 minutes, change this value as needed
            const durationInMinutes = 30;

            for (
                let index = 0;
                index < timeDiffInMinutes / durationInMinutes;
                index++
            ) {
                const modifiedStartDate = new Date(
                    lessonStartDate.getTime() +
                        index * durationInMinutes * 60 * 1000
                );

                const hour = modifiedStartDate.getHours();
                const minutes = modifiedStartDate.getMinutes();

                const timeKey = timeKeys.find(
                    (key) => key.hour === hour && key.minutes === minutes
                );

                if (timeKey) {
                    const { id } = timeKey;

                    const lessonDate = format(modifiedStartDate, "yyyy-MM-dd");

                    if (!tutorLessonsMap[lessonDate]) {
                        tutorLessonsMap[lessonDate] = {};
                    }

                    if (!tutorLessonsMap[lessonDate][id]) {
                        tutorLessonsMap[lessonDate][id] = lesson;
                    }
                }
            }
        });

        const lessonsMap: LessonsMap = {};

        let index = 1000; // Initialize index outside the mapping functions
        let status = "Available";

        const currentDate = new Date();
        const oneMonthAfter = addDays(new Date(), 30);

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

                    if (currentDate > startDate || startDate >= oneMonthAfter) {
                        status = "Not available";
                    } else {
                        status = "Available";
                    }

                    const endDate = new Date(startDate);
                    endDate.setMinutes(startDate.getMinutes() + 30);

                    lessonsMap[lessonDate][lessonId] = new TutorLesson(
                        index,
                        pageProps.auth.user.id,
                        1,
                        startDate,
                        endDate,
                        status
                    );

                    index++;
                }
            });
        });

        return lessonsMap;
    };

    const mappedLessons: LessonsMap = mapOnLessons();

    const handleTodayClick = () => {
        // Set the date back to the start of the current week
        setDateRangeStart(startOfWeek(new Date()));
    };

    const createLesson = () => {
        if (selectedSlots.length > 0) {
            const timeKey = timeKeys.find(
                (key) => key.id === selectedSlots[0]?.timeKeyId
            );
            if (timeKey) {
                const startDate = new Date(selectedSlots[0].date);
                startDate.setHours(timeKey.hour, timeKey.minutes);

                const endDate = new Date(startDate.getTime());
                endDate.setMinutes(
                    startDate.getMinutes() + selectedSlots.length * 30
                );

                const lesson = new Lesson(
                    10000,
                    pageProps.auth.user.id,
                    pageProps.tutor.id,
                    selectedSlots.length,
                    startDate,
                    endDate,
                    "upcoming",
                    "meet.zoom.com/oup-dxjr",
                    "12345",
                    pageProps.tutor
                );
                return lesson;
            }
        }
        return null;
    };

    const dispatch = useDispatch();

    return (
        <div className="bg-white">
            <div className="fixed top-5 right-5">
                <Link
                    href={route("tutors")}
                    className="flex items-center justify-center w-10 h-10 bg-white border rounded-full shadow-xl cursor-pointer border-gray-50 text-secondary-dark"
                >
                    <CloseRoundedIcon />
                </Link>
            </div>
            <div className="flex-1 max-w-6xl p-12 px-4 mx-auto md:px-6 lg:px-8">
                <div className="flex justify-between ">
                    <div className="flex flex-col gap-4 sm:gap-8 sm:flex-row">
                        <div className="flex items-center gap-2">
                            <HexagonIcon fill="primary">
                                <CheckRoundedIcon className="text-secondary-900" />
                            </HexagonIcon>
                            <p className="text-secondary-900">Your Tutor</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <HexagonIcon fill="primary">
                                <p className="text-secondary-900">02</p>
                            </HexagonIcon>
                            <p className="text-secondary-900">Date / time</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <HexagonIcon fill="#8E7F91">
                                <p className="text-white">03</p>
                            </HexagonIcon>
                            <p className="text-secondary-400">
                                Lesson objective
                            </p>
                        </div>
                    </div>
                </div>

                {/* Introduction to lesson duration */}
                <div className="my-4 md:my-8">
                    <h1 className="pb-1 text-2xl font-bold text-secondary-dark">
                        Lesson duration
                    </h1>
                    <p className="text-base text-secondary-400">
                        Choose the time for your first lesson. The timings are
                        displayed in your local timezone.
                    </p>
                </div>

                {/* Duration options */}
                <div className="flex flex-col justify-between gap-4 md:flex-row">
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
                    <h1 className="pb-1 text-2xl font-bold text-secondary-dark">
                        Choose a time that works for you
                    </h1>
                    <p className="text-base text-secondary-400">
                        Choose the time for your first lesson. The timings are
                        displayed in your local timezone.
                    </p>
                </div>

                {/* Calendar */}
                <div className="grid gap-4">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:gap-0">
                        <div className="flex items-center">
                            <h2 className="text-xl font-bold w-60 text-secondary-dark">
                                {format(startOfWeek(dateRangeStart), "MMM d")} –{" "}
                                {format(
                                    endOfWeek(dateRangeStart),
                                    "MMM d, yyyy"
                                )}
                            </h2>

                            <div className="md:mr-8">
                                <ChevronLeftRoundedIcon
                                    className="cursor-pointer text-secondary-900 hover:text-primary-500"
                                    onClick={handleShiftLeft}
                                />
                                <ChevronRightRoundedIcon
                                    className="cursor-pointer text-secondary-900 hover:text-primary-500"
                                    onClick={handleShiftRight}
                                />
                            </div>
                            <OutlineButton
                                className="hidden md:block"
                                onClick={handleTodayClick}
                            >
                                Today
                            </OutlineButton>
                        </div>

                        <div className="grid gap-2 md:justify-end">
                            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
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
                                    <span className="block w-3 h-3 border border-dashed rounded-full bg-success-light border-success"></span>
                                    <p className="text-sm text-secondary-dark">
                                        Booked
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 md:justify-end">
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
                    <div className="grid gap-0.5 h-96 overflow-auto">
                        <CalendarDays days={daysOfWeek} />
                        <div className="grid grid-cols-8 md:grid-cols-9 gap-0.5 ">
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
                                        );
                                    })}
                                </div>
                            ))}
                            <div className="hidden md:grid col-span-1 gap-0.5">
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

                <div className="flex items-center justify-end gap-2 mt-6">
                    <Link href={route("tutors")}>
                        <OutlineButton>Cancel</OutlineButton>
                    </Link>
                    <Link
                        onClick={() => {
                            const newLesson = createLesson();
                            dispatch(setBookLesson(newLesson));
                        }}
                        href={route("bookLesson.details.create")}
                    >
                        <PrimaryButton
                            disabled={selectedSlots.length <= 0}
                            className="flex"
                        >
                            <p>Continue</p>
                            <ChevronRightRoundedIcon
                                style={{ fontSize: "18px" }}
                            />
                        </PrimaryButton>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default withPageProps(BookLesson);
