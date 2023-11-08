export class User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    profile_picture: string;
    balance: number;
    lessons: Lesson[];

    constructor(
        id: number,
        name: string,
        email: string,
        email_verified_at: string,
        profile_picture: string,
        balance: number,
        lessons: Lesson[]
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.email_verified_at = email_verified_at;
        this.profile_picture = profile_picture;
        this.balance = balance;
        this.lessons = lessons;
    }
    static fromJson(json: any): User {
        return new User(
            json?.id,
            json?.name,
            json?.email,
            json?.email_verified_at,
            json?.profile_picture,
            json?.balance,
            json?.lessons?.map((lessonJson: any) =>
                Lesson.fromJson(lessonJson)
            ) || [] // Map lessons
        );
    }
}

export class Lesson {
    frontend_id: number;
    user_id: number;
    tutor_id: number;
    start_date: string;
    end_date: string;
    status: string;
    meet_id: string;
    password: string;
    credit_cost: number;
    tutor: User;

    constructor(
        frontend_id: number,
        user_id: number,
        tutor_id: number,
        start_date: string,
        end_date: string,
        status: string,
        meet_id: string,
        password: string,
        credit_cost: number,
        tutor: User
    ) {
        this.frontend_id = frontend_id;
        this.user_id = user_id;
        this.tutor_id = tutor_id;
        this.start_date = start_date;
        this.end_date = end_date;
        this.status = status;
        this.meet_id = meet_id;
        this.password = password;
        this.credit_cost = credit_cost;
        this.tutor = tutor;
    }
    static fromJson(json: any): Lesson {
        return new Lesson(
            json?.id,
            json?.user_id,
            json?.tutor_id,
            json?.start_date,
            json?.end_date,
            json?.status,
            json?.meet_id,
            json?.password,
            json?.credit_cost,
            User.fromJson(json?.tutor) || null // Convert tutor data to User
        );
    }
}

export type PageProps = {
    auth: {
        user: User;
    };
    lessons: Lesson[];
    lessons_status: {
        status: string;
    };
};

// Create a factory function to convert JSON data to PageProps
export const createPageProps = (json: any): PageProps => {
    return {
        auth: {
            user: User.fromJson(json.auth.user),
        },
        lessons: (json.lessons || []).map((lessonJson: any) =>
            Lesson.fromJson(lessonJson)
        ),
        lessons_status: { status: json.lessons_status?.status || "" },
    };
};

// Usage in your component
// const pageProps: PageProps = createPageProps(jsonData);

// You can also add a factory function for PageProps to convert the JSON data
// export const PagePropsFactory = (json: any): PageProps => ({
//     auth: { user: User.fromJson(json.auth.user) },
//     lessons: (json.lessons || []).map((lessonJson: any) =>
//         Lesson.fromJson(lessonJson)
//     ),
//     lessons_status: { status: json.lessons_status?.status || "" },
// });

// export interface User {
//     id: number;
//     name: string;
//     email: string;
//     email_verified_at: string;
//     profile_picture: string;
//     balance: number;
//     lessons: Lesson[];
// }
// export interface Lesson {
//     id: number;
//     user_id: number;
//     tutor_id: number;
//     start_date: string;
//     end_date: string;
//     status: string;
//     meet_id: string;
//     password: string;
//     credit_cost: number;
//     tutor: User;
// }
// export type PageProps<
//     T extends Record<string, unknown> = Record<string, unknown>
// > = T & {
//     auth: {
//         user: User;
//     };
//     lessons: Lesson[];
//     lessons_status: {
//         status: string;
//     };
// };
