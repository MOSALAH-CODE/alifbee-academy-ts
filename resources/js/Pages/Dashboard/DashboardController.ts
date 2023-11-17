import { selectPageProps } from "@/features/pagePropsSlice";
import { Lesson, User } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function UseDashboardController() {
    const pageProps = useSelector(selectPageProps);

    const [filteredLessons, setFilteredLessons] = useState<Lesson[]>([]);

    const [status, setStatus] = useState("");

    useEffect(() => {
        if (pageProps.countLessons.upcoming > 0) {
            setStatus("upcoming");
        } else if (pageProps.countLessons.completed > 0) {
            setStatus("completed");
        } else if (pageProps.countLessons.canceled > 0) {
            setStatus("canceled");
        }
    }, [pageProps.countLessons]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("/api/dashboard/lessons", {
                params: {
                    status: status,
                },
            })
            .then((response) => {
                const lessons: Lesson[] = response.data.lessons.map(
                    (lesson: any) => Lesson.fromJson(lesson)
                );
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
