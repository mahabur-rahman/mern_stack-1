import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { popularProducts } from "../Data";
import Product from "./Product";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  flex-wrap: wrap;
`;

const Products = ({ cat, sort, filters }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // if category has
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:4000/api/products?category=${cat}`
            : `http://localhost:4000/api/products`
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  // if user choose {color : 'red', size : 's'}
  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [cat, filters, products]);

  // if user select price range
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) => {
        return [...prev].sort((a, b) => {
          return a.createdAt - b.createdAt;
        });
      });
    } else if (sort === "asc") {
      setFilteredProducts((prev) => {
        return [...prev].sort((a, b) => {
          return a.price - b.price;
        });
      });
    } else {
      setFilteredProducts((prev) => {
        return [...prev].sort((a, b) => {
          return b.price - a.price;
        });
      });
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : products
            .slice(0, 9)
            .map((item) => <Product key={item._id} item={item} />)}
    </Container>
  );
};

export default Products;
