import axios from "axios";
import { proxy } from "./Conf"

const instance = axios.create({
    baseURL: proxy,
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    withCredentials: true,
})

export const profilesApi = {

    async getProfilesByParentIdNotNull() {
        try {
            return await instance.post('/api/profiles/parentidnotnull')
        } catch (error) {
            console.error(error)
        }
        
    }
    ,
 
}