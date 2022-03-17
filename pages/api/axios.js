import axios from "axios";
import Cookies from "js-cookie";

const baseurl = "https://snipshare-api-staging.herokuapp.com";

const APIRequest = axios.create({ baseURL: baseurl });

APIRequest.interceptors.request.use(({ headers, ...config }) => ({
  ...config,
  headers: {
    ...headers,
    "Content-Type": "application/json",
    Authorization: `${Cookies.get("token")}`, // tester avec guillemets
  },
}));

export default class APIManager {
  static async register(data) {
    const endpoint = "/users";
    const response = await APIRequest.post(endpoint, data);
    Cookies.set("token", response.headers.authorization);
    return response;
  }

  static async login(data) {
    const endpoint = "/users/sign_in";
    const response = await APIRequest.post(endpoint, data);
    Cookies.set("token", response.headers.authorization);
    return response;
  }

  static async logout() {
    const endpoint = "/users/sign_out";
    const response = await APIRequest.delete(endpoint);
    Cookies.remove("token");
    return response;
  }

  static async loginWithToken() {
    const endpoint = "/profiles";
    const response = await APIRequest.get(endpoint);
    return response;
  }

  static async updateProfile(id, data) {
    const endpoint = `/users/${id}`;
    const response = await APIRequest.patch(endpoint, data);
    return response;
  }

  static async createPost(data) {
    const endpoint = `/users/${id}`;
    const response = await APIRequest.patch(endpoint, data);
    return response;
  }
}
