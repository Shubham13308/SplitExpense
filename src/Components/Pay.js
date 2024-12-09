import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/Pay.css'; 

const Pay = ({ Payamount }) => {
  const result = Payamount || [];

  return (
    <div className="container mt-4 fade-in">
      <h5 className="text-primary">Payment Details</h5>
      <div className="row">
        {result.map((data, index) => (
          <div className="col-12 col-md-6 mb-3" key={index}>
            <div className="card border-primary shadow-lg fade-in-card">
              <div className="card-body">
                <h6 className="card-title text-info">{data?.username}</h6>
                <p className="card-text">
                  Has to pay <strong className="text-danger">{Math.round(data?.hasToPay)}</strong> to <strong className="text-success">{data?.to}</strong>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pay;
