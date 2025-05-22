import React, { useEffect, useState } from 'react';
import API from '../services/api';

function LeaveList() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    API.get('/leaves/')
      .then(res => setLeaves(res.data))
      .catch(err => alert("Couldn't fetch leaves"));
  }, []);

  return (
    <div className="container mt-3">
      <h3>Leave List</h3>
      <table className="table table-bordered">
        <thead><tr><th>Month</th><th>SL Taken</th><th>CL Taken</th></tr></thead>
        <tbody>
          {leaves.map(leave => (
            <tr key={leave.id}>
              <td>{leave.month}</td>
              <td>{leave.sl_taken}</td>
              <td>{leave.cl_taken}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveList;
