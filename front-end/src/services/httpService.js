import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.request.use(function (config) {
    const managerToken = localStorage.getItem('manager_token');
    if (managerToken){
        config.headers['x-manager-token'] = managerToken;
    }
    return config;
});

axios.interceptors.response.use(null, error => {
    toast.error(error.response.data);
    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch
};

