import Authenticated from "@/Layouts/AuthenticatedLayout";
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
import CalendarDays from "./Components/Calendar/CalendarDays";

const BookLesson = () => {
    const currentTime = useCurrentTime();

    const pageProps = useSelector(selectPageProps);

    const [selectedDuration, setSelectedDuration] = useState(1);

    useEffect(() => {
        console.log(selectedDuration);
    }, [selectedDuration]);
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDuration(Number(event.target.value));
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
                        <div className="flex gap-8 items-center">
                            <h2 className="text-xl font-bold text-secondary-dark">
                                Dec 21–27, 2021
                            </h2>

                            <div>
                                <ChevronLeftRoundedIcon className="text-secondary-900" />
                                <ChevronRightRoundedIcon className="text-secondary-900" />
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
                        <CalendarDays
                            days={[
                                { abbreviation: "MON", number: 21 },
                                { abbreviation: "TUE", number: 22 },
                                { abbreviation: "WED", number: 23 },
                                { abbreviation: "THU", number: 24 },
                                { abbreviation: "FRI", number: 25 },
                                { abbreviation: "SAT", number: 26 },
                                { abbreviation: "SUN", number: 27 },
                            ]}
                        />
                        <div className="grid grid-cols-9 gap-0.5 ">
                            <div className="col-span-1 h-14">
                                <p className="text-sm text-secondary-400 text-end pr-4">
                                    08:00
                                </p>
                            </div>
                            <Slot />
                            <Slot type={SlotType.Booked} />
                            <Slot type={SlotType.BookedByYou} />
                            <Slot type={SlotType.Available} />
                            <Slot type={SlotType.Booked} />
                            <Slot type={SlotType.BookedByYou} />
                            <Slot type={SlotType.Available} />
                            <div className="col-span-1 h-14">
                                <p className="text-sm text-secondary-400 pl-2">
                                    08:00
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-9 gap-0.5">
                            <div className="col-span-1 h-14">
                                <p className="text-sm text-secondary-400 text-end pr-4">
                                    08:30
                                </p>
                            </div>
                            <Slot />
                            <Slot type={SlotType.Booked} />
                            <Slot type={SlotType.BookedByYou} />
                            <Slot type={SlotType.Available} />
                            <Slot type={SlotType.Booked} />
                            <Slot type={SlotType.BookedByYou} />
                            <Slot type={SlotType.Available} />
                            <div className="col-span-1 h-14">
                                <p className="text-sm text-secondary-400 pl-2">
                                    08:30
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-9 gap-0.5">
                            <div className="col-span-1 h-14">
                                <p className="text-sm text-secondary-400 text-end pr-4">
                                    09:00
                                </p>
                            </div>
                            <Slot />
                            <Slot type={SlotType.Booked} />
                            <Slot type={SlotType.BookedByYou} />
                            <Slot type={SlotType.Available} />
                            <Slot type={SlotType.Booked} />
                            <Slot type={SlotType.BookedByYou} />
                            <Slot type={SlotType.Available} />
                            <div className="col-span-1 h-14">
                                <p className="text-sm text-secondary-400 pl-2">
                                    09:00
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-9 gap-0.5">
                            <div className="col-span-1 h-14">
                                <p className="text-sm text-secondary-400 text-end pr-4">
                                    09:30
                                </p>
                            </div>
                            <Slot />
                            <Slot type={SlotType.Booked} />
                            <Slot type={SlotType.BookedByYou} />
                            <Slot type={SlotType.Available} />
                            <Slot type={SlotType.Booked} />
                            <Slot type={SlotType.BookedByYou} />
                            <Slot type={SlotType.Available} />
                            <div className="col-span-1 h-14">
                                <p className="text-sm text-secondary-400 pl-2">
                                    09:30
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withPageProps(BookLesson);
