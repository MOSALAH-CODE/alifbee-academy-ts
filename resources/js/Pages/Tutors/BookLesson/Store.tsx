import withPageProps from "@/Pages/withPageProps";
import HexagonIcon from "@/Components/Icons/HexagonIcon";
import { formatDate, formatLessonTime, getDayOfDate } from "@/utils";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { selectPageProps } from "@/features/pagePropsSlice";
import { useSelector } from "react-redux";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link } from "@inertiajs/react";
import { PrimaryButton } from "@/Components/Buttons";
import { selectBookLesson } from "@/features/bookLessonSlice";

const Store = () => {
    const pageProps = useSelector(selectPageProps);

    const lesson = useSelector(selectBookLesson);

    const error = pageProps.error;

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
            <div className="grid max-w-6xl gap-8 p-12 px-4 mx-auto md:px-6 lg:px-8">
                <div className="grid items-center justify-center gap-4 justify-items-center">
                    <HexagonIcon
                        width={60}
                        height={60}
                        fill={`${error ? "#E5383D" : "#479F55"}`}
                    >
                        <DoneRoundedIcon />
                    </HexagonIcon>
                    <h2 className="text-2xl font-bold text-center text-secondary-dark">
                        {error ? error : "You booked a lesson succesfully!"}
                    </h2>
                </div>

                {error ? (
                    <></>
                ) : (
                    <div className="flex justify-center">
                        <div className="grid w-2/5 px-8 py-4 divide-y rounded bg-body">
                            <h3 className="pb-3 text-xl font-bold text-secondary-dark">
                                Booking confirmation
                            </h3>
                            <div className="">
                                <table className="min-w-full divide-y divide-gray-200 text-secondary-dark">
                                    <tbody className="divide-y divide-gray-200 ">
                                        <tr>
                                            <td className="h-16">
                                                <div className="flex gap-2">
                                                    <HexagonIcon
                                                        width={24}
                                                        height={24}
                                                        fill="#C9C2CB"
                                                    >
                                                        <DoneRoundedIcon />
                                                    </HexagonIcon>
                                                    <p className="text-secondary-400">
                                                        Date/Time
                                                    </p>
                                                </div>
                                            </td>
                                            <td>
                                                {lesson?.start_date && (
                                                    <p>
                                                        {formatLessonTime(
                                                            lesson?.start_date,
                                                            lesson?.end_date
                                                        )}
                                                        {", "}
                                                        {getDayOfDate(
                                                            lesson?.start_date
                                                        )}
                                                        {", "}
                                                        <br />
                                                        {formatDate(
                                                            lesson?.start_date
                                                        )}
                                                    </p>
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="h-16">
                                                <div className="flex gap-2">
                                                    <HexagonIcon
                                                        width={24}
                                                        height={24}
                                                        fill="#C9C2CB"
                                                    >
                                                        <DoneRoundedIcon />
                                                    </HexagonIcon>
                                                    <p className="text-secondary-400">
                                                        Lesson objective
                                                    </p>
                                                </div>
                                            </td>
                                            <td>Reading</td>
                                        </tr>
                                        <tr>
                                            <td className="h-16">
                                                <div className="flex gap-2">
                                                    <HexagonIcon
                                                        width={24}
                                                        height={24}
                                                        fill="#C9C2CB"
                                                    >
                                                        <DoneRoundedIcon />
                                                    </HexagonIcon>
                                                    <p className="text-secondary-400">
                                                        Tutor
                                                    </p>
                                                </div>
                                            </td>
                                            <td>{lesson?.tutor?.name}</td>
                                        </tr>
                                        <tr>
                                            <td className="h-16">
                                                <div className="flex gap-2">
                                                    <HexagonIcon
                                                        width={24}
                                                        height={24}
                                                        fill="#C9C2CB"
                                                    >
                                                        <DoneRoundedIcon />
                                                    </HexagonIcon>
                                                    <p className="text-secondary-400">
                                                        Price
                                                    </p>
                                                </div>
                                            </td>
                                            <td>
                                                <p>
                                                    {lesson?.credit_cost}{" "}
                                                    {lesson?.credit_cost === 1
                                                        ? "credit"
                                                        : "credits"}
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-center">
                    <Link href={route("dashboard")}>
                        <PrimaryButton>Done</PrimaryButton>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default withPageProps(Store);
