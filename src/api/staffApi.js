import axiosClient from "./axiosClient";
import { getItem } from "../common/storage";

export const getAllStaff = async (params) => {
    const url = "/user/staff";
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

export const getStaffById = async (id) => {
    const url = `/user/${id}`;
    const response = await axiosClient({
        medthod: "get",
        url: url,
        headers: {
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN")).token}`,
        },
    });
    return response;
};

export const updateAvatar = async (img, params) => {
    const url = `/image/user`;
    const response = await axiosClient.put(url, img, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN")).token}`,
        },
        params,
    });
    return response;
};

export const updateProfile = async (data) => {
    const url = "/user";
    const response = await axiosClient.put(url, data, {
        headers: {
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN")).token}`,
        },
    });
    return response;
};
