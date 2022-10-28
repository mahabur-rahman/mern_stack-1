import { publicRequest } from "../requestMethod";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
} from "./productRedux";
import { loginStart, loginSuccess, loginFailure } from "./userRedux";

// login
export const login = async (dispatch, user) => {
  dispatch(loginStart());

  try {
    const res = await publicRequest.post("/auth/login", user);

    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

// ########### products ###########

// get all products
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());

  try {
    const res = await publicRequest.get("/products");

    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};
