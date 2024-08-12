import { useState } from "react";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Report from "../components/Report";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [reportData, setReportData] = useState(null);

  function handleClick() {
    setShowModal(true);
  }

  function handleReportCreation(data) {
    setReportData(data);
    setShowModal(false);
  }

  return (
    <>
      <Header />

      <Container>
        <h2>Adicionar relatório de carga</h2>
        <AddButton onClick={handleClick}>
          <AddIcon />
        </AddButton>
      </Container>

      {reportData && <Report reportData={reportData} />}

      {showModal && (
        <Modal
          onReportCreation={handleReportCreation}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  gap: 20px;
  margin-bottom: 20px;

  h2 {
    font-size: 1.2rem;
    font-family: Lexend Deca;
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 40px;
  background-color: #EF6F07;
  border-radius: 5px;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: #A34C05;
    transition: 0.1s;
  }
`;
