import axios from "axios";
const API_URL = "http://localhost:4000/auth/";
class AuthService {
  login(email, password) {
    return axios
      .post(API_URL, {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("token", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("token");
  }

  register(email, password) {
    return axios.post(API_URL, {
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("token"));
  }
}

export default new AuthService();
