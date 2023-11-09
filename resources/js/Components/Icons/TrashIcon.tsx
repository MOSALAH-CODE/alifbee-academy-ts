import { SVGAttributes } from "react";

export default function TrashIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M2 3.3335H14"
                stroke="#4C3451"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6 3.33333V2H10V3.33333"
                stroke="#4C3451"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
            />
            <path
                d="M9.33268 8V11.3333M6.66602 8V11.3333V8Z"
                stroke="#4C3451"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.33398 5.3335H12.6673L12.0007 14.0002H4.00065L3.33398 5.3335Z"
                stroke="#4C3451"
                strokeWidth="1.5"
            />
        </svg>
    );
}
