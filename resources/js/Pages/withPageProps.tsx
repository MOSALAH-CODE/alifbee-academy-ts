import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPageProps, updatePageProps } from "../features/pagePropsSlice";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";

const withPageProps = <P extends object>(
    WrappedComponent: React.ComponentType<P>
) => {
    return (props: P) => {
        const page = usePage<PageProps>();

        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(updatePageProps(page.props));
        }, [page.props, dispatch]);

        return <WrappedComponent {...props} />;
    };
};

export default withPageProps;
