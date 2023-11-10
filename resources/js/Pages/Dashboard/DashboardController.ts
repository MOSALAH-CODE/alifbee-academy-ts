import { selectPageProps } from "@/features/pagePropsSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function UseDashboardController() {
    const pageProps = useSelector(selectPageProps);

    const [status, setStatus] = useState("");

    useEffect(() => {
        setStatus(pageProps.lessons_status.status);
    }, [pageProps]);

    const [copiedZoomId, setCopiedZoomId] = useState(false);
    const [copiedPassword, setCopiedPassword] = useState(false);

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
        handleCopyToClipboard,
        copiedZoomId,
        copiedPassword,
    };
}

export default UseDashboardController;
