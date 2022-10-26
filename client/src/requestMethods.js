import axios from "axios";

const BASE_URL = "http://localhost:4000/api";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTUwYjQ1ZTg4YzE0N2MyOWE0YmExNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2Njc2MzQxMiwiZXhwIjoxNjY5MzU1NDEyfQ.2ZJqPdxGbMWoSAUeQsZfoupxrio9DbmH1H4xhVTMxdQ";

// just fetch data
export const publicMethods = axios.create({
  baseURL: BASE_URL,
});

// user request
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
