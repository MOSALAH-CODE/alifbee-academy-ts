import { PropsWithChildren, ReactNode } from "react";

interface TabButtonProps {
    className?: string;
    active: boolean;
    children: ReactNode;
    onClick?: () => void;
}

export default function TabButton({
    className = "",
    active,
    children,
    onClick,
    ...props
}: PropsWithChildren<TabButtonProps>) {
    return (
        <button
            {...props}
            onClick={onClick}
            className={`inline-block py-3 border-b-2  rounded-t-lg transition ease-in-out duration-150  ${
                active
                    ? "active border-secondary-dark text-secondary-dark"
                    : " border-transparent hover:text-secondary-400 hover:border-secondary-400"
            }`}
        >
            {children}
        </button>
    );
}
