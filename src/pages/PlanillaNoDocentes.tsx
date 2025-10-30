import React, { useEffect, useState } from "react";
import NavbarInstitucional from "../components/NavbarInstitucional";
import { Container, Row, Col, Card, Table, Button, Form } from "react-bootstrap";

export type NoDocente = {
  nombre: string;
  dni: string;
  sector: string;
  telefono: string;
  mail: string;
};

const columnas: (keyof NoDocente)[] = ["nombre", "dni", "sector", "telefono", "mail"];

const PlanillaNoDocentes: React.FC = () => {
  const [noDocentes, setNoDocentes] = useState<NoDocente[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<NoDocente | null>(null);

  useEffect(() => {
    fetch('/data/personalNoDocentes.json')
      .then(r => r.json())
      .then((data: NoDocente[]) => setNoDocentes(data))
      .catch(() => setNoDocentes([]));
  }, []);

  const handleEdit = (idx: number) => {
    setEditIndex(idx);
    setEditData(noDocentes[idx]);
  };

  const handleSave = () => {
    if (editIndex !== null && editData) {
      const nuevos = [...noDocentes];
      nuevos[editIndex] = editData;
      setNoDocentes(nuevos);
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
    setNoDocentes(noDocentes.filter((_, i) => i !== idx));
  };

  return (
    <div className="dashboard-page">
      <NavbarInstitucional />
      <Container className="pt-5" style={{paddingTop: '140px'}}>
        <Row>
          <Col md={8} className="mb-4 text-start d-flex flex-column justify-content-center">
            <h2 style={{marginBottom: '0.5rem'}}>Planilla de Personal No Docente</h2>
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
                    {noDocentes.map((noDocente, idx) => (
                      <tr key={noDocente.dni} className={editIndex === idx ? "table-primary" : ""}>
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
                              noDocente[col]
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

export default PlanillaNoDocentes;
