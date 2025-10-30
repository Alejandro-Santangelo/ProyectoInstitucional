import React, { useEffect, useState } from "react";
import NavbarInstitucional from "../components/NavbarInstitucional";
import { Container, Row, Col, Card, Table, Button, Form } from "react-bootstrap";

export type Docente = {
  nombre: string;
  dni: string;
  materia: string;
  telefono: string;
  mail: string;
};

const columnas: (keyof Docente)[] = ["nombre", "dni", "materia", "telefono", "mail"];

const PlanillaDocentes: React.FC = () => {
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<Docente | null>(null);

  useEffect(() => {
    fetch('/data/personalDocentes.json')
      .then(r => r.json())
      .then((data: Docente[]) => setDocentes(data))
      .catch(() => setDocentes([]));
  }, []);

  const handleEdit = (idx: number) => {
    setEditIndex(idx);
    setEditData(docentes[idx]);
  };

  const handleSave = () => {
    if (editIndex !== null && editData) {
      const nuevos = [...docentes];
      nuevos[editIndex] = editData;
      setDocentes(nuevos);
      setEditIndex(null);
      setEditData(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editData) {
      setEditData({ ...editData, [e.target.name]: e.target.value });
    }
  };

  const handleDelete = (idx: number) => {
    setDocentes(docentes.filter((_, i) => i !== idx));
  };

  return (
    <div className="dashboard-page">
      <NavbarInstitucional />
      <Container className="pt-5" style={{paddingTop: '140px'}}>
        <Row>
          <Col md={8} className="mb-4 text-start d-flex flex-column justify-content-center">
            <h2 style={{marginBottom: '0.5rem'}}>Planilla de Docentes</h2>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Card className="card">
              <Card.Body>
                <Table responsive bordered hover className="mb-0">
                  <thead>
                    <tr>
                      {columnas.map(col => (
                        <th key={col}>{col.charAt(0).toUpperCase() + col.slice(1)}</th>
                      ))}
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {docentes.map((docente, idx) => (
                      <tr key={docente.dni} className={editIndex === idx ? "table-primary" : ""}>
                        {columnas.map(col => (
                          <td key={col}>
                            {editIndex === idx ? (
                              <Form.Control
                                type="text"
                                name={col}
                                value={editData ? editData[col] : ""}
                                onChange={handleChange}
                              />
                            ) : (
                              docente[col]
                            )}
                          </td>
                        ))}
                        <td>
                          {editIndex === idx ? (
                            <Button size="sm" variant="success" onClick={handleSave}>Guardar</Button>
                          ) : (
                            <>
                              <Button size="sm" variant="primary" onClick={() => handleEdit(idx)}>Editar</Button>{' '}
                              <Button size="sm" variant="danger" onClick={() => handleDelete(idx)}>Eliminar</Button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PlanillaDocentes;
