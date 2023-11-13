// StatisticsCard.tsx
import React, { useEffect } from "react";
import ComplatedIcon from "@/Components/Icons/ComplatedIcon";
import EduTimeIcon from "@/Components/Icons/EduTimeIcon";
import Card from "@/Components/Card";

interface StatisticsCardProps {
    completedLessons: number;
    educationTime: string;
}

const StatisticsCard = ({
    completedLessons,
    educationTime,
}: StatisticsCardProps) => {
    return (
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
                        <p className="text-xs text-secondary-400">Complated</p>
                        <h3 className="text-lg font-bold text-secondary-dark">
                            {completedLessons} lesson
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
                            {educationTime}
                        </h3>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default StatisticsCard;
