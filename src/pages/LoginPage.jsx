import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function join(event) {
    event.preventDefault();

    if (name === "") {
      alert("É necessário preencher o campo de nome.");
      return;
    }

    if (name.length > 15) {
      alert("O nome não pode ter mais de 15 caracteres!");
      return;
    }

    navigate("/home", { state: { name } });
  }

  return (
    <Container>
      <LoginContainer>
        <Title>Bem-vindo!</Title>
        <Subtitle>Insira seu nome para continuar</Subtitle>
        <form onSubmit={join}>
          <Input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="Insira seu primeiro nome..."
          />
          <Button type="submit">Entrar</Button>
        </form>
      </LoginContainer>
    </Container>
  );
}

const Container = styled.div`
  background: linear-gradient(135deg, #053067 0%, #393c41 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginContainer = styled.div`
  padding: 30px;
  display: flex;
  max-width: 600px;
  align-items: center;
  flex-direction: column;
  background-color: #f2f2f2;
  border-radius: 10px;
  width: 80%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Title = styled.h1`
  font-family: "Lexend Deca", sans-serif;
  font-size: 2rem;
  color: #053067;
  margin-bottom: 10px;
`;

const Subtitle = styled.span`
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.2rem;
  color: #6f6f6f;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #ffffff;
  font-family: "Lexend Deca", sans-serif;
  font-size: 1rem;
  box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s, box-shadow 0.3s;

  &::placeholder {
    color: #9a9a9a;
  }

  &:focus {
    border-color: #ef6f07;
    box-shadow: 0 0 4px rgba(239, 111, 7, 0.5);
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #ef6f07;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #ff8f31;
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(0);
  }
`;
