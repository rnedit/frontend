import axios from "axios";
import {proxy} from "./Conf"

const instance = axios.create({
    baseURL: proxy,
    headers:{'Content-Type': 'application/json; charset=UTF-8'},
    withCredentials: true,
})

export const securityApi = {
    async getaccessprofile (id) {
        try {
            return await instance.post('/api/users/getaccessprofile/'+id)
        } catch (error) {
            console.error(error)
        }
      
        }
        ,
        async testUser () {
            try {
                return await instance.get('/api/test/user')
            } catch (error) {
                console.error(error)
            }
          
            }
            ,
       async updateJwtToken (data) {
        try {
            return await instance.post('/api/auth/refreshjwt', data)
        } catch (error) {
            console.error(error)
        }
      
        }
        ,

    }