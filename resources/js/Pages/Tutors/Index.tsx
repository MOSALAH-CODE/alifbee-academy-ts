import { User } from "@/types";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useSelector } from "react-redux";
import { selectPageProps } from "@/features/pagePropsSlice";
import TutorCard from "./Cards/TutorCard";
import withPageProps from "../withPageProps";

const Tutors = () => {
    const pageProps = useSelector(selectPageProps);

    return (
        <Authenticated user={pageProps.auth.user}>
            <div className="grid gap-2 pb-4">
                <h1 className="text-3xl font-bold text-secondary-900">
                    Find the best Arabic tutors for you: (
                    {pageProps.tutors.length})
                </h1>

                <p className="text-base md:w-4/6 text-secondary-400">
                    Find the best Arabiac tutor for you: choose from our
                    experienced Arabic teachers online and get the best learning
                    experience.
                </p>
            </div>
            <div className="grid gap-5">
                {pageProps.tutors.map((tutor, index) => (
                    <TutorCard key={index} tutor={tutor} />
                ))}
            </div>
        </Authenticated>
    );
};

export default withPageProps(Tutors);
