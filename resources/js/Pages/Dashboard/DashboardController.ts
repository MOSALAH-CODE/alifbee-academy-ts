import { selectPageProps } from "@/features/pagePropsSlice";
import { Lesson } from "@/types";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function UseDashboardController() {
    const page = usePage();
    const pageProps = useSelector(selectPageProps);

    const [filteredLessons, setFilteredLessons] = useState<Lesson[]>([]);
    const [status, setStatus] = useState("upcoming");
    const [loading, setLoading] = useState(true);

    const [copiedZoomId, setCopiedZoomId] = useState(false);
    const [copiedPassword, setCopiedPassword] = useState(false);

    useEffect(() => {
        // setLoading(true);
        axios
            .get("/api/dashboard/lessons", {
                params: {
                    status: status,
                },
            })
            .then((response) => {
                setFilteredLessons(response.data.lessons);
            })
            .catch((error) => {
                console.error("Error fetching lessons:", error);
            })
            .finally(() => setLoading(false));
    }, [status]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setCopiedZoomId(false);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [copiedZoomId]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setCopiedPassword(false);
        }, 1000);

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

    return {
        pageProps,
        status,
        setStatus,
        filteredLessons,
        loading,
        handleCopyToClipboard,
        copiedZoomId,
        copiedPassword,
    };
}

export default UseDashboardController;
