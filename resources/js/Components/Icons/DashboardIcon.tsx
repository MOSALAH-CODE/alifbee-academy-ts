import { SVGAttributes } from "react";

const DashboardIcon = (props: SVGAttributes<SVGElement>) => {
    return (
        <svg
            {...props}
            width="18"
            height="19"
            viewBox="0 0 18 19"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 10.5H0V0.5H8V10.5ZM8 18.5H0V12.5H8V18.5ZM10 18.5H18V8.5H10V18.5ZM10 6.5V0.5H18V6.5H10Z"
            />
        </svg>
    );
};

export default DashboardIcon;
