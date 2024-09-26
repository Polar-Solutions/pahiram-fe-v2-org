import {
  getApcisTokenFromAuthCookie,
  getPahiramTokenFromAuthCookie,
} from "@/core/data-access/cookies";
import axios from "axios";

const regularHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

// Pahiram
const PahiramAxiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PAH_BACKEND,
  // timeout: 5000,
  headers: regularHeaders,
});

PahiramAxiosConfig.interceptors.request.use(
  async (config) => {
    const bearerToken = await getPahiramTokenFromAuthCookie();
    if (bearerToken) {
      config.headers.Authorization = `Bearer ${bearerToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// APCIS Configuration
const ApcisAxiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APCIS_URL,
  // timeout: 5000,
  headers: regularHeaders,
});

ApcisAxiosConfig.interceptors.request.use(
  async (config) => {
    const bearerToken = await getApcisTokenFromAuthCookie();
    if (bearerToken) {
      config.headers.Authorization = `Bearer ${bearerToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { PahiramAxiosConfig, ApcisAxiosConfig };
