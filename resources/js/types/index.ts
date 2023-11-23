export class User {
    name: string;
    email: string;
    profile_picture: string;
    balance: number;

    constructor(
        name: string,
        email: string,
        profile_picture: string,
        balance: number
    ) {
        this.name = name;
        this.email = email;
        this.profile_picture = profile_picture;
        this.balance = balance;
    }
    static fromJson(json: any): User {
        return new User(
            json?.name,
            json?.email,
            json?.profile_picture,
            json?.balance
        );
    }
}

export class Tutor {
    id: number;
    name: string;
    email: string;
    profile_picture: string;

    constructor(
        id: number,
        name: string,
        email: string,
        profile_picture: string
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.profile_picture = profile_picture;
    }

    static fromJson(json: any): Tutor {
        return new Tutor(
            json?.id,
            json?.name,
            json?.email,
            json?.profile_picture
        );
    }
}

export class Lesson {
    id: number;
    user_id: number;
    tutor_id: number;
    credit_cost: number;
    start_date: Date;
    end_date: Date;
    status: string;
    meet_id: string;
    password: string;
    tutor: User;

    constructor(
        id: number,
        user_id: number,
        tutor_id: number,
        credit_cost: number,
        start_date: Date,
        end_date: Date,
        status: string,
        meet_id: string,
        password: string,
        tutor: User
    ) {
        this.id = id;
        this.user_id = user_id;
        this.tutor_id = tutor_id;
        this.credit_cost = credit_cost;
        this.start_date = start_date;
        this.end_date = end_date;
        this.status = status;
        this.meet_id = meet_id;
        this.password = password;
        this.tutor = tutor;
    }
    static fromJson(json: any): Lesson {
        return new Lesson(
            json?.id,
            json?.user_id,
            json?.tutor_id,
            json?.credit_cost,
            new Date(json?.start_date),
            new Date(json?.end_date),
            Lesson.calculateStatus(json),
            json?.meet_id,
            json?.password,
            User.fromJson(json?.tutor) || null // Convert tutor data to User
        );
    }
    private static calculateStatus(json: any): string {
        if (json?.status && json?.start_date) {
            const startDate = new Date(json.start_date);
            return startDate < new Date() ? "completed" : "upcoming";
        }
        return "canceled";
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
    countLessons: Statuses;
    completedEduTime: string;
    nextLesson: Lesson | null;
    tutors: Tutor[];
    tutor: Tutor;
};

// Create a factory function to convert JSON data to PageProps
export const createPageProps = (json: any): PageProps => {
    if (json.lessons && !Array.isArray(json.lessons)) {
        json.lessons = Object.values(json.lessons);
    }

    const nexLesson: Lesson | null = json.nextLesson
        ? Lesson.fromJson(json.nextLesson)
        : null;

    return {
        auth: {
            user: User.fromJson(json.auth.user),
        },
        countLessons: Statuses.fromJson(json.countLessons),
        completedEduTime: json.completedEduTime,
        nextLesson: nexLesson,
        tutors: (json.tutors || []).map((tutorJson: any) =>
            Tutor.fromJson(tutorJson)
        ),
        tutor: Tutor.fromJson(json.tutor),
    };
};
