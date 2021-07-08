import axios from "axios";

export default function httpAuth(auth) {
   return axios.create({
        baseURL: "https://sandbox.xti.vn/",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer "+auth
        }
    });
} 