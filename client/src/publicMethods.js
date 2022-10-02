import axios from "axios";

const BASE_URL = "http://localhost:4000/api/";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzQ0MWQ3MzAyMjBlMjFlY2E1YTgyMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NDY4OTMyNiwiZXhwIjoxNjY3MjgxMzI2fQ.ME7vQgavnL9PBYCZ_xuN8f3Wn8_Y5u0y_G7045qB9g0";

// public request | fetch data only
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// user request
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
