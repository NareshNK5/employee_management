import React, { useState } from "react";
import API from "../services/api";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import LeaveList from "./LeaveList";

const TOTAL_SL = 16;
const TOTAL_CL = 12;

const LeaveForm = () => {
  const [form, setForm] = useState({ month: "", sl_taken: 0, cl_taken: 0 });
  const [success, setSuccess] = useState("");
  const [refreshFlag, setRefreshFlag] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/leaves/", form);
      setSuccess("Leave request submitted!");
      setForm({ month: "", sl_taken: 0, cl_taken: 0 });
      setRefreshFlag(prev => !prev); 
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setSuccess("");
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <h4>Apply for Leave</h4>
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Month</Form.Label>
              <Form.Select
                value={form.month}
                onChange={(e) => setForm({ ...form, month: e.target.value })}
              >
                <option value="">Select Month</option>
                {[
                  "January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"
                ].map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>SL Taken</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                min={0.0}
                max={TOTAL_SL}
                value={form.sl_taken}
                onChange={(e) =>
                  setForm({ ...form, sl_taken: parseFloat(e.target.value) || 0 })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>CL Taken</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                min={0.0}
                max={TOTAL_CL}
                value={form.cl_taken}
                onChange={(e) =>
                  setForm({ ...form, cl_taken: parseFloat(e.target.value) || 0 })
                }
              />
            </Form.Group>
            <Button type="submit" variant="success">Submit</Button>
          </Form>
        </Col>
        <Col md={8} className="overflow-auto">
          <LeaveList refreshFlag={refreshFlag} />
        </Col>
      </Row>
    </Container>
  );
};

export default LeaveForm;
