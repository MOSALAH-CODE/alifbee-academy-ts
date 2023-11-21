import { PropsWithChildren, ReactNode, useEffect, useState } from "react";

const Card = ({
    children,
    header,
    footer,
    divider = true,
}: PropsWithChildren<{
    header?: ReactNode;
    footer?: ReactNode;
    divider?: boolean;
}>) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Use a timeout to delay setting `isMounted` to true
        const timeout = setTimeout(() => {
            setIsMounted(true);
        }, 500);

        // Clear timeout on component unmount or cleanup
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div
            className={`p-4 bg-white rounded-lg shadow-sm ${
                isMounted ? "card-mounted" : "card-unmounted"
            }`}
        >
            {header ? (
                <header>
                    <div
                        className={`grid grid-cols-1 ${
                            divider ? "divide-y" : ""
                        }`}
                    >
                        <div className="pb-2">{header}</div>
                        <div>{children}</div>
                        {footer && <div className="pt-3 mt-3">{footer}</div>}
                    </div>
                </header>
            ) : (
                children
            )}
        </div>
    );
};

export default Card;
