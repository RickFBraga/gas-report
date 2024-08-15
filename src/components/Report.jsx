import styled from "styled-components";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import axios from "axios";

const ReportTable = ({ reportData, onUpdate }) => {
  const [showReportTable, setShowReportTable] = useState(false);
  const [reportContainer, setReportContainer] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(reportData);
  const [evidencias, setEvidencias] = useState(
    reportData.evidencias.map((file) => file.name || file)
  );

  const URL = "http://localhost:3000/relatorios/";

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
    axios
      .put(`${URL}${reportData.id}`, { ...formData, evidencias })
      .then((res) => {
        setIsEditing(false);
        onUpdate(res.data);
      })
      .catch((err) => {
        err;
      });
  };

  const handleDeletReport = () => {
    axios
      .delete(`${URL}${reportData.id}`)
      .then(() => {
        setShowReportTable(false);
        setReportContainer(false);
      })
      .catch((err) => {
        err;
      });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + evidencias.length > 3) {
      alert("Você pode adicionar no máximo 3 arquivos.");
      return;
    }
    setEvidencias([...evidencias, ...files.map((file) => file.name)]);
  };

  const handleFileRemove = (index) => {
    const updatedEvidencias = evidencias.filter((_, i) => i !== index);

    axios
      .put(`${URL}${reportData.id}`, {
        ...reportData,
        evidencias: updatedEvidencias,
      })
      .then((res) => {
        console.log("Arquivo removido com sucesso:", res.data);
        setEvidencias(updatedEvidencias);
      })
      .catch((err) => {
        console.error("Erro ao remover o arquivo:", err);
      });
  };

  return (
    <>
      {reportContainer && (
        <ReportContainer onClick={handleClick}>
          <ReportHeader>
            <ReportTitle>Relatório</ReportTitle>
            <ButtonDelete onClick={handleDeletReport}>
              <DeleteIcon />
            </ButtonDelete>
          </ReportHeader>
          <ReportDetail>
            <DetailLabel>Cliente:</DetailLabel>
            <DetailValue>{formData.cliente}</DetailValue>
          </ReportDetail>
          <ReportDetail>
            <DetailLabel>Data e Hora:</DetailLabel>
            <DetailValue>{formData.dataHora}</DetailValue>
          </ReportDetail>
        </ReportContainer>
      )}

      {showReportTable && (
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
              <Label>
                Cliente:
                <Input
                  type="text"
                  name="cliente"
                  value={formData.cliente}
                  onChange={handleFormChange}
                />
              </Label>
              <Label>
                Posto:
                <Input
                  type="text"
                  name="posto"
                  value={formData.posto}
                  onChange={handleFormChange}
                />
              </Label>
              <Label>
                Data e Hora:
                <Input
                  type="text"
                  name="dataHora"
                  value={formData.dataHora}
                  onChange={handleFormChange}
                />
              </Label>
              <Label>
                Litragem do Pedido:
                <Input
                  type="text"
                  name="litragemPedido"
                  value={formData.litragemPedido}
                  onChange={handleFormChange}
                />
              </Label>
              <Label>
                Litragem Descarregada:
                <Input
                  type="text"
                  name="litragemDescarregada"
                  value={formData.litragemDescarregada}
                  onChange={handleFormChange}
                />
              </Label>
              <Label>
                Evidências (máx 3 arquivos):
                <input type="file" multiple onChange={handleFileChange} />
              </Label>
              <div>
                {evidencias.map((file, index) => (
                  <FilePreview key={index}>
                    <FileName>{file}</FileName>
                    <RemoveButton
                      type="button"
                      onClick={() => handleFileRemove(index)}
                    >
                      Remover
                    </RemoveButton>
                  </FilePreview>
                ))}
              </div>
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
                  <TableCell>{formData.cliente}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Posto:</TableCell>
                  <TableCell>{formData.posto}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Data e Hora:</TableCell>
                  <TableCell>{formData.dataHora}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Litragem do Pedido:</TableCell>
                  <TableCell>{formData.litragemPedido}L</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Litragem Descarregada:</TableCell>
                  <TableCell>{formData.litragemDescarregada}L</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sobra/Falta:</TableCell>
                  <TableCell>
                    {formData.litragemDescarregada - formData.litragemPedido}L
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Evidências:</TableCell>
                  <TableCell>
                    {evidencias.length > 0 ? (
                      evidencias.map((file, index) => (
                        <div key={index}>{file}</div>
                      ))
                    ) : (
                      <span>Sem evidências anexadas</span>
                    )}
                  </TableCell>
                </TableRow>
              </tbody>
            </Table>
          )}
        </TableContainer>
      )}
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
    evidencias: PropTypes.arrayOf(PropTypes.instanceOf(File)),
    id: PropTypes.number.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func,
};

export default ReportTable;
const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const FilePreview = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  img {
    margin-right: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

const FileName = styled.span`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: 10px;

  &:hover {
    text-decoration: underline;
  }
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

    button {
      color: #ef6f07;
    }
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
  padding-left: 15px;
  margin: auto;
  color: #ef6f07;
`;

const ButtonDelete = styled.button`
  cursor: pointer;
  color: #f2f2f2;
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
  text-align: right;

  @media (max-width: 768px) {
    padding-left: 10px;
  }
`;

const Button = styled.button`
  display: flex;
  margin-left: 10px;
  color: white;

  &:hover {
    color: #ef6f07;
  }

  @media (max-width: 768px) {
    color: #ef6f07;
  }
`;

const ButtonEdit = styled.button`
  display: flex;
  color: white;

  &:hover {
    color: #ef6f07;
  }

  @media (max-width: 768px) {
    color: #ef6f07;
  }
`;

const TableContainer = styled.div`
  width: 90%;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #212426;
  border-radius: 12px;
  color: #f2f2f2;
  overflow-x: auto;

  @media (max-width: 768px) {
    width: 90%;
    height: auto;
    padding: 15px;
  }
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
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
  box-sizing: border-box;
`;

const TableCell = styled.td`
  padding: 10px;
  font-family: "Lexend Deca", sans-serif;
  font-size: 0.9rem;
  box-sizing: border-box;
  overflow-wrap: break-word;
  word-break: break-word;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 10px;

  button {
    margin-top: 10px;
    padding: 10px;
    background-color: #ef6f07;
    color: white;
    font-family: "Lexend Deca", sans-serif;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #b55409;
      transform: translateY(-2px);
    }
  }
`;

const Label = styled.label`
  font-family: "Lexend Deca", sans-serif;
  color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
`;

const Input = styled.input`
  max-width: 55%;
  padding: 10px;
  border: 2px solid #f2f2f2;
  border-radius: 6px;
  background-color: #2a2e33;
  color: #f2f2f2;
  font-family: "Lexend Deca", sans-serif;
  transition: border-color;
  text-align: right;

  &:focus {
    border-color: #ef6f07;
    outline: none;
  }
`;
