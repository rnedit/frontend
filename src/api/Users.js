import axios from "axios";
import {proxy} from "./Conf"

const instance = axios.create({
    baseURL: proxy,
    headers:{'Content-Type': 'application/json; charset=UTF-8'},
    withCredentials: true,
})

export const usersApi = {
    async parentidnotnull () {
        try {
            return await instance.post(proxy+'/api/users/parentidnotnull')
        } catch (error) {
            console.error(error)
        }
      
        }

        ,

    async parentidisnull () {
        try {
            return await instance.post(proxy+'/api/users/parentidisnull')
        } catch (error) {
            console.error(error)
        }
          
            }

        ,
        
    async sethomeorgunit (data) {
        try {
            return await instance.post(proxy+'/api/orgunits/sethomeorgunit', data)
        } catch (error) {
            console.error(error)
        }
      
        }

    }