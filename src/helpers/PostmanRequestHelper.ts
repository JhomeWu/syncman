import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import env from "./env";

export default class PostmanRequestHelper {
    public static baseAxios(): AxiosInstance {
        return axios.create({
            baseURL: env("API_HOST", "https://api.getpostman.com"),
            headers: { "x-api-key": env('API_KEY') }
        });
    }

    public static async get(path: string, options?: AxiosRequestConfig) {
        const instance = this.baseAxios();
        const response = await instance.get(path, options);
        return response.data;
    }
}