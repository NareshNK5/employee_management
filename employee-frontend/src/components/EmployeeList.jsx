import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Table, Button, Form, Modal, Container } from 'react-bootstrap';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'employee' });
  const [editId, setEditId] = useState(null);

  const fetchEmployees = async () => {
    const res = await API.get(`/employees/?search=${search}`);
    setEmployees(res.data.results);
  };

  useEffect(() => {
    fetchEmployees();
  }, [search]);

  const handleSave = async () => {
    if (editId) {
      await API.put(`/employees/${editId}/`, form);
    } else {
      await API.post('/employees/', form);
    }
    setShowModal(false);
    setEditId(null);
    setForm({ name: '', email: '', password: '', role: 'employee' });
    fetchEmployees();
  };

  const handleDelete = async id => {
    if (window.confirm('Delete this employee?')) {
      await API.delete(`/employees/${id}/`);
      fetchEmployees();
    }
  };

  const handleEdit = emp => {
    setEditId(emp.id);
    setForm(emp);
    setShowModal(true);
  };

  return (
    <Container className="mt-4">
      <h4>Employee List</h4>
      <Form.Control
        type="text"
        placeholder="Search employees"
        className="mb-3"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">Add Employee</Button>
      <Table striped bordered hover>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(emp)}>Edit</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(emp.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton><Modal.Title>{editId ? 'Edit' : 'Add'} Employee</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </Form.Group>
            {!editId && (
              <Form.Group className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
              </Form.Group>
            )}
            <Form.Group className="mb-2">
              <Form.Label>Role</Form.Label>
              <Form.Select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EmployeeList;
