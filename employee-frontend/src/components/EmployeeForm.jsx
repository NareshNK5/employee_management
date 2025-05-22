import React, { useState, useEffect } from 'react';
import API from '../services/api';

function EmployeeForm({ editing, onSaved }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee',
  });

  useEffect(() => {
    if (editing) setFormData({ ...editing, password: '' });
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await API.put(`/employees/${editing.id}/`, formData);
    } else {
      await API.post('/employees/', formData);
    }
    setFormData({ name: '', email: '', password: '', role: 'employee' });
    onSaved();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Name" />
      <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" />
      <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Password" />
      <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
        <option value="admin">Admin</option>
        <option value="employee">Employee</option>
      </select>
      <button type="submit">{editing ? 'Update' : 'Create'}</button>
    </form>
  );
}
export default EmployeeForm;
