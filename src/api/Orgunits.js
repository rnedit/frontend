import axios from "axios";
import { proxy } from "./Conf"

const instance = axios.create({
    baseURL: proxy,
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    withCredentials: true,
})

export const orgunitsApi = {

    async sethomeorgunit(data) {
        try {
            return await instance.post(proxy + '/api/orgunits/sethomeorgunit', data)
        } catch (error) {
            console.error(error)
        }
        
    }
    ,
    async getorgunitsbyparentidisnullandidisnot(id) {
        try {
            return await instance.post(proxy + '/api/orgunits/getorgunitsbyparentidisnullandidisnot/' + id)
        } catch (error) {
            console.error(error)
        }
      
    }
    ,
    async getprofilesandprofilesparentidisnull(id) {
        try {
            return await instance.post(proxy + '/api/orgunits/getprofilesandprofilesparentidisnull/' + id)
        } catch (error) {
            console.error(error)
        }
      
    }
    ,
    async getprofiles(id) {
        try {
            return await instance.post(proxy + '/api/orgunits/getprofiles/' + id)
        } catch (error) {
            console.error(error)
        }
       
    }
    ,
    async setorgunits(id,data) {
        try {
            return await instance.post(proxy + '/api/orgunits/setorgunits/' + id, data)
        } catch (error) {
            console.error(error)
        }
       
    }
    ,
    async getorgunits(id) {
        try {
            return await instance.post(proxy + '/api/orgunits/getorgunits/' + id)
        } catch (error) {
            console.error(error)
        }
       
    }
}