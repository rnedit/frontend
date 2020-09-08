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
            return await instance.post('/api/internals/getInternals', data)
        } catch (error) {
            console.error(error)
        }
        
    },

    async getInternal(data) {
        try {
            return await instance.post('/api/internals/getInternal', data)
        } catch (error) {
            console.error(error)
        }
        
    },
    async saveInternal(data) {
        try {
            return await instance.post('/api/internals/saveInternal', data)
        } catch (error) {
            console.error(error)
        }
        
    },
}