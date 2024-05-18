import axios from "axios"

export const Axios = {
    get: async (url:string) : Promise<any> => {
        return (await axios.get(url))["data"]
    },
    post: async (url:string, body?:object, token?:string) : Promise<any> => {
        return (await axios.post(url, body, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        }))["data"];
    },
    put: async (url:string, body?:object, token?:string) : Promise<any> => {
        return (await axios.put(url, body, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        }))["data"];
    },
    del: async (url:string, body?:object) : Promise<any> => {
        return (await axios.delete(url, body))["data"];
    },
}