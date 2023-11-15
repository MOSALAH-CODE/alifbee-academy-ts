import React, { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import CopyIcon from "./Icons/CopyIcon"; // Replace 'path_to_your_copy_icon' with the actual path

interface CopyToClipboardButtonProps {
    text: string | undefined;
    onCopy?: () => void;
}

const CopyToClipboardButton = ({
    text,
    onCopy,
}: CopyToClipboardButtonProps) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setCopied(false);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [copied]);

    const copyToClipboard = (text: string | undefined) => {
        if (text) {
            navigator.clipboard.writeText(text).then(() => {
                setCopied(true);
                if (onCopy) {
                    onCopy();
                }
            });
        }
    };

    return (
        <Tooltip
            open={copied}
            title="Copied"
            TransitionComponent={Zoom}
            placement="top"
            arrow
            PopperProps={{
                modifiers: [
                    {
                        name: "offset",
                        options: {
                            offset: [0, -5],
                        },
                    },
                ],
            }}
        >
            <button
                onClick={() => copyToClipboard(text)}
                className={`${copied ? "jelly-anim" : ""}`}
            >
                <CopyIcon />
            </button>
        </Tooltip>
    );
};

export default CopyToClipboardButton;
