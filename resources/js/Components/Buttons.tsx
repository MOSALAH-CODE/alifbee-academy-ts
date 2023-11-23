import React, { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
};

export const PrimaryButton: React.FC<ButtonProps> = ({
    className = "",
    disabled,
    children,
    ...props
}) => {
    return (
        <button
            {...props}
            disabled={disabled}
            className={`items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-secondary-dark tracking-widest hover:bg-primary-400 focus:bg-tertiary active:bg-primary-400 focus:outline-none transition ease-in-out duration-150 ${
                disabled && "opacity-25"
            } ${className}`}
        >
            {children}
        </button>
    );
};

export const OutlineButton: React.FC<ButtonProps> = ({
    className = "",
    disabled,
    children,
    ...props
}) => {
    return (
        <button
            {...props}
            disabled={disabled}
            className={` items-center px-4 py-2 border-2 border-primary-700 rounded-md font-semibold text-xs text-secondary-dark tracking-wider hover:bg-primary hover:border-primary focus:outline-none active:bg-primary focus:border-tertiary transition ease-in-out duration-150 ${
                disabled && "opacity-25"
            } ${className}`}
        >
            {children}
        </button>
    );
};

export const DangerButton: React.FC<ButtonProps> = ({
    className = "",
    disabled,
    children,
    ...props
}) => {
    return (
        <button
            {...props}
            disabled={disabled}
            className={`inline-flex items-center px-4 py-2 bg-red-500 border border-transparent rounded-md font-semibold text-xs text-white hover:bg-red-600 focus:bg-red-600 active:bg-red-700 focus:outline-none transition ease-in-out duration-150 ${
                disabled && "opacity-25"
            } ${className}`}
        >
            {children}
        </button>
    );
};

// Add more button components as needed
