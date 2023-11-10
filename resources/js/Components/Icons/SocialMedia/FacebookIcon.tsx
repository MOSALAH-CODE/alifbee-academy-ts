import { SVGAttributes } from "react";

export default function FacebookIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            className="fill-[#C9C2CB] hover:fill-primary-700 cursor-pointer transition duration-150 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M16.0001 2.66669C8.63608 2.66669 2.66675 8.63602 2.66675 16C2.66675 22.6547 7.54275 28.1707 13.9174 29.172V19.8534H10.5307V16H13.9174V13.0627C13.9174 9.72135 15.9067 7.87602 18.9534 7.87602C20.4121 7.87602 21.9374 8.13602 21.9374 8.13602V11.416H20.2574C18.6001 11.416 18.0841 12.444 18.0841 13.4987V16H21.7814L21.1907 19.8534H18.0841V29.172C24.4574 28.172 29.3334 22.6534 29.3334 16C29.3334 8.63602 23.3641 2.66669 16.0001 2.66669Z" />
        </svg>
    );
}
