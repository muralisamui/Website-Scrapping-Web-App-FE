import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getCompanyData = async () => {
    const resp = await axios.get(`${BASE_URL}/company-details?page=1&limit=10`);
    return resp.data;
}