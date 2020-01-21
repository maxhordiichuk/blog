import axios from "axios";

const instance = axios.create();

export default function apiClient() {
  instance.defaults.headers.common["X-CSRF-Token"] =
    document.querySelector("meta[name='csrf-token']").getAttribute("content");
  return instance;
}
