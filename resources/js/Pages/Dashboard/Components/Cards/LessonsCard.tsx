// LessonsCard.tsx
import React, { ReactNode } from "react";
import NoLessonsIcon from "@/Components/Icons/NoLessonsIcon";
import { Link } from "@inertiajs/react";
import { PrimaryButton } from "@/Components/Buttons";
import Card from "@/Components/Card";
import { Lesson } from "@/types";
import LessonsTable from "@/Pages/Dashboard/Components/LessonsTable";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";

interface LessonsCardProps {
    lessons?: Lesson[];
    header?: ReactNode;
    divider?: boolean;
}

const LessonsCard: React.FC<LessonsCardProps> = ({
    lessons,
    header,
    divider = true,
}) => {
    return (
        <Card header={header} divider={divider}>
            <div className="grid grid-cols-1 gap-4 justify-items-center">
                {lessons?.length ? (
                    <LessonsTable lessons={lessons} className="mt-3" />
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
                )}
            </div>
        </Card>
    );
};

export default LessonsCard;