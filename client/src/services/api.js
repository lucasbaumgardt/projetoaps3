import axios from "axios";

const api = axios.create({
    baseURL: "http://10.3.163.109:3008"
})

export default api;