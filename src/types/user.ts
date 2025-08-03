export interface UserDto {
    id: number;
    name: string;
    lastName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateUserDto {
    name: string;
    lastName: string;
    email: string;
}

export interface ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}
