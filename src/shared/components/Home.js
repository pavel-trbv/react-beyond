import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Title = styled.h1`
  margin: 50px 0 15px;
  font-size: 32pt;
  text-align: center;
`;

const Home = () => {
  return (
    <div>
     <Title>Home Page</Title>
     <center>
      <p><Link to="/counter">Go to counter example</Link></p>
     </center>
    </div>
  );
};

export default Home;