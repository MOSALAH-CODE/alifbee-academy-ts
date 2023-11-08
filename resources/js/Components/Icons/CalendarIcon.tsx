import { SVGAttributes } from "react";

export default function CalendarIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            width="24"
            height="25"
            {...props}
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.75 2.5C8.33579 2.5 8 2.83579 8 3.25V5.5H9.5V3.25C9.5 2.83579 9.16421 2.5 8.75 2.5ZM16.25 2.5C15.8358 2.5 15.5 2.83579 15.5 3.25V5.5H17V3.25C17 2.83579 16.6642 2.5 16.25 2.5Z"
            />
            <path d="M3 10.5L21 10.5" strokeWidth="1.6" />
            <path
                d="M3 17.5V9.5C3 7.29086 4.79086 5.5 7 5.5H17C19.2091 5.5 21 7.29086 21 9.5V17.5C21 19.7091 19.2091 21.5 17 21.5H7C4.79086 21.5 3 19.7091 3 17.5Z"
                strokeWidth="1.6"
            />
            <rect x="6" y="12.5" width="3" height="3" rx="1" />
        </svg>
    );
}
