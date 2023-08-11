  import axios from "axios";
  
  export class Api {
    static instance;
    static client;
  
    constructor() {
      if (!Api.instance) {
        this.client = axios.create({
          baseURL: `http://localhost:8000`,
        });
        this.client.interceptors.request.use((config) => {
          (config.headers).set(
            "token",
            localStorage.getItem("token")
          );
          return config;
        });
        Api.instance = this;
      }
  
      return Api.instance;
    }
  
    get get() {
      return this.client.get;
    }
    get post() {
      return this.client.post;
    }
    get patch() {
      return this.client.patch;
    }
    get put() {
      return this.client.put;
    }
    get delete() {
      return this.client.delete;
    }
  
    setAuthorization() {
      const token = localStorage.getItem("token");
      if (token) {
        this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
      } else {
        this.removeAuthorization();
      }
    }
  
    removeAuthorization() {
      if (this.client.defaults.headers.common?.Authorization) {
        delete this.client.defaults.headers.common?.Authorization;
      }
    }
  }
  