import withPageProps from "@/Pages/withPageProps";
import HexagonIcon from "@/Components/Icons/HexagonIcon";
import { formatDate, formatLessonTime, getDayOfDate } from "@/utils";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { selectPageProps } from "@/features/pagePropsSlice";
import { useSelector } from "react-redux";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link } from "@inertiajs/react";
import { PrimaryButton } from "@/Components/Buttons";

const Store = () => {
    const pageProps = useSelector(selectPageProps);

    const lesson = pageProps.lesson;

    const error = pageProps.error;

    console.log(error);

    return (
        <div className="bg-white">
            <div className="fixed top-5 right-5">
                <Link
                    href={route("tutors")}
                    className="w-10 h-10 rounded-full bg-white shadow-xl border border-gray-50 cursor-pointer flex items-center justify-center text-secondary-dark"
                >
                    <CloseRoundedIcon />
                </Link>
            </div>
            <div className="grid gap-8 max-w-6xl p-12 px-4 mx-auto md:px-6 lg:px-8">
                <div className="grid gap-4 justify-items-center justify-center items-center">
                    <HexagonIcon
                        width={60}
                        height={60}
                        fill={`${error ? "#E5383D" : "#479F55"}`}
                    >
                        <DoneRoundedIcon />
                    </HexagonIcon>
                    <h2 className="text-2xl text-center font-bold text-secondary-dark">
                        {error ? error : "You booked a lesson succesfully!"}
                    </h2>
                </div>

                {error ? (
                    <></>
                ) : (
                    <div className="flex justify-center">
                        <div className="w-2/5 bg-body rounded grid divide-y px-8 py-4">
                            <h3 className="text-xl text-secondary-dark font-bold pb-3">
                                Booking confirmation
                            </h3>
                            <div className="">
                                <table className="min-w-full divide-y divide-gray-200 text-secondary-dark">
                                    <tbody className=" divide-y divide-gray-200">
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
