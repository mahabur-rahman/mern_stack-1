import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
// react router dom
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Pay from "./components/Pay";
import Success from "./components/Success";

const App = () => {
  const user = true;

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>

        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>

        <Route path="/products/:category">
          <ProductList />
        </Route>

        <Route path="/product/:id">
          <Product />
        </Route>

        <Route path="/cart">
          <Cart />
        </Route>

        <Route path="/pay">
          <Pay />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
