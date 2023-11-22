import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import withPageProps from "../withPageProps";
import { Head } from "@inertiajs/react";
import TabNavigation from "@/Pages/Dashboard/Components/TabNavigation";
import UseDashboardController from "./DashboardController";
import StatisticsCard from "./Components/Cards/StatisticsCard";
import NextLessonCard from "./Components/Cards/NextLessonCard";
import LessonsCard from "./Components/Cards/LessonsCard";
import CreditBalanceCard from "./Components/Cards/CreditBalanceCard";
import { hasAnyLessons } from "@/utils";

const Dashboard = () => {
    const {
        pageProps,
        status,
        setStatus,
        filteredLessons,
        loading,
        showMoreLessons,
        setShowMoreLessons,
    } = UseDashboardController();

    return (
        <AuthenticatedLayout
            user={pageProps.auth.user}
            // header={
            //     <div>
            //         <TabNavigation
            //             status={status}
            //             setStatus={setStatus}
            //             bookLessonButton={false}
            //             justifyBetween={false}
            //             className="w-fit"
            //             border={false}
            //             title="Lessons:"
            //         />
            //     </div>
            // }
        >
            <Head title="Dashboard" />

            <div
                className={`grid gap-6 ${
                    hasAnyLessons(pageProps.countLessons)
                        ? "grid-cols-12"
                        : "grid-cols-1"
                } `}
            >
                {/* Left Section */}
                <div className="col-span-12 space-y-6 lg:col-span-8">
                    {/* Balance Section */}
                    <CreditBalanceCard balance={pageProps.auth.user.balance} />

                    {/* Lessons Section */}
                    {hasAnyLessons(pageProps.countLessons) ? (
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
                            loading={loading}
                            showMoreLessons={showMoreLessons}
                            setShowMoreLessons={setShowMoreLessons}
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

                {hasAnyLessons(pageProps.countLessons) && (
                    <>
                        <div className="col-span-12 md:col-span-6 lg:hidden">
                            <NextLessonCard lesson={pageProps.nextLesson} />
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
                        <div
                            className="hidden w-full h-fit lg:space-y-6 lg:block lg:col-span-4"
                            style={{
                                position: "sticky",
                                top: 0,
                                width: "100%",
                                zIndex: 0,
                            }}
                        >
                            <NextLessonCard lesson={pageProps.nextLesson} />
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

            {/* <div className="h-96"></div> */}
        </AuthenticatedLayout>
    );
};

export default withPageProps(Dashboard);
