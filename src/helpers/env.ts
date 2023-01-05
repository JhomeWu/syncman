import dotenv from 'dotenv';

dotenv.config();

export default function env(name: string, defaultVal: string = '') {
  return process.env?.[name] ?? defaultVal;
}
