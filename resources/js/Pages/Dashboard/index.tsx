import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TabNavigation from "@/Pages/Dashboard/Components/TabNavigation";
import UseDashboardController from "./DashboardController";
import StatisticsCard from "./Components/Cards/StatisticsCard";
import NextLessonCard from "./Components/Cards/NextLessonCard";
import LessonsCard from "./Components/Cards/LessonsCard";
import CreditBalanceCard from "./Components/Cards/CreditBalanceCard";
import { Lesson, Statuses, User } from "@/types";

interface HomeProps {
    auth: {
        user: User;
    };
    lessons: Lesson[];
    countLessons: Statuses;
    completedEduTime: string;
    lessons_status: {
        status: string;
    };
}

const Dashboard = ({
    auth,
    completedEduTime,
    countLessons,
    lessons,
    lessons_status,
}: HomeProps) => {
    const { status, handleCopyToClipboard, copiedZoomId, copiedPassword } =
        UseDashboardController();

    console.log(auth);
    console.log(completedEduTime);
    console.log(countLessons);
    console.log(lessons);
    console.log(lessons_status);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div
                className={`grid gap-6 ${
                    auth?.user?.lessons ? "grid-cols-12" : "grid-cols-1"
                } `}
            >
                {/* Left Section */}
                <div className="col-span-12 space-y-6 lg:col-span-8">
                    {/* Balance Section */}
                    <CreditBalanceCard balance={auth.user.balance} />

                    {/* Lessons Section */}
                    {auth?.user?.lessons ? (
                        <LessonsCard
                            header={
                                <TabNavigation
                                    countLessons={countLessons}
                                    status={status}
                                />
                            }
                            lessons={lessons}
                            divider={false}
                        />
                    ) : (
                        <LessonsCard
                            header={
                                <h3 className="font-semibold text-secondary-dark">
                                    My lessons:
                                </h3>
                            }
                        />
                    )}
                </div>

                <div className="col-span-12 md:col-span-6 lg:hidden">
                    <NextLessonCard
                        lesson={lessons[1]}
                        copiedZoomId={copiedZoomId}
                        copiedPassword={copiedPassword}
                        handleCopyToClipboard={handleCopyToClipboard}
                    />
                </div>
                <div className="col-span-12 md:col-span-6 lg:hidden">
                    <StatisticsCard
                        completedLessons={countLessons.completed}
                        educationTime={completedEduTime}
                    />
                </div>

                {/* Right Section */}
                <div className="hidden lg:space-y-6 lg:block lg:col-span-4">
                    <NextLessonCard
                        lesson={lessons[1]}
                        copiedZoomId={copiedZoomId}
                        copiedPassword={copiedPassword}
                        handleCopyToClipboard={handleCopyToClipboard}
                    />
                    <StatisticsCard
                        completedLessons={countLessons.completed}
                        educationTime={completedEduTime}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
