import { Link, InertiaLinkProps } from "@inertiajs/react";

export default function NavLink({
    className = "",
    children,
    ...props
}: InertiaLinkProps) {
    return (
        <Link
            {...props}
            className={
                "transition duration-150 ease-in-out hover:text-primary-500" +
                className
            }
        >
            {children}
        </Link>
    );
}
