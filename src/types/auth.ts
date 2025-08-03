// --- LOGIN ---

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    expiresAt: string;
}

// --- REGISTER ---

export interface RegisterRequest {
    name: string;
    lastName: string;
    email: string;
    password: string;
}

// --- ERROR RESPONSE ---

export interface ErrorResponse {
    status: number;
    message: string;
}