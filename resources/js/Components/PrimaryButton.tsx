import { ButtonHTMLAttributes } from "react";

export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={
                `inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-secondary-dark tracking-widest hover:bg-secondary-dark hover:text-white focus:bg-tertiary active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
        >
            {children}
        </button>
    );
}
