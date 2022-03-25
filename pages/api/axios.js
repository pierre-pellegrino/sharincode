import axios from "axios";
import Cookies from "js-cookie";

const baseurl = "https://snipshare-api-staging.herokuapp.com";
// const baseurl = 'https://snipshare-api.herokuapp.com'
// const baseurl = "https://staging-xs3.herokuapp.com";

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

  static async getMyProfile() {
    const endpoint = "/profile";
    const response = await APIRequest.get(endpoint);
    return response;
  }

  static async getProfile(id) {
    const endpoint = `/profiles/${id}`;
    const response = await APIRequest.get(endpoint);
    return response;
  }

  static async updateProfile(data) {
    const endpoint = "/profile";
    const response = await APIRequest.patch(endpoint, data);
    return response;
  }

  static async updatePwd(data) {
    const endpoint = "/users";
    const response = await APIRequest.patch(endpoint, data);
    return response;
  }

  static async updateEmail(data) {
    const endpoint = "/users";
    const response = await APIRequest.patch(endpoint, data);
    return response;
  }

  static async deleteUser() {
    const endpoint = "/profile";
    const response = await APIRequest.delete(endpoint);
    return response;
  }

  static async getPosts(page = 1) {
    const endpoint = `/posts?page=${page}`;
    const response = await APIRequest.get(endpoint);
    return response;
  }

  static async getPost(id) {
    const endpoint = `/posts/${id}`;
    const response = await APIRequest.get(endpoint);
    return response;
  }

  static async createPost(data) {
    const endpoint = "/posts";
    const response = await APIRequest.post(endpoint, data);
    return response;
  }

  static async editPost(id, data) {
    const endpoint = `/posts/${id}`;
    const response = await APIRequest.put(endpoint, data);
    return response;
  }

  static async deletePost(id) {
    const endpoint = `/posts/${id}`;
    const response = await APIRequest.delete(endpoint);
    return response;
  }

  static async createComment(postId, data) {
    const endpoint = `/posts/${postId}/comments`;
    const response = await APIRequest.post(endpoint, data);
    return response;
  }

  static async editComment(postId, commentId, data) {
    const endpoint = `/posts/${postId}/comments/${commentId}`;
    const response = await APIRequest.put(endpoint, data);
    return response;
  }

  static async deleteComment(postId, commentId) {
    const endpoint = `/posts/${postId}/comments/${commentId}`;
    const response = await APIRequest.delete(endpoint);
    return response;
  }
  static async search(query) {
    const endpoint = "/searches";
    const formattedQuery = query.replace(" ", "_");
    const response = await APIRequest.get(endpoint, {
      params: {
        keywords: formattedQuery,
      },
    });

    return response;
  }

  static async deleteReaction(postId) {
    const endpoint = `/posts/${postId}/post_reactions`;
    const response = await APIRequest.delete(endpoint);
    return response;
  }

  static async addReaction(postId, data) {
    const endpoint = `/posts/${postId}/post_reactions`;
    const response = await APIRequest.post(endpoint, data);
    return response;
  }

  static async logFromGithub(code) {
    const endpoint = "/auth";
    const response = await APIRequest.get(endpoint, {
      params: {
        code,
      },
    });
    Cookies.set("token", response.headers.authorization);
    return response;
  }

  static async forgottenPassword(data) {
    const endpoint = "/users/password"
    const response = await APIRequest.post(endpoint, data);
    return response;
  }

  static async addFavorite(postId) {
    const endpoint = "/favorite_posts";
    const response = await APIRequest.post(endpoint, {
      post_id: postId,
    });
    return response;
  }

  static async removeFavorite(postId) {
    const endpoint = `/favorite_posts/${postId}`
    const response = await APIRequest.delete(endpoint);
    return response;
  }

  static async fetcher(url) {
    const response = await APIRequest.get(url);
    return response.data;
  }
}
