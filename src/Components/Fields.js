import React from 'react';
import '../Css/Fields.css'; 

const Fields = ({ FormData }) => {
  const details = FormData || [];

  return (
    <div className="table-responsive fade-in">
      <table className="table table-hover table-bordered table-striped">
        <thead className="table-primary">
          <tr>
            <th>Sr.No</th>
            <th>Name</th>
            <th>Expense Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {details.map((data, index) => (
            <tr key={index} className={`fade-in-row`}>
              <td>{index + 1}</td>
              <td>{data?.name}</td>
              <td>{data?.expense}</td>
              <td>{data?.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fields;
