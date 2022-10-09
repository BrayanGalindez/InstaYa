import { axiosConfig } from "../helpers/axios-config"; 

export async function signup(user){
        const response = await axiosConfig.post(`/user` , user);
        return response.data;
}

export async function login(data){
    const response = await axiosConfig.post(`/auth-user`, data);
    return response.data;
}