import {z} from "zod";

export const CreateUserSchema=z.object({
    username: z.string().min(2).max(15),
    password: z.string().min(4),
    name: z.string()
})

export const SigninSchema=z.object({
    username:z.string().min(2).max(15),
    password: z.string().min(4),    
})

export const CreateRoomSchema=z.object({
    name: z.string().min(3).max(25)
})

