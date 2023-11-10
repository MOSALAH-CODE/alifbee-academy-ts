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
                      (stroke
                          ? " stroke-primary hover:stroke-primary-300"
                          : " fill-primary hover:fill-primary-300")
                    : "text-white" +
                      (stroke
                          ? " stroke-white hover:stroke-gray-300"
                          : " fill-white hover:fill-gray-300")) +
                className
            }
        >
            <div
                className={`flex gap-2 items-center font-semibold text-sm tracking-wider transition duration-150 ease-in-out ${
                    active ? " hover:text-primary-300" : " hover:text-gray-300"
                }`}
            >
                {children}
            </div>
        </Link>
    );
}
