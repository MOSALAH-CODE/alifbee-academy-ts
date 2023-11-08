import { PropsWithChildren } from "react";

const HexagonIcon = ({ children }: PropsWithChildren) => {
    return (
        <div>
            <svg
                width="32"
                height="34"
                viewBox="0 0 32 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M21.112 1.38429C17.9487 -0.461428 14.0513 -0.46143 10.888 1.38429L5.17446 4.71805C2.01117 6.56377 0.0625009 9.9748 0.0625006 13.6662L0.0625 20.3338C0.0624997 24.0252 2.01117 27.4362 5.17445 29.2819L10.888 32.6157C14.0513 34.4614 17.9487 34.4614 21.112 32.6157L26.8255 29.2819C29.9888 27.4362 31.9375 24.0252 31.9375 20.3338V13.6662C31.9375 9.9748 29.9888 6.56377 26.8255 4.71806L21.112 1.38429Z"
                    fill="#422A47"
                />
                <foreignObject width="32" height="34">
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <h3 className={"text-white"} style={{ margin: 0 }}>
                            {children}
                        </h3>
                    </div>
                </foreignObject>
            </svg>
        </div>
    );
};

export default HexagonIcon;
