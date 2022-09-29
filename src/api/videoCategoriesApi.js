import axiosClient from "./axiosClient";
const key = "AIzaSyCQryOlAYFiQsFN3jxMqFxDJQVYMSzM9zU"

const videoCategoriesApi = {
    getVideoCategories(){
        const url = `/videoCategories?part=snippet&regionCode=VN&key=${key}`;
        return axiosClient.get(url)
    }
}

export default videoCategoriesApi;