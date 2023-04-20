export type UsersType = {
    id: string
    email: string
    password: string
}

export const users: Array<UsersType> = JSON.parse(localStorage.getItem('users') || '[]')