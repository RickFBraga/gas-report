import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "axios";

const Modal = ({ onReportCreation, onClose }) => {
  const [cliente, setCliente] = useState("");
  const [posto, setPosto] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [litragemPedido, setLitragemPedido] = useState("");
  const [litragemDescarregada, setLitragemDescarregada] = useState("");
  const [evidencias, setEvidencias] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = new Date(dataHora).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const reportData = {
      cliente,
      posto,
      dataHora: formattedDate,
      litragemPedido,
      litragemDescarregada,
      evidencias: evidencias.map((file) => file.name),
    };

    submitData(reportData);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + evidencias.length > 3) {
      alert("Você pode adicionar no máximo 3 arquivos.");
      return;
    }
    setEvidencias((prevEvidencias) => [...prevEvidencias, ...files]);
  };

  const URL = "http://localhost:3000/relatorios";

  function submitData(reportData) {
    axios
      .post(URL, reportData)
      .then((res) => {
        console.log(res.data);
        onReportCreation(res.data);
        onClose();
      })
      .catch((err) => {
        console.log(err.data);
      });
  }

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalContainer>
        <Form onSubmit={handleSubmit}>
          <Heading>Relatório de Descarga</Heading>
          <Label>
            Cliente:
            <Input
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              required
            />
          </Label>
          <Label>
            Posto:
            <Input
              type="text"
              value={posto}
              onChange={(e) => setPosto(e.target.value)}
              required
            />
          </Label>
          <Label>
            Data e Hora:
            <Input
              type="datetime-local"
              value={dataHora}
              onChange={(e) => setDataHora(e.target.value)}
              required
            />
          </Label>
          <Label>
            Litragem do Pedido:
            <Input
              type="number"
              value={litragemPedido}
              onChange={(e) => setLitragemPedido(e.target.value)}
              required
            />
          </Label>
          <Label>
            Litragem Descarregada:
            <Input
              type="number"
              value={litragemDescarregada}
              onChange={(e) => setLitragemDescarregada(e.target.value)}
              required
            />
          </Label>
          <Label>
            Evidências (opcional, máximo 3 arquivos):
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              multiple
            />
          </Label>
          <Button type="submit">Enviar</Button>
        </Form>
      </ModalContainer>
    </>
  );
};

Modal.propTypes = {
  onReportCreation: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #212426;
  padding: 30px;
  border-radius: 12px;
  z-index: 20;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 600px;
  height: auto;
  overflow-y: auto;

  @media (max-width: 670px) {
    padding: 15px;
    width: 95%;
    height: auto;
  }

  @media (max-width: 480px) {
    padding: 10px;
    width: 90%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (max-width: 670px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const Heading = styled.h2`
  font-family: "Lexend Deca";
  text-align: center;
  background-color: #212426;
  color: #f2f2f2;
  margin-bottom: 20px;

  @media (max-width: 670px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Label = styled.label`
  font-family: "Lexend Deca", sans-serif;
  color: #f2f2f2;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin-top: 5px;
  border: 2px solid #f2f2f2;
  border-radius: 6px;
  background-color: #2a2e33;
  color: #f2f2f2;
  font-family: "Lexend Deca", sans-serif;
  transition: border-color 0.3s;
  font-size: 1.2rem;

  &:focus {
    border-color: #ef6f07;
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 10px;
  }

  @media (max-width: 670px) {
    font-size: 0.9rem;
    padding: 8px;
    margin-top: 3px;
  }
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #ef6f07;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #b55409;
    transform: translateY(-2px);
  }

  @media (max-width: 670px) {
    font-size: 16px;
    padding: 10px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px;
  }
`;
