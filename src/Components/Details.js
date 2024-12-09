import React, { useState } from "react";
import Fields from "./Fields";
import Pay from "./Pay";
import '../Css/Details.css'

const Details = () => {
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [formData, setFormData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [payamount, setPayAmount] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); 

  const handleSelectChange = (event) => {
    const number = parseInt(event.target.value);
    setSelectedNumber(number);
    setFormData(
      Array.from({ length: number }, () => ({
        name: "",
        expense: "",
        amount: "",
      }))
    );
    setErrors({});
  };

  const handleInputChange = (index,  field, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index][field] = value;
    setFormData(updatedFormData);
  };

  const validateForm = () => {
    const newErrors = {};
    formData.forEach((data, index) => {
      if (!data.name) newErrors[`name-${index}`] = "Name is required";
      if (!data.expense) newErrors[`expense-${index}`] = "Expense is required";
      if (!data.amount || parseFloat(data.amount) <= 0) {
        newErrors[`amount-${index}`] = "Amount must be greater than 0";
      }
    });
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true); 
    setTimeout(() => {
      splitExpense(formData, selectedNumber);
      setIsSubmitted(true);
      setLoading(false); 
    }, 1000); 
  };

  const splitExpense = (formData, selectedNumber) => {
    const totalAmount = formData.reduce(
      (acc, user) => acc + (parseFloat(user.amount) || 0),
      0
    );
    const perPersonShare = totalAmount / selectedNumber;

    const separateUser = () => {
      const initialLender = formData.filter((user) => user.amount > perPersonShare);
      const initialOwers = formData.filter((user) => user.amount < perPersonShare);

      const lenders = initialLender.map((lender) => ({
        ...lender,
        deposit: lender?.amount - perPersonShare,
      }));

      const owers = initialOwers.map((ower) => ({
        ...ower,
        balance: perPersonShare - ower.amount,
        hasToPay: [],
      }));

      return { owers, lenders };
    };

    const { owers, lenders } = separateUser();
    const balanceSheet = [];

    owers.forEach((ower) => {
      const username = ower.name;
      lenders.every((lender) => {
        const to = lender.name;
        if (lender.deposit > 0) {
          const hasToPay = Math.min(lender.deposit, ower.balance);
          if (hasToPay > 0) {
            ower.balance = Math.max(ower.balance - hasToPay, 0);
            lender.deposit = Math.max(lender.deposit - hasToPay, 0);
            balanceSheet.push({ username, hasToPay, to });
          }
        }
        return ower.balance > 0;
      });
    });
    setPayAmount(balanceSheet);
    return balanceSheet;
  };

  return (
    <div className="details-container fade-in">
      <div className="container mt-3">
        <label htmlFor="personsDropdown" className="form-label">
          No of Persons
        </label>
        <select
          id="personsDropdown"
          className="form-select select-box"
          value={selectedNumber}
          onChange={handleSelectChange}
        >
          <option value="0">Select Number</option>
          {[...Array(8).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>

        {selectedNumber > 0 && (
          <form onSubmit={handleSubmit} className="fade-in">
            {Array.from({ length: selectedNumber }, (_, index) => (
              <div key={index} className="mt-3 person-card fade-in">
                <h5>Person {index + 1}</h5>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-4">
                    <label htmlFor={`name-${index}`} className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors[`name-${index}`] ? 'is-invalid' : ''}`}
                      id={`name-${index}`}
                      placeholder="Enter Name"
                      value={formData[index]?.name || ""}
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                    />
                    {errors[`name-${index}`] && (
                      <div className="invalid-feedback">{errors[`name-${index}`]}</div>
                    )}
                  </div>

                  <div className="col-12 col-sm-6 col-md-4">
                    <label htmlFor={`expense-${index}`} className="form-label">
                      Expense
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors[`expense-${index}`] ? 'is-invalid' : ''}`}
                      id={`expense-${index}`}
                      placeholder="Enter expense"
                      value={formData[index]?.expense || ""}
                      onChange={(e) =>
                        handleInputChange(index, "expense", e.target.value)
                      }
                    />
                    {errors[`expense-${index}`] && (
                      <div className="invalid-feedback">{errors[`expense-${index}`]}</div>
                    )}
                  </div>

                  <div className="col-12 col-sm-6 col-md-4">
                    <label htmlFor={`amount-${index}`} className="form-label">
                      Amount
                    </label>
                    <input
                      type="number"
                      className={`form-control ${errors[`amount-${index}`] ? 'is-invalid' : ''}`}
                      id={`amount-${index}`}
                      placeholder="Enter amount"
                      value={formData[index]?.amount || ""}
                      onChange={(e) =>
                        handleInputChange(index, "amount", e.target.value)
                      }
                    />
                    {errors[`amount-${index}`] && (
                      <div className="invalid-feedback">{errors[`amount-${index}`]}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <button type="submit" className="btn btn-primary mt-3 animate-btn">
              Submit
            </button>
          </form>
        )}

        {loading && <div className="loader"></div>} 
      </div>

      {isSubmitted && formData.length > 0 && (
        <div>
          <Fields FormData={formData} />
        </div>
      )}

      {isSubmitted && payamount.length > 0 && (
        <div>
          <Pay Payamount={payamount} />
        </div>
      )}
    </div>
  );
};

export default Details;
