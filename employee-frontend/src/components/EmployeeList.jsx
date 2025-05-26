import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Table, Button, Form, Modal, Container } from "react-bootstrap";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [empLeave, setEmpLeave] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });
  const [editId, setEditId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [selectedEmpDetails, setSelectedEmpDetails] = useState(null);

  // Fetch Employees
  const fetchEmployees = async () => {
    try {
      const res = await API.get(`/employees/?search=${search}&page=${page}`);
      const results = res.data.results || res.data;
      setEmployees(results);
      const totalCount = res.data.count || results.length;
      const pageSize = results.length > 0 ? results.length : 10;
      setTotalPages(Math.ceil(totalCount / pageSize));
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  // Fetch Leaves
  const fetchEmpLeave = async () => {
    try {
      const res = await API.get("/leaves/");
      setEmpLeave(res.data || []);
      console.log("Fetched Leaves:", res.data);
    } catch (err) {
      console.error("Error fetching leaves:", err);
    }
  };

  // Calculate Leave Totals
  const getLeaveTotals = (empId) => {
    console.log(empId)
    console.log("empLeave:",empLeave)
    const leaves = empLeave.filter((leave) => leave.employee === empId);
    const sl = leaves.reduce((sum, l) => sum + (l.sl_taken || 0), 0);
    const cl = leaves.reduce((sum, l) => sum + (l.cl_taken || 0), 0);
    console.log("getLeaveTotals:",sl, cl,leaves)
    return { sl, cl, details: leaves };
  };

  // Save or Update Employee
  const handleSave = async () => {
    try {
      if (!form.name || !form.email || (!editId && !form.password)) {
        alert("Please fill in all required fields.");
        return;
      }
      if (editId) {
        await API.put(`/employees/${editId}/`, form);
      } else {
        await API.post("/employees/", form);
      }
      resetForm();
      fetchEmployees();
    } catch (err) {
      console.error("Error saving employee:", err);
    }
  };

  // Delete Employee
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await API.delete(`/employees/${id}/`);
      fetchEmployees();
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  // Edit Employee
  const handleEdit = (emp) => {
    setEditId(emp.id);
    setForm({
      name: emp.name || "",
      email: emp.email || "",
      password: "",
      role: emp.role || "employee",
    });
    setShowModal(true);
  };

  // Reset Form
  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      password: "",
      role: "employee",
    });
    setEditId(null);
    setShowModal(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, [search, page]);

  useEffect(() => {
      fetchEmpLeave();
  }, [employees]);

  return (
    <Container className="mt-4">
      <h4>Employee List</h4>
      <Form.Control
        type="text"
        placeholder="Search employees"
        className="mb-3"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />
      <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
        Add Employee
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => {
            const { sl, cl, details } = getLeaveTotals(emp.id);
            return (
              <tr key={emp.id}>
                <td
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={() => {
                    setSelectedEmpDetails({
                      id: emp.id,
                      name: emp.name,
                      sl,
                      cl,
                      details,
                    });
                    setShowLeaveModal(true);
                  }}
                >
                  {emp.name}
                </td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
                <td>
                  <Button size="sm" variant="warning" onClick={() => handleEdit(emp)}>
                    Edit
                  </Button>{" "}
                  <Button size="sm" variant="danger" onClick={() => handleDelete(emp.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between mt-3">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </div>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={resetForm}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit Employee" : "Add Employee"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Form.Group>
            {!editId && (
              <Form.Group className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </Form.Group>
            )}
            <Form.Group className="mb-2">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetForm}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Leave Details Modal */}
      <Modal show={showLeaveModal} onHide={() => setShowLeaveModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Leave Details - {selectedEmpDetails?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmpDetails && selectedEmpDetails.details.length > 0 ? (
            <>
              <p>
                <strong>SL Taken:</strong> {selectedEmpDetails.sl}
              </p>
              <p>
                <strong>CL Taken:</strong> {selectedEmpDetails.cl}
              </p>
              <Table bordered size="sm">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>SL Taken</th>
                    <th>CL Taken</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedEmpDetails.details.map((leave) => (
                    <tr key={leave.id}>
                      <td>{leave.month}</td>
                      <td>{leave.sl_taken}</td>
                      <td>{leave.cl_taken}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            <p>No leave records found.</p>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default EmployeeList;
