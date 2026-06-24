import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_REGISTER = "/api/auth/register";

type Userdata = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export async function register({
    name,
    email,
    password,
    password_confirmation,
}: Userdata) {
    const response = await axiosInstance.post(URL_REGISTER, {
        name,
        email,
        password,
        password_confirmation,
    });
    return response.data;
}