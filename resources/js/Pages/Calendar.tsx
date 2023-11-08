import { PageProps } from "@/types";
import Authenticated from "@/Layouts/AuthenticatedLayout";

export default function Calendar({ auth }: PageProps) {
    return (
        <Authenticated user={auth.user}>
            <h1>Calendar, Welcome {auth.user.name}</h1>
        </Authenticated>
    );
}
