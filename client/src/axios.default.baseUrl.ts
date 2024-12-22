// api.ts
import axios from 'axios';

const VUE_API_URL = axios.create({
    baseURL: import.meta.env.VUE_APP_API_URL || 'http://localhost:5300',
});

export default VUE_API_URL;
