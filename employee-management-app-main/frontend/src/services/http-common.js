import axios from "axios";
import authHeader from "./auth-header";

export default axios.create({
  baseURL: "/api",
  headers: {
    "Content-type": "application/json",
    ...authHeader()
  }
});