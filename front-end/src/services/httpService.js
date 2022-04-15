import axios from "axios";
import { toast } from "react-toastify";

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

