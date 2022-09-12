import axiosClient from "./axiosClient";
const key = "AIzaSyBExIRi0i7yTE9MkhJYyGVDdKx_3qv0oDk"
const searchApi = {
    getAll(){
        const url = `/search?part=snippet&key=${key}`;
        return axiosClient.get(url);
    },
}

export default searchApi;