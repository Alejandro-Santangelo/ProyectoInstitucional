import React, { useEffect, useState } from 'react'
import NavbarInstitucional from '../components/NavbarInstitucional'
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

type UserEditable = {
  nombre: string
  username: string
  password: string
  route: string
  rol: string
  genero?: 'M'|'F'|'O' | string
}

const LOCAL_KEY = 'usuarios_local'

const AdminUsers: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [usuarios, setUsuarios] = useState<UserEditable[]>([])
  const [loading, setLoading] = useState(true)
  // const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Preferir localStorage
    const saved = localStorage.getItem(LOCAL_KEY)
    if (saved) {
      try {
        setUsuarios(JSON.parse(saved))
        setLoading(false)
        return
      } catch (e) {
        console.error(e)
      }
    }

    fetch('/data/usuarios.json')
      .then(r => r.json())
      .then((data: UserEditable[]) => setUsuarios(data))
      .catch(e => {
        console.error(e)
      })
      .finally(() => setLoading(false))
  }, [])

  const saveLocal = (list: UserEditable[]) => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(list, null, 2))
    setUsuarios(list)
  }

  const handleChangeField = (idx: number, field: keyof UserEditable, value: string) => {
  const next: UserEditable[] = [...usuarios]
  const updated = { ...next[idx], [field]: value } as UserEditable
  next[idx] = updated
  setUsuarios(next)
  }

  const handleAdd = () => {
    const next = [...usuarios, { nombre: '', username: '', password: '', route: '/', rol: '', genero: 'O' } as UserEditable]
    setUsuarios(next)
  }

  const handleRemove = (idx: number) => {
    const next = usuarios.filter((_, i) => i !== idx)
    setUsuarios(next)
  }

  const handleSave = () => {
    saveLocal(usuarios)
    alert('Usuarios guardados en localStorage')
  }

  const handleReset = () => {
    localStorage.removeItem(LOCAL_KEY)
    window.location.reload()
  }

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(usuarios, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'usuarios_export.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (file: File | null) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as UserEditable[]
        setUsuarios(parsed)
        localStorage.setItem(LOCAL_KEY, JSON.stringify(parsed, null, 2))
      } catch (err) {
        console.error(err)
        alert('JSON inválido')
      }
    }
    reader.readAsText(file)
  }

  if (loading) return <div>Loading...</div>

  // Si no es Directora, mostrar acceso denegado simple
  if (!user || user.rol !== 'Directora') {
    return (
      <div>
        <NavbarInstitucional />
        <Container style={{paddingTop: 140}}>
          <h3>Acceso denegado</h3>
          <p>Solo Directora puede acceder al editor de usuarios.</p>
          <Button onClick={() => navigate(-1)}>Volver</Button>
        </Container>
      </div>
    )
  }

  return (
    <div>
      <NavbarInstitucional />
      <Container style={{paddingTop: 140}}>
        <Row className="mb-3">
          <Col>
            <h3>Editor de usuarios (editable)</h3>
            <p>Los cambios se guardan en <code>localStorage</code>. Puedes exportar/importar JSON o restaurar desde el archivo remoto.</p>
            <div className="d-flex gap-2">
              <Button variant="primary" onClick={handleAdd}>Añadir usuario</Button>
              <Button variant="success" onClick={handleSave}>Guardar (local)</Button>
              <Button variant="outline-secondary" onClick={handleExport}>Exportar JSON</Button>
              <Button variant="danger" onClick={handleReset}>Restaurar remoto</Button>
                <Form.Group controlId="formFile" className="ms-2">
                <Form.Control type="file" accept="application/json" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleImport(e.currentTarget.files ? e.currentTarget.files[0] : null)} />
              </Form.Group>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Usuario</th>
                  <th>Contraseña</th>
                  <th>Rol</th>
                  <th>Ruta</th>
                  <th>Género</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u, idx) => (
                  <tr key={idx}>
                    <td>{idx+1}</td>
                    <td><input className="form-control" value={u.nombre} onChange={(e) => handleChangeField(idx, 'nombre', e.target.value)} /></td>
                    <td><input className="form-control" value={u.username} onChange={(e) => handleChangeField(idx, 'username', e.target.value)} /></td>
                    <td><input className="form-control" value={u.password} onChange={(e) => handleChangeField(idx, 'password', e.target.value)} /></td>
                    <td><input className="form-control" value={u.rol} onChange={(e) => handleChangeField(idx, 'rol', e.target.value)} /></td>
                    <td><input className="form-control" value={u.route} onChange={(e) => handleChangeField(idx, 'route', e.target.value)} /></td>
                    <td>
                      <Form.Select value={u.genero || 'O'} onChange={(e) => handleChangeField(idx, 'genero', e.target.value)}>
                        <option value="M">M</option>
                        <option value="F">F</option>
                        <option value="O">O</option>
                      </Form.Select>
                    </td>
                    <td><Button variant="outline-danger" size="sm" onClick={() => handleRemove(idx)}>Eliminar</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AdminUsers
