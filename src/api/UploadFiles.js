import axios from "axios";
import {proxy} from "./Conf"

const instance = axios.create({
    baseURL: proxy,
    headers:{'Content-Type': 'multipart/form-data'},
    withCredentials: true,
})

export const uploadFilesApi = {
    async upload (data) {
        const _selectedFiles = data.selectedFiles;
        const _infoFiles = data.infoFiles;
        let formData = new FormData();
    
        for (let i=0; i<_selectedFiles.length;i++) {
            formData.append("files", _selectedFiles[i]);
        }
        for (let i=0; i<_infoFiles.length;i++) {
            formData.append("infoFiles", JSON.stringify(_infoFiles[i]));
        }
        try {
            return await instance.post('/api/file/upload', formData)
        } catch (error) {
            console.error(error)
        }
      
        }
        ,

    }