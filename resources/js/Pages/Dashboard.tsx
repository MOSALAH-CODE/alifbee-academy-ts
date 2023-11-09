import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, usePage } from "@inertiajs/react";
import { Lesson, PageProps, createPageProps } from "@/types";
import Card from "@/Components/Card";
import CreditIcon from "@/Components/Icons/CreditIcon";
import HexagonIcon from "@/Components/Icons/HexagonIcon";
import PrimaryButton from "@/Components/PrimaryButton";
import TabNavigation from "@/Components/Dashboard/TabNavigation";
import TurorsTable from "@/Components/Dashboard/TutorsTable";
import NoLessonsIcon from "@/Components/Icons/NoLessonsIcon";
import CalendarIcon from "@/Components/Icons/CalendarIcon";
import CopyIcon from "@/Components/Icons/CopyIcon";
import ComplatedIcon from "@/Components/Icons/ComplatedIcon";
import EduTimeIcon from "@/Components/Icons/EduTimeIcon";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPageProps, updatePageProps } from "@/features/pagePropsSlice";

export default function Dashboard({ auth }: PageProps) {
    const page = usePage<PageProps>();

    const dispatch = useDispatch();
    const pageProps = useSelector(selectPageProps);

    useEffect(() => {
        dispatch(updatePageProps(page.props));
    }, [page.props]);

    const [status, setStatus] = useState(pageProps.lessons_status.status);

    const [copiedZoomId, setCopiedZoomId] = useState(false);
    const [copiedPassword, setCopiedPassword] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setCopiedZoomId(false);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [copiedZoomId]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setCopiedPassword(false);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [copiedPassword]);

    const handleCopyToClipboard = (text: string, isZoomId: boolean) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();

        try {
            document.execCommand("copy");
            if (isZoomId) {
                setCopiedZoomId(true);
            } else {
                setCopiedPassword(true);
            }
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }

        document.body.removeChild(textArea);
    };

    return (
        <AuthenticatedLayout user={pageProps.auth.user}>
            <Head title="Dashboard" />

            <div
                className={`grid gap-6 ${
                    auth?.user?.lessons ? "grid-cols-12" : "grid-cols-1"
                } `}
            >
                {/* Left Section */}
                <div className="col-span-8 space-y-6 md:col-span-8">
                    {/* Balance Section */}
                    <Card>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-4">
                                <CreditIcon />
                                <div>
                                    <div className="flex items-center gap-4">
                                        <h2 className="text-xl font-semibold text-secondary-dark">
                                            Credit balance:
                                        </h2>
                                        <HexagonIcon>
                                            {pageProps.auth.user.balance}
                                        </HexagonIcon>
                                    </div>
                                    <p className="text-sm text-secondary-dark">
                                        *{pageProps.auth.user.balance} Credits
                                    </p>
                                </div>
                            </div>

                            <div>
                                <Link href={"/buy-credits"}>
                                    <PrimaryButton>
                                        <ControlPointRoundedIcon
                                            className={"mr-2"}
                                            fontSize={"small"}
                                        />
                                        Buy new credits
                                    </PrimaryButton>
                                </Link>
                            </div>
                        </div>
                    </Card>
                    {/* Lessons Section */}
                    {auth?.user?.lessons ? (
                        <Card>
                            <TabNavigation
                                lessons={pageProps.auth.user.lessons}
                                status={status}
                                setStatus={setStatus}
                            />
                            <TurorsTable
                                lessons={pageProps.lessons}
                                className="mt-6"
                            />
                        </Card>
                    ) : (
                        <Card
                            header={
                                <h3 className="font-semibold text-secondary-dark">
                                    My lessons:
                                </h3>
                            }
                        >
                            <div className="grid grid-cols-1 gap-4 justify-items-center">
                                <NoLessonsIcon />
                                <div className="grid grid-cols-1 justify-items-center">
                                    <h3 className="font-semibold text-secondary-dark">
                                        No lessons yet
                                    </h3>
                                    <p className="w-3/4 text-sm text-center text-gray-500">
                                        As soon as you find a suitable tutor and
                                        book your first lesson, you'll see it
                                        here
                                    </p>
                                </div>
                                <Link href={"/book-lesson"}>
                                    <PrimaryButton>
                                        <ControlPointRoundedIcon
                                            className={"mr-2"}
                                            fontSize={"small"}
                                        />
                                        Book a lesson
                                    </PrimaryButton>
                                </Link>
                            </div>
                        </Card>
                    )}
                </div>
                {/* Right Section */}
                <div className="col-span-8 space-y-6 md:col-span-4">
                    <Card
                        header={
                            <h2 className="text-xl font-semibold text-secondary-dark">
                                Next lesson:
                            </h2>
                        }
                        footer={
                            <div className="flex items-center gap-2">
                                <p className="text-xs text-secondary-400">
                                    14:09 (Europe - Kiev) Not your time zone?
                                </p>
                                <p className="text-sm font-semibold underline text-secondary-dark">
                                    Change
                                </p>
                            </div>
                        }
                    >
                        <div className="grid gap-3 pt-2 grid-col-1">
                            {/* Calendar */}
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    <CalendarIcon
                                        width="16"
                                        height="16"
                                        className="stroke-secondary-dark"
                                    />
                                    <p className="text-sm text-secondary-400">
                                        Date/Time:
                                    </p>
                                </div>
                                <p className="text-sm text-secondary-dark">
                                    07/10/2021 at 15:00 - 16:00
                                </p>
                            </div>
                            {/*  Zoom Id */}
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    <img
                                        src="/icons/zoom.png"
                                        width={16}
                                        alt=""
                                    />
                                    <p className="text-sm text-secondary-400">
                                        Meet ID:
                                    </p>
                                </div>
                                <p className="text-sm text-secondary-dark">
                                    meet.zoom.com/oup-dxjr
                                </p>
                                <button
                                    onClick={() => {
                                        handleCopyToClipboard(
                                            "meet.zoom.com/oup-dxjr",
                                            true
                                        );
                                    }}
                                    className={`${
                                        copiedZoomId ? "jelly-anim" : ""
                                    }`}
                                >
                                    <CopyIcon />
                                </button>
                            </div>

                            {/* Zoom Password */}
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    <img
                                        src="/icons/zoom.png"
                                        width={16}
                                        alt=""
                                    />
                                    <p className="text-sm text-secondary-400">
                                        Password:
                                    </p>
                                </div>
                                <p className="text-sm text-secondary-dark">
                                    123444
                                </p>
                                <button
                                    onClick={() => {
                                        handleCopyToClipboard("123444", false);
                                    }}
                                    className={`${
                                        copiedPassword ? "jelly-anim" : ""
                                    }`}
                                >
                                    <CopyIcon />
                                </button>
                            </div>
                        </div>
                    </Card>
                    <Card
                        header={
                            <h2 className="text-xl font-semibold text-secondary-dark">
                                Your statistics
                            </h2>
                        }
                    >
                        <div className="grid grid-cols-2 mt-3 divide-x">
                            <div className="grid gap-4">
                                <ComplatedIcon />
                                <div className="grid gap-1">
                                    <p className="text-xs text-secondary-400">
                                        Complated
                                    </p>
                                    <h3 className="text-lg font-bold text-secondary-dark">
                                        4 lesson
                                    </h3>
                                </div>
                            </div>
                            <div className="grid gap-4 pl-6">
                                <EduTimeIcon />
                                <div className="grid gap-1">
                                    <p className="text-xs text-secondary-400">
                                        Education time
                                    </p>
                                    <h3 className="text-lg font-bold text-secondary-dark">
                                        2h 30min
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
