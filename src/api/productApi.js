import axiosClient from "./axiosClient";
import { getItem } from "../common/storage/local";

export const getAllProduct = async (params) => {
    const url = "/product";
    const response = await axiosClient({
        medthod: "get",
        url: url,
        headers: {
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN")).token}`,
        },
        params: params,
    });
    return response;
};

export const changeStatusProduct = async (data) => {
    const url = "/product/active";
    const response = await axiosClient.put(url, data, {
        headers: {
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN")).token}`,
        },
    });
    return response;
};
