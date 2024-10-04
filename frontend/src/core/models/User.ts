import { IUser } from "../types";

enum AuthProvider {
    EMAIL = "email",
    YANDEX = "yandex",
}

export class User {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	isConfirmed: boolean;
	authProvider: string;
	avatarUrl: string;

    createdAt: Date;
    updatedAt: Date;

    constructor(user: IUser) {
        this.id = user.id;
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.isConfirmed = user.isConfirmed;
        this.authProvider = user.authProvider;
        this.avatarUrl = user.avatarUrl;
        this.createdAt = new Date(user.createdAt);
        this.updatedAt = new Date(user.updatedAt);
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    get hasFullName() {
        return this.firstName && this.lastName;
    }

    get isPasswordSet() {
        return this.authProvider === AuthProvider.EMAIL;
    }
}
