import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8089/api/'
})


export default instance