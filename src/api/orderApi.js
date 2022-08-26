import axiosClient from "./axiosClient";
import { getItem } from "../common/storage";

export const getAllOrder = async () => {
    const url = "/order";
    const response = await axiosClient({
        method: "get",
        url: url,
        headers: {
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN")).token}`,
        },
    });
    return response;
};

export const changeStatusOrder = async (data) => {
    const url = "/order/staff/status";
    const response = await axiosClient.put(url, data, {
        headers: {
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN")).token}`,
        },
    });
    return response;
};

export const getOrderByUserId = async (id) => {
    const url = `/order/customer/${id}`;
    const response = await axiosClient({
        method: "get",
        url: url,
        headers: {
            Authorization: `Bearer ${JSON.parse(getItem("TOKEN")).token}`,
        },
    });
    return response;
};
