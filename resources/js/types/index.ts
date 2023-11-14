export class User {
    name: string;
    email: string;
    email_verified_at: string;
    profile_picture: string;
    balance: number;

    constructor(
        name: string,
        email: string,
        email_verified_at: string,
        profile_picture: string,
        balance: number
    ) {
        this.name = name;
        this.email = email;
        this.email_verified_at = email_verified_at;
        this.profile_picture = profile_picture;
        this.balance = balance;
    }
    static fromJson(json: any): User {
        return new User(
            json?.name,
            json?.email,
            json?.email_verified_at,
            json?.profile_picture,
            json?.balance
        );
    }
}

export class Lesson {
    id: number;
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
        id: number,
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
        this.id = id;
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

export class Statuses {
    upcoming: number;
    completed: number;
    canceled: number;

    constructor(upcoming: number, complated: number, canceled: number) {
        this.upcoming = upcoming;
        this.completed = complated;
        this.canceled = canceled;
    }
    static fromJson(json: any): Statuses {
        return new Statuses(json?.upcoming, json?.completed, json?.canceled);
    }
}

export type PageProps = {
    auth: {
        user: User;
    };
    // lessons: Lesson[];
    countLessons: Statuses;
    completedEduTime: string;
    // lessons_status: {
    //     status: string;
    // };
    nextLesson: Lesson;
};

// Create a factory function to convert JSON data to PageProps
export const createPageProps = (json: any): PageProps => {
    if (json.lessons && !Array.isArray(json.lessons)) {
        json.lessons = Object.values(json.lessons);
    }

    const lessons = (json.lessons || []).map((lessonJson: any) =>
        Lesson.fromJson(lessonJson)
    );

    return {
        auth: {
            user: User.fromJson(json.auth.user),
        },
        countLessons: Statuses.fromJson(json.countLessons),
        completedEduTime: json.completedEduTime,
        nextLesson: json.nextLesson,
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
