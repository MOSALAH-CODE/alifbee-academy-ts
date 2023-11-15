import { selectPageProps } from "@/features/pagePropsSlice";
import { Lesson, User } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function UseDashboardController() {
    const pageProps = useSelector(selectPageProps);

    const [filteredLessons, setFilteredLessons] = useState<Lesson[]>([]);
    const [status, setStatus] = useState("upcoming");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // setLoading(true);
        axios
            .get("/api/dashboard/lessons", {
                params: {
                    status: status,
                },
            })
            .then((response) => {
                const lessons: Lesson[] = [];
                response.data.lessons.forEach((lesson: Lesson) => {
                    lessons.push(
                        new Lesson(
                            lesson?.id,
                            lesson?.user_id,
                            lesson?.tutor_id,
                            new Date(lesson?.start_date),
                            new Date(lesson?.end_date),
                            lesson?.status,
                            lesson?.meet_id,
                            lesson?.password,
                            lesson?.credit_cost,
                            User.fromJson(lesson?.tutor) || null
                        )
                    );
                });
                setFilteredLessons(lessons);
            })
            .catch((error) => {
                console.error("Error fetching lessons:", error);
            })
            .finally(() => setLoading(false));
    }, [status]);

    return {
        pageProps,
        status,
        setStatus,
        filteredLessons,
        loading,
    };
}

export default UseDashboardController;
