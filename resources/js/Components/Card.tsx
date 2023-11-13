import { PropsWithChildren, ReactNode } from "react";

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
    return (
        <div className="p-4 bg-white rounded-lg shadow-sm">
            {header ? (
                <header>
                    <div
                        className={`grid grid-cols-1 ${divider && "divide-y"}`}
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
