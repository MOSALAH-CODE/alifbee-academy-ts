// DurationOption.tsx
import React from "react";

type DurationOptionProps = {
    value: number;
    label: string;
    selected: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const DurationOption = ({
    value,
    label,
    selected,
    onChange,
}: DurationOptionProps) => {
    return (
        <div
            className={`w-1/3 flex items-center px-4 border border-gray-200 rounded hover:border-primary ${
                selected && "border-primary"
            }`}
        >
            <input
                id={`bordered-radio-${value}`}
                type="radio"
                value={value}
                name="bordered-radio"
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-0"
                checked={selected}
                onChange={onChange}
            />
            <label
                htmlFor={`bordered-radio-${value}`}
                className="w-full py-4 ms-2 text-sm font-medium text-gray-900"
            >
                {label}
            </label>
        </div>
    );
};

export default DurationOption;
