import axiosClient from "./axiosClient";
const key = "AIzaSyBExIRi0i7yTE9MkhJYyGVDdKx_3qv0oDk"
const nationApi = {
    getNation(){
        const url = `/i18nRegions?part=snippet&hl=en_US&key=${key}`;
        return axiosClient.get(url);
    },
}

export default nationApi;