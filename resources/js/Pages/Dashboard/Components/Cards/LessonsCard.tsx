import { ReactNode } from "react";
import NoLessonsIcon from "@/Components/Icons/NoLessonsIcon";
import { Link } from "@inertiajs/react";
import { PrimaryButton } from "@/Components/Buttons";
import Card from "@/Components/Card";
import { Lesson } from "@/types";
import LessonsTable from "@/Pages/Dashboard/Components/LessonsTable";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { useSelector } from "react-redux";
import { selectPageProps } from "@/features/pagePropsSlice";
import { hasAnyLessons } from "@/utils";

interface LessonsCardProps {
    lessons?: Lesson[];
    status: string;
    header?: ReactNode;
    divider?: boolean;
    loading?: boolean;
    showMoreLessons?: boolean;
    setShowMoreLessons?: (value: boolean) => void;
}

const LessonsCard = ({
    lessons,
    status,
    header,
    divider = true,
    loading = false,
    showMoreLessons,
    setShowMoreLessons,
}: LessonsCardProps) => {
    const pageProps = useSelector(selectPageProps);

    return (
        <Card divider={divider}>
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    width: "100%",
                    zIndex: 1,
                }}
                className="bg-white"
            >
                {header}
            </div>
            <div className="z-50 grid grid-cols-1 gap-4 justify-items-center">
                {hasAnyLessons(pageProps.countLessons) && setShowMoreLessons ? (
                    <LessonsTable
                        lessons={lessons ?? []}
                        status={status}
                        className="mt-3"
                        loading={loading}
                        showMoreLessons={showMoreLessons}
                        setShowMoreLessons={setShowMoreLessons}
                    />
                ) : (
                    <div className="grid grid-cols-1 gap-4 justify-items-center">
                        <NoLessonsIcon />
                        <div className="grid grid-cols-1 justify-items-center">
                            <h3 className="font-semibold text-secondary-dark">
                                No lessons yet
                            </h3>
                            <p className="w-3/4 text-sm text-center text-gray-500">
                                As soon as you find a suitable tutor and book
                                your first lesson, you'll see it here
                            </p>
                        </div>
                        <Link href={route("tutors")}>
                            <PrimaryButton>
                                <ControlPointRoundedIcon
                                    className={"mr-2"}
                                    fontSize={"small"}
                                />
                                Book a lesson
                            </PrimaryButton>
                        </Link>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default LessonsCard;
