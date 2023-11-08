import { Link, InertiaLinkProps } from "@inertiajs/react";

export default function NavLink({
    active = false,
    stroke = false,
    className = "",
    children,
    ...props
}: InertiaLinkProps & { active: boolean; stroke?: boolean }) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? "text-primary" +
                      (stroke ? " stroke-primary" : " fill-primary")
                    : "text-white" +
                      (stroke ? " stroke-white" : " fill-white")) +
                className
            }
        >
            <div className={"flex gap-2 items-center"}>{children}</div>
        </Link>
    );
}
