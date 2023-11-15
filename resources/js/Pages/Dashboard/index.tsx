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
        setStatus,
        filteredLessons,
        loading,
        handleCopyToClipboard,
        copiedZoomId,
        copiedPassword,
    } = UseDashboardController();

    return (
        <AuthenticatedLayout user={pageProps.auth.user} loading={loading}>
            <Head title="Dashboard" />

            <div
                className={`grid gap-6 ${
                    filteredLessons.length > 0 ? "grid-cols-12" : "grid-cols-1"
                } `}
            >
                {/* Left Section */}
                <div className="col-span-12 space-y-6 lg:col-span-8">
                    {/* Balance Section */}
                    <CreditBalanceCard balance={pageProps.auth.user.balance} />

                    {/* Lessons Section */}
                    {filteredLessons.length > 0 ? (
                        <LessonsCard
                            header={
                                <TabNavigation
                                    status={status}
                                    setStatus={setStatus}
                                />
                            }
                            lessons={filteredLessons}
                            status={status}
                            divider={false}
                            copiedZoomId={copiedZoomId}
                            copiedPassword={copiedPassword}
                            handleCopyToClipboard={handleCopyToClipboard}
                        />
                    ) : (
                        <LessonsCard
                            status={status}
                            header={
                                <h3 className="font-semibold text-secondary-dark">
                                    My lessons:
                                </h3>
                            }
                        />
                    )}
                </div>

                {filteredLessons.length > 0 && (
                    <>
                        <div className="col-span-12 md:col-span-6 lg:hidden">
                            <NextLessonCard
                                lesson={pageProps.nextLesson}
                                copiedZoomId={copiedZoomId}
                                copiedPassword={copiedPassword}
                                handleCopyToClipboard={handleCopyToClipboard}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6 lg:hidden">
                            <StatisticsCard
                                completedLessons={
                                    pageProps.countLessons.completed
                                }
                                educationTime={pageProps.completedEduTime}
                            />
                        </div>

                        {/* Right Section */}
                        <div className="hidden lg:space-y-6 lg:block lg:col-span-4">
                            <NextLessonCard
                                lesson={pageProps.nextLesson}
                                copiedZoomId={copiedZoomId}
                                copiedPassword={copiedPassword}
                                handleCopyToClipboard={handleCopyToClipboard}
                            />
                            <StatisticsCard
                                completedLessons={
                                    pageProps.countLessons.completed
                                }
                                educationTime={pageProps.completedEduTime}
                            />
                        </div>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default withPageProps(Dashboard);
