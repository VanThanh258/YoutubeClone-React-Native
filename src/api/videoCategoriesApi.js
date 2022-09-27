import axiosClient from "./axiosClient";
const key = "AIzaSyAjJPWqSvuu7F-sDjy8kxjdWnvL2KXTGUo"

const videoCategoriesApi = {
    getVideoCategories(){
        const url = `/videoCategories?part=snippet&regionCode=VN&key=${key}`;
        return axiosClient.get(url)
    }
}

export default videoCategoriesApi;