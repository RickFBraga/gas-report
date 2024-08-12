import styled from "styled-components";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

const ReportTable = ({ reportData, onUpdate }) => {
  const [showReportTable, setShowReportTable] = useState(false);
  const [reportContainer, setReportContainer] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(reportData);

  const handleClick = () => {
    setShowReportTable(true);
    setReportContainer(false);
  };

  const handleClickClose = () => {
    setShowReportTable(false);
    setReportContainer(true);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <>
      {reportContainer ? (
        <ReportContainer onClick={handleClick}>
          <ReportHeader>
            <ReportTitle>
              Relatório <ReportId>{reportData.id + 1}</ReportId>
            </ReportTitle>
            <ButtonDelete>
              <DeleteIcon />
            </ButtonDelete>
          </ReportHeader>
          <ReportDetail>
            <DetailLabel>Cliente:</DetailLabel>
            <DetailValue>{reportData.cliente}</DetailValue>
          </ReportDetail>
          <ReportDetail>
            <DetailLabel>Data e Hora:</DetailLabel>
            <DetailValue>{reportData.dataHora}</DetailValue>
          </ReportDetail>
        </ReportContainer>
      ) : null}

      {showReportTable ? (
        <TableContainer>
          <ButtonDiv>
            <ButtonEdit onClick={handleEditClick}>
              <EditIcon />
            </ButtonEdit>
            <Button onClick={handleClickClose}>
              <CloseIcon />
            </Button>
          </ButtonDiv>
          {isEditing ? (
            <EditForm onSubmit={handleFormSubmit}>
              <label>
                Cliente:
                <Input
                  type="text"
                  name="cliente"
                  value={formData.cliente}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Posto:
                <Input
                  type="text"
                  name="posto"
                  value={formData.posto}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Data e Hora:
                <Input
                  type="text"
                  name="dataHora"
                  value={formData.dataHora}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Litragem do Pedido:
                <Input
                  type="text"
                  name="litragemPedido"
                  value={formData.litragemPedido}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Litragem Descarregada:
                <Input
                  type="text"
                  name="litragemDescarregada"
                  value={formData.litragemDescarregada}
                  onChange={handleFormChange}
                />
              </label>
              <button type="submit">Salvar</button>
              <button type="button" onClick={() => setIsEditing(false)}>
                Cancelar
              </button>
            </EditForm>
          ) : (
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>Campos</TableHeader>
                  <TableHeader>Dados</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>Cliente:</TableCell>
                  <TableCell>{reportData.cliente}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Posto:</TableCell>
                  <TableCell>{reportData.posto}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Data e Hora:</TableCell>
                  <TableCell>{reportData.dataHora}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Litragem do Pedido:</TableCell>
                  <TableCell>{reportData.litragemPedido}L</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Litragem Descarregada:</TableCell>
                  <TableCell>{reportData.litragemDescarregada}L</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Evidências:</TableCell>
                  <TableCell>
                    {reportData.evidencias.length > 0
                      ? reportData.evidencias.map((file, index) => (
                          <FileLink
                            key={index}
                            href={URL.createObjectURL(file)}
                            download
                          >
                            {file.name}
                          </FileLink>
                        ))
                      : "Nenhuma evidência"}
                  </TableCell>
                </TableRow>
              </tbody>
            </Table>
          )}
        </TableContainer>
      ) : null}
    </>
  );
};

ReportTable.propTypes = {
  reportData: PropTypes.shape({
    cliente: PropTypes.string.isRequired,
    posto: PropTypes.string.isRequired,
    dataHora: PropTypes.string.isRequired,
    litragemPedido: PropTypes.string.isRequired,
    litragemDescarregada: PropTypes.string.isRequired,
    evidencias: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ReportTable;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  margin-top: 15px;
  border: 2px solid #f2f2f2;
  border-radius: 6px;
  background-color: #2a2e33;
  color: #f2f2f2;
  font-family: "Lexend Deca", sans-serif;
  transition: border-color 0.3s;

  &:focus {
    border-color: #ef6f07;
    outline: none;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ReportContainer = styled.article`
  width: 80%;
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background-color: #212426;
  border-radius: 12px;
  color: #f2f2f2;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Lexend Deca", sans-serif;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease-in-out;
  }

  @media (max-width: 768px) {
    width: 90%;
    padding: 15px;
  }
`;

const ReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const ReportTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  background-color: #212426;
  color: #f2f2f2;
  padding-left: 15px;
`;

const ReportId = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #f2f2f2;
`;

const ButtonDelete = styled.button`
  cursor: pointer;
  color: #f2f2f2;
  background: none;
  border: none;
  display: flex;
  padding-right: 10px;

  &:hover {
    color: #ef6f07;
  }
`;

const ReportDetail = styled.div`
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  color: #f2f2f2;
`;

const DetailLabel = styled.span`
  font-weight: bold;
  color: #f2f2f2;
`;

const DetailValue = styled.span`
  color: #c0c0c0;
`;

const Button = styled.button`
  display: flex;
  margin-left: 10px;
  color: white;

  &:hover {
    color: #ef6f07;
  }
`;

const ButtonEdit = styled.button`
  display: flex;
  color: white;

  &:hover {
    color: #ef6f07;
  }
`;

const TableContainer = styled.div`
  width: 80%;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #212426;
  border-radius: 12px;
  color: #f2f2f2;

  @media (max-width: 768px) {
    width: 90%;
    height: auto;
    padding: 15px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #444;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px 10px;
  font-family: "Lexend Deca", sans-serif;
  font-size: 1rem;
  color: #ef6f07;
`;

const TableCell = styled.td`
  padding: 10px;
  font-family: "Lexend Deca", sans-serif;
  font-size: 0.9rem;
`;

const FileLink = styled.a`
  color: #6fb8d3;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
  }

  input {
    margin-left: 10px;
    padding: 5px;
    font-size: 1rem;
  }

  button {
    margin-top: 10px;
    padding: 10px;
    background-color: #ef6f07;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #b55409;
      transform: translateY(-2px);
    }
  }
`;
