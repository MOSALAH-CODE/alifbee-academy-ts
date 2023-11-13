import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import withPageProps from "../withPageProps";
import { Head } from "@inertiajs/react";
import TabNavigation from "@/Pages/Dashboard/Components/TabNavigation";
import UseDashboardController from "./DashboardController";
import StatisticsCard from "./Components/Cards/StatisticsCard";
import NextLessonCard from "./Components/Cards/NextLessonCard";
import LessonsCard from "./Components/Cards/LessonsCard";
import CreditBalanceCard from "./Components/Cards/CreditBalanceCard";

const Dashboard = () => {
    const {
        pageProps,
        status,
        handleCopyToClipboard,
        copiedZoomId,
        copiedPassword,
    } = UseDashboardController();

    return (
        <AuthenticatedLayout user={pageProps.auth.user}>
            <Head title="Dashboard" />

            <div
                className={`grid gap-6 ${
                    pageProps.auth?.user?.lessons
                        ? "grid-cols-12"
                        : "grid-cols-1"
                } `}
            >
                {/* Left Section */}
                <div className="col-span-12 space-y-6 lg:col-span-8">
                    {/* Balance Section */}
                    <CreditBalanceCard />

                    {/* Lessons Section */}
                    {pageProps.auth?.user?.lessons ? (
                        <LessonsCard
                            header={<TabNavigation status={status} />}
                            lessons={pageProps.lessons}
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
                        lesson={pageProps.lessons[0]}
                        copiedZoomId={copiedZoomId}
                        copiedPassword={copiedPassword}
                        handleCopyToClipboard={handleCopyToClipboard}
                    />
                </div>
                <div className="col-span-12 md:col-span-6 lg:hidden">
                    <StatisticsCard
                        completedLessons={pageProps.countLessons.completed}
                        educationTime={pageProps.completedEduTime}
                    />
                </div>

                {/* Right Section */}
                <div className="hidden lg:space-y-6 lg:block lg:col-span-4">
                    <NextLessonCard
                        lesson={pageProps.lessons[0]}
                        copiedZoomId={copiedZoomId}
                        copiedPassword={copiedPassword}
                        handleCopyToClipboard={handleCopyToClipboard}
                    />
                    <StatisticsCard
                        completedLessons={pageProps.countLessons.completed}
                        educationTime={pageProps.completedEduTime}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default withPageProps(Dashboard);
