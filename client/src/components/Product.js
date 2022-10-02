import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  cursor: pointer;
  transition: all 0.4s ease;
`;

const Container = styled.div`
  width: 400px;
  height: 400px;
  margin: 5px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d6d6d6;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 300px;
  height: 300px;
  background-color: #f0eeee;
  border-radius: 50%;
  position: absolute;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: 2;
  border-radius: 50%;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 3px;
  transition: all 0.4s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  return (
    <Container>
      <Circle />

      <Image src={item.img} />

      <Info>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>

        <Link to={`/product/${item._id}`}>
          <Icon>
            <SearchOutlined />
          </Icon>
        </Link>

        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
