import axios from "axios";

const BASE_URL = "http://localhost:4000/api/";
// const TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTUwYjQ1ZTg4YzE0N2MyOWE0YmExNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2Njg2Nzg3MywiZXhwIjoxNjY5NDU5ODczfQ.hNQ7EEK3TVIRSwnYpFMOYpr9CUNiJlslBBTwEuD57II";

const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
  .currentUser.accessToken;

//   fetch data
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
