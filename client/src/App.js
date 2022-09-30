import "./global.css";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import SingleProduct from "./pages/SingleProduct";
import Register from "./pages/Register";
import Pay from "./pages/Pay";
import SuccessPayment from "./pages/SuccessPayment";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/pay">
            <Pay />
          </Route>

          <Route exact path="/success">
            <SuccessPayment />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
