import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  color: white;
  background: black;
  cursor: pointer;
`;

const Pay = () => {
  return (
    <Container>
      <Button>Pay Now</Button>
    </Container>
  );
};

export default Pay;
