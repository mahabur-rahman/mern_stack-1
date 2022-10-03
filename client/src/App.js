import "./global.css";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import SingleProduct from "./pages/SingleProduct";
import Register from "./pages/Register";
import Pay from "./pages/Pay";
import SuccessPayment from "./pages/SuccessPayment";
import Error from "./pages/Error";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/login">
            {user ? <Redirect to="/" /> : <Login />}
          </Route>

          <Route exact path="/register">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>

          <Route exact path="/products/:category">
            <ProductList />
          </Route>

          <Route exact path="/product/:productId">
            <SingleProduct />
          </Route>

          <Route exact path="/cart">
            <Cart />
          </Route>

          <Route exact path="/pay">
            <Pay />
          </Route>

          <Route exact path="/success">
            <SuccessPayment />
          </Route>

          <Route exact>
            <Error />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
