import axios from "axios";
import { proxy } from "./Conf"

const instance = axios.create({
    baseURL: proxy,
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    withCredentials: true,
})

export const internalsApi = {
    async getInternals(data) {
        try {
            return await instance.post(proxy + '/api/internals/getInternals', data)
        } catch (error) {
            console.error(error)
        }
        
    }
    ,
}