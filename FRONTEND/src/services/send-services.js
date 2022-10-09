import { axiosConfig } from "../helpers/axios-config";

export async function getAllSends(configuration){
    const response = await axiosConfig.get('/send/dev', configuration,
    {   withCredentials:true    }
    );
    return response.data;

}

export async function getSendById(id, config){
    const response = await axiosConfig.get(`/send/edit/${id}`, config,
        {withCredentials:true}
    )
    return response.data
}

export async function createSend(data, config){
    const response = await axiosConfig.post('/send/create', data, config,
    { withCredentials: true });
    return response
}

export async function updateSend(id, data, config){
    const response = await axiosConfig.put(`/send/update/${id}`, data, config,
    {withCredentials:true});
    return response
}
