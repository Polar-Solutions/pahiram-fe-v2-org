export interface AuthCookie {
    user: UserFromCookie,
    isAuthenticated: boolean
}

export interface LoginInput {
    email: string;
    password: string;
    remember: boolean | undefined;
}

export interface LoginApiResponse {
    "status": boolean,
    "data": {
        "user": {
            "apc_id": string,
            "first_name": string,
            "last_name": string,
            "email": string,
            "course": string,
            "department_code": string | null,
            "role": string,
            "acc_status": string,
            "is_admin": boolean
        },
        "pahiram_token": string,
        "apcis_token": string
    },
    "method": string
}

export interface LoginOutput {
    success: boolean;
    data?: LoginApiResponse["data"];
    message: string;
    errors?: { [key: string]: string };
}

export interface UserFromCookie {
    apc_id: string;
    first_name: string;
    last_name: string;
    email: string;
    department_code: string | null;
    role: string;
    acc_status: string;
    is_admin: boolean;
}
