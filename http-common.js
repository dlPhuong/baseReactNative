import axios from "axios";

export default axios.create({
    baseURL: "https://tauhubb.xti.vn",
    headers: {
        "Content-type": "application/json"
    }
});
