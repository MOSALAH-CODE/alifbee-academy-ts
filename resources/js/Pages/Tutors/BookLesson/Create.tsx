import withPageProps from "@/Pages/withPageProps";
import HexagonIcon from "@/Components/Icons/HexagonIcon";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link, useForm } from "@inertiajs/react";
import Card from "@/Components/Card";
import Dropdown from "@/Components/Dropdown";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { ChangeEvent, useEffect, useState } from "react";
import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";
import { useDispatch, useSelector } from "react-redux";
import { selectPageProps } from "@/features/pagePropsSlice";
import { formatDate, formatLessonTime } from "@/utils";
import { OutlineButton, PrimaryButton } from "@/Components/Buttons";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import {
    resetBookLesson,
    selectBookLesson,
    updateBookLesson,
} from "@/features/bookLessonSlice";

const Create = () => {
    const pageProps = useSelector(selectPageProps);

    const lesson = useSelector(selectBookLesson);
    const dispatch = useDispatch();

    const [message, setMessage] = useState("");
    const maxLength = 100;

    const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const inputText = event.target.value;
        if (inputText.length <= maxLength) {
            setMessage(inputText);
        }
    };

    const [showDetails, setShowDetails] = useState(true);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const { data, setData, post, processing, errors } = useForm({
        lesson: lesson,
    });

    useEffect(() => {
        if (lesson) {
            if (typeof lesson?.start_date === "string") {
                const updatedStartDate = new Date(lesson?.start_date);
                const updatedEndDate = new Date(lesson?.end_date);
                dispatch(
                    updateBookLesson({
                        ...lesson,
                        start_date: updatedStartDate,
                        end_date: updatedEndDate,
                    })
                );
            }
            setData("lesson", lesson);
        }
    }, [lesson]);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("bookLesson.details.store"));
    };

    return (
        <div className="flex flex-col min-h-screen ">
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
                    <div className="flex justify-between">
                        <div className="flex gap-8">
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
                                <p className="text-secondary-900">
                                    Date / time
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <HexagonIcon fill="primary">
                                    <p className="text-secondary-900">03</p>
                                </HexagonIcon>
                                <p className="text-secondary-900">
                                    Lesson objective
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="my-8">
                        <h1 className="pb-1 text-2xl font-bold text-secondary-dark">
                            Lesson Details
                        </h1>
                        <p className="text-base text-secondary-400">
                            Tell us more, so we can deliver the best experience
                            for you.
                        </p>
                    </div>
                    <div className="md:mt-4">
                        <div className="grid grid-cols-12 gap-6">
                            {/* Left Section */}
                            <div className="col-span-12 space-y-6 md:col-span-8">
                                <Card className="custom-shadow">
                                    <div className="flex justify-between gap-4">
                                        <div className="flex-1 ">
                                            <p className="mb-2 text-xs text-secondary-400">
                                                Lesson objective
                                            </p>
                                            <div className="relative">
                                                <Dropdown>
                                                    <Dropdown.Trigger>
                                                        <div className="flex justify-between w-full px-4 py-2 border rounded-md cursor-pointer border-body text-secondary-dark">
                                                            <p>Choose option</p>
                                                            <KeyboardArrowDownRoundedIcon />
                                                        </div>
                                                    </Dropdown.Trigger>
                                                    <Dropdown.Content
                                                        widthFull={true}
                                                        align="left"
                                                    >
                                                        <Dropdown.Button
                                                            onClick={() => {}}
                                                        >
                                                            <div className="flex items-center gap-2 text-secondary-dark">
                                                                <p className="whitespace-nowrap">
                                                                    Reading
                                                                </p>
                                                            </div>
                                                        </Dropdown.Button>
                                                    </Dropdown.Content>
                                                </Dropdown>
                                            </div>
                                        </div>

                                        <div className="relative flex-1">
                                            <p className="mb-2 text-xs text-secondary-400">
                                                Language level (Optional)
                                            </p>
                                            <div className="relative">
                                                <Dropdown>
                                                    <Dropdown.Trigger>
                                                        <div className="flex justify-between w-full px-4 py-2 border rounded-md cursor-pointer border-body text-secondary-dark">
                                                            <p>B2</p>
                                                            <KeyboardArrowDownRoundedIcon />
                                                        </div>
                                                    </Dropdown.Trigger>
                                                    <Dropdown.Content
                                                        widthFull={true}
                                                        align="left"
                                                    >
                                                        <Dropdown.Button
                                                            onClick={() => {}}
                                                        >
                                                            <div className="flex items-center gap-2 text-secondary-dark">
                                                                <p className="whitespace-nowrap">
                                                                    Reading
                                                                </p>
                                                            </div>
                                                        </Dropdown.Button>
                                                    </Dropdown.Content>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <p className="mb-2 text-xs text-secondary-400">
                                            Any other details you'd like to add?
                                            (Optional)
                                        </p>
                                        <textarea
                                            id="message"
                                            rows={4}
                                            value={message}
                                            onChange={handleMessageChange}
                                            maxLength={maxLength}
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-primary-400 focus:border-primary-400"
                                        ></textarea>
                                        <p className="mt-2 text-xs text-end text-secondary-400">
                                            {message.length}/{maxLength}
                                        </p>
                                    </div>
                                </Card>
                            </div>
                            {/* Right Section */}
                            <div
                                className="w-full col-span-12 h-fit md:space-y-6 md:block md:col-span-4"
                                style={{
                                    position: "sticky",
                                    top: 0,
                                    width: "100%",
                                    zIndex: 0,
                                }}
                            >
                                <Card
                                    className="transition duration-500 ease-in-out custom-shadow"
                                    header={
                                        <h3 className="text-xl font-semibold text-secondary-dark">
                                            Order Summary
                                        </h3>
                                    }
                                    footer={
                                        <div className="grid gap-2">
                                            <div className="flex items-center justify-between">
                                                <p className="text-secondary-400">
                                                    Current Balance
                                                </p>
                                                <p className="font-bold text-secondary-dark">
                                                    {
                                                        pageProps.auth.user
                                                            .balance
                                                    }{" "}
                                                    {pageProps.auth.user
                                                        .balance === 1
                                                        ? "credit"
                                                        : "credits"}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-xl font-bold text-secondary-dark">
                                                    Total Price
                                                </h3>
                                                <h3 className="text-xl font-bold text-secondary-dark">
                                                    {lesson?.credit_cost}{" "}
                                                    {"Credits"}
                                                </h3>
                                            </div>
                                        </div>
                                    }
                                >
                                    <div className="mt-2 text-secondary-dark">
                                        <div
                                            onClick={toggleDetails}
                                            className="flex items-center justify-between cursor-pointer"
                                        >
                                            <h4 className="text-base font-semibold">
                                                Lesson Details
                                            </h4>
                                            {showDetails ? (
                                                <KeyboardArrowUpRoundedIcon />
                                            ) : (
                                                <KeyboardArrowDownRounded />
                                            )}
                                        </div>
                                        <div
                                            className="transition-opacity duration-500"
                                            style={{
                                                opacity: showDetails ? 1 : 0,
                                            }}
                                        >
                                            <div
                                                className={`grid gap-2 mt-2 ${
                                                    showDetails
                                                        ? "block"
                                                        : "hidden"
                                                }`}
                                            >
                                                <div className="flex justify-between">
                                                    <p className="text-secondary-400">
                                                        Tutor
                                                    </p>
                                                    <p className="text-secondary-700">
                                                        {lesson?.tutor.name}
                                                    </p>
                                                </div>
                                                <div className="flex justify-between">
                                                    <p className="text-secondary-400">
                                                        Date/Time
                                                    </p>
                                                    <div>
                                                        <p className="text-secondary-700">
                                                            {lesson?.start_date &&
                                                                formatDate(
                                                                    lesson?.start_date,
                                                                    {
                                                                        weekday:
                                                                            "short",
                                                                        month: "short",
                                                                        day: "2-digit",
                                                                        year: "numeric",
                                                                    }
                                                                )}
                                                        </p>
                                                        <p className="text-secondary-700 text-end">
                                                            {lesson?.start_date &&
                                                                formatLessonTime(
                                                                    lesson?.start_date,
                                                                    lesson?.end_date
                                                                )}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between">
                                                    <p className="text-secondary-400">
                                                        Lesson objective
                                                    </p>
                                                    <p className="text-secondary-700">
                                                        -
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* This div will push the footer to the bottom */}
            <div className="flex-grow"></div>

            {/* Footer */}
            <div className="p-2 px-6 custom-shadow">
                <div className="flex justify-end gap-4">
                    <OutlineButton>Back</OutlineButton>
                    <form onSubmit={submit}>
                        <PrimaryButton type="submit" className="flex">
                            <p>Confirm Booking</p>
                            <ChevronRightRoundedIcon
                                style={{ fontSize: "18px" }}
                            />
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default withPageProps(Create);
