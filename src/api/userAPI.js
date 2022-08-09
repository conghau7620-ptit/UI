import axiosClient from "./axiosClient";
import { getItem } from "../common/storage/local";

export const getUser = async (id, token) => {
    const url = `/user/${id}`;
    const response = await axiosClient({
        method: "get",
        url: url,
        headers: {
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN")).token}`,
        },
    });
    return response;
};

export const getAllUser = async () => {
    const url = "/user/customer?page=1";
    const response = await axiosClient({
        medthod: "get",
        url: url,
        headers: {
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN")).token}`,
        },
    });
    return response;
};

export const updateUser = async (data) => {
    const url = `/user`;
    const response = await axiosClient.put(url, data, {
        headers: {
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN")).token}`,
        },
    });
    return response;
};

export const createUser = async (data) => {
    const url = "/user";
    const response = await axiosClient.post(url, data, {
        headers: {
            Accept: "multipart/form-data",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN")).token}`,
        },
    });
    return response;
};
