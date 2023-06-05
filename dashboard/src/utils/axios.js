import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://kecommerce.onrender.com";

export default axios;
