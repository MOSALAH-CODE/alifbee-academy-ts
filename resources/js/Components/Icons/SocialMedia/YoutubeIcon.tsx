import { SVGAttributes } from "react";

export default function YoutubeIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-[#C9C2CB] hover:fill-primary-700 cursor-pointer transition duration-150 ease-in-out"
        >
            <g clipPath="url(#clip0_104_182)">
                <path d="M28.7241 8.66401C29.3334 11.04 29.3334 16 29.3334 16C29.3334 16 29.3334 20.96 28.7241 23.336C28.3854 24.6493 27.3947 25.6827 26.1401 26.032C23.8614 26.6667 16.0001 26.6667 16.0001 26.6667C16.0001 26.6667 8.14275 26.6667 5.86008 26.032C4.60008 25.6773 3.61075 24.6453 3.27608 23.336C2.66675 20.96 2.66675 16 2.66675 16C2.66675 16 2.66675 11.04 3.27608 8.66401C3.61475 7.35068 4.60541 6.31734 5.86008 5.96801C8.14275 5.33334 16.0001 5.33334 16.0001 5.33334C16.0001 5.33334 23.8614 5.33334 26.1401 5.96801C27.4001 6.32268 28.3894 7.35468 28.7241 8.66401ZM13.3334 20.6667L21.3334 16L13.3334 11.3333V20.6667Z" />
            </g>
            <defs>
                <clipPath id="clip0_104_182">
                    <rect width="32" height="32" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}
