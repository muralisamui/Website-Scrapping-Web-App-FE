import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const scrapeCompanyData = async (url: string) => {
    try {
        const resp = await axios.get(`${BASE_URL}/company-details/scrape?url=${url}`);
        return resp.data;
    } catch (error: any) {
        console.error(error)
        throw new Error(`Couldn't fetch company data: the URL may not be correct ! Please try with a valid URL.`);
    }
}

export const getCompanyTableData = async (page: number, limit: number) => {
    try {
        const resp = await axios.get(`${BASE_URL}/company-details?page=${page}&limit=${limit}`);
        return resp.data;
    } catch (error: any) {
        throw new Error(`Error fetching company data: ${error.message}`);
    }
}

export const deleteCompany = async (id: number) => {
    try {
        await axios.delete(`${BASE_URL}/company-details/${id}`);
    } catch (error: any) {
        throw new Error(`Error deleting company data: ${error.message}`);
    }
};