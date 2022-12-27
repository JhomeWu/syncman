import dotenv from "dotenv";
dotenv.config();

export default function env(name: string, defaultVal: any = '') {
    return process.env?.[name] ?? defaultVal;
}