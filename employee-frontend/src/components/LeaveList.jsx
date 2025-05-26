import React, { useEffect, useState } from 'react';
import API from '../services/api';

const ALL_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const TOTAL_SL = 16;
const TOTAL_CL = 12;

function LeaveList() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log("userId:",userId)
  
    API.get('/leaves/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        const userLeaves = res.data.filter(leave => leave.employee == userId);
        console.log("userLeaves:",userLeaves);
        setLeaves(userLeaves);
      })
      .catch(err => alert("Couldn't fetch leaves"));
  }, []);

  const leaveMap = {};
  leaves.forEach(leave => {
    leaveMap[leave.month] = leave;
  });

  const totalTaken = ALL_MONTHS.reduce((acc, month) => {
    const sl = leaveMap[month]?.sl_taken || 0;
    const cl = leaveMap[month]?.cl_taken || 0;
    return {
      sl: acc.sl + sl,
      cl: acc.cl + cl,
    };
  }, { sl: 0, cl: 0 });

  return (
    <div className="container mt-3 ">
      <h3>Leave List</h3>
      <table className="table table-bordered ">
        <thead>
          <tr>
            <th>Month</th>
            <th>SL Taken</th>
            <th>CL Taken</th>
          </tr>
        </thead>
        <tbody>
          {ALL_MONTHS.map(month => {
            const leave = leaveMap[month] || { sl_taken: 0, cl_taken: 0 };
            return (
              <tr key={month}>
                <td>{month}</td>
                <td>{leave.sl_taken}</td>
                <td>{leave.cl_taken}</td>
              </tr>
            );
          })}
          <tr>
            <th>Actual Leave</th>
            <th>{TOTAL_SL}</th>
            <th>{TOTAL_CL}</th>
          </tr>
          <tr>
            <th>Total Taken</th>
            <th>{totalTaken.sl}</th>
            <th>{totalTaken.cl}</th>
          </tr>
          <tr>
            <th>Remaining</th>
            <th>{TOTAL_SL - totalTaken.sl}</th>
            <th>{TOTAL_CL - totalTaken.cl}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default LeaveList;
