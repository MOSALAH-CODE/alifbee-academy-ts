import { PageProps } from "@/types";
import Authenticated from "@/Layouts/AuthenticatedLayout";

export default function Tutors({ auth }: PageProps) {
    return (
        <Authenticated user={auth.user}>
            <h1>Tutors, Welcome {auth.user.name}</h1>
        </Authenticated>
    );
}
