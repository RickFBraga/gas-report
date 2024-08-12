import styled from "styled-components";
import TruckIcon from "../assets/truck.png";
import Profile from "../assets/profile.png";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const { name } = location.state || {};

  return (
    <Container>
      <img src={TruckIcon} alt="" />
      <User>
        <span>{name}</span>
        <img src={Profile} alt="" />
      </User>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height: 80px;
  background-color: #053067;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.04);
`;

const User = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 5px;
  gap: 15px;
  max-height: 50px;

  img {
    height: 35px;
  }

  span {
    font-family: Lexend Deca;
    font-size: 1.20rem;
    color: #FFF;
  }
`;
