import axios from 'axios';

const recommendApi = {
    get(text) {
        const url = `http://suggestqueries.google.com/complete/search?client=youtube&ds=yt&client=firefox&q=${text}`;
        return axios.get(url);
    },
};

export default recommendApi;
