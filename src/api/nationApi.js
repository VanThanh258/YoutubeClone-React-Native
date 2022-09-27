import axiosClient from "./axiosClient";
const key = "AIzaSyAjJPWqSvuu7F-sDjy8kxjdWnvL2KXTGUo"
const nationApi = {
    getNation(){
        const url = `/i18nRegions?part=snippet&hl=en_US&key=${key}`;
        return axiosClient.get(url);
    },
}

export default nationApi;