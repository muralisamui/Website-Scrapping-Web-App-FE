import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getCompanyData = async (id: number | string | null) => {
    if (id === null) return ''
    try {
        const resp = await axios.get(`${BASE_URL}/company-details/${id}`);
        return resp.data;
    } catch (error: any) {
        throw new Error(`Error fetching company data: ${error.message}`);
    }
}