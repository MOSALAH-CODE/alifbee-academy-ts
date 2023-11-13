// useUserInitializer.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/userSlice";
import { selectPageProps } from "@/features/pagePropsSlice";

const useUserInitializer = () => {
    const dispatch = useDispatch();
    const pageProps = useSelector(selectPageProps);
    useEffect(() => {
        dispatch(updateUser(pageProps.auth.user));
    }, [dispatch]);
};

export default useUserInitializer;
