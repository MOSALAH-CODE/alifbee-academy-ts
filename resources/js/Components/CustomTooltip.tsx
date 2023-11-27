import { Tooltip } from "@material-tailwind/react";

type CustomTooltipProps = {
    children: React.ReactNode;
    content: React.ReactNode;
};

export function CustomTooltip({ children, content }: CustomTooltipProps) {
    return (
        <Tooltip
            placement="top"
            className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
            content={content}
        >
            {children}
        </Tooltip>
    );
}
