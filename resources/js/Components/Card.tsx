import { PropsWithChildren, ReactNode } from "react";

const Card = ({
    children,
    header,
    footer,
}: PropsWithChildren<{ header?: ReactNode; footer?: ReactNode }>) => {
    return (
        <div className="p-4 bg-white shadow-sm sm:rounded-lg">
            {header ? (
                <header className="">
                    <div className="grid grid-cols-1 divide-y">
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
