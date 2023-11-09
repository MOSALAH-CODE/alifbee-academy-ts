import { Link } from "@inertiajs/react";
import { PropsWithChildren, ReactNode } from "react";

interface TabLinkProps {
    className?: string;
    disabled?: boolean;
    active: boolean;
    children: ReactNode;
    href: string;
    onClick?: () => void;
}

export default function TabLink({
    className = "",
    disabled,
    active,
    children,
    href,
    onClick,
    ...props
}: PropsWithChildren<TabLinkProps>) {
    return (
        <Link
            href={href}
            preserveScroll
            {...props}
            onClick={onClick}
            className={`inline-block py-4 border-b-2  rounded-t-lg ${
                active
                    ? "active border-secondary-dark text-secondary-dark"
                    : " border-transparent hover:text-secondary-400 hover:border-secondary-400"
            }`}
        >
            {children}
        </Link>
    );
}
