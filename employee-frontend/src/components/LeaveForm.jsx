import React, { useState } from 'react';
import API from '../services/api';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const LeaveForm = () => {
  const [form, setForm] = useState({ month: '', sl_taken: 0, cl_taken: 0 });
  const [success, setSuccess] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/leaves/', form);
      setSuccess('Leave request submitted!');
      setForm({ month: '', sl_taken: 0, cl_taken: 0 });
    } catch {
      setSuccess('');
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '500px' }}>
      <h4>Apply for Leave</h4>
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Month</Form.Label>
          <Form.Control type="text" value={form.month} onChange={e => setForm({ ...form, month: e.target.value })} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>SL Taken</Form.Label>
          <Form.Control type="number" value={form.sl_taken} onChange={e => setForm({ ...form, sl_taken: parseFloat(e.target.value) })} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>CL Taken</Form.Label>
          <Form.Control type="number" value={form.cl_taken} onChange={e => setForm({ ...form, cl_taken: parseFloat(e.target.value) })} />
        </Form.Group>
        <Button type="submit" variant="success">Submit</Button>
      </Form>
    </Container>
  );
};

export default LeaveForm;
