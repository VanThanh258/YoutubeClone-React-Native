import axiosClient from "./axiosClient";
const key = "AIzaSyCQryOlAYFiQsFN3jxMqFxDJQVYMSzM9zU"
const nationApi = {
    getNation(){
        const url = `/i18nRegions?part=snippet&hl=en_US&key=${key}`;
        return axiosClient.get(url);
    },
}

export default nationApi;