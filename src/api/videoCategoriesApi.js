import axiosClient from './axiosClient';
const key = 'AIzaSyBExIRi0i7yTE9MkhJYyGVDdKx_3qv0oDk';

const videoCategoriesApi = {
    getVideoCategories() {
        const url = `/videoCategories?part=snippet&regionCode=VN&key=${key}`;
        return axiosClient.get(url);
    },
};

export default videoCategoriesApi;
