
import { OutlinedInput } from "@mui/material";
import "./employeeLoan.css";   
import React, { useState } from "react";



function EmployeeLoans() {
    const [employeeName, setEmployeeName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [Amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const[duration, setDuration] = useState("");
    const handleSubmit = async(e) => {
        e.preventDefault();
        const loanDetails = {
            employeeName,
            accountNumber,
            Amount,
            description,
            duration,
        };
    try {
        const response = await fetch("/api/employee-loans", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loanDetails),
        });

        if (response.ok) {
            console.log("Loan details added successful");
        } else {
            console.error("Loan details adding failed");
        }
    } catch (error) {
        console.error("Error in Loan submission:", error);
    }
    };

    const handleReset = () => {
        setEmployeeName("");
        setAccountNumber("");
        setAmount("");
        setDescription("");
       setDuration("");
    };  

    return (
        <div className="App2">
            <h1>Loan Application</h1>
            <fieldset>
                <form onSubmit={handleSubmit}>
                    <label style={{ color: '#5649e7', fontSize: '15px', fontWeight: 'bold', marginTop: '10px', marginBottom: '10px' }}htmlFor="add name">Employee Name</label>
                    <br />

                    <input Employee Name
                        name="Employee Name"
                        id="Employee Name"
                        value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}
                        placeholder="Employee Name"
                        required
                    />

                    <br />
                    <label style={{ color: '#5649e7', fontSize: '15px', fontWeight: 'bold', marginTop: '10px', marginBottom: '10px' }}htmlFor="add account">Account Number</label>
                     <input Account Number
                        name="Account Number"
                        id="Account Number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        placeholder="Account Number"
                        required
                     />   
                     <br />
                     <label style={{ color: '#5649e7', fontSize: '15px', fontWeight: 'bold', marginTop: '10px', marginBottom: '10px' }}htmlFor="add amount">Amount</label> 
                    <br />
                        <input Amount
                        type="number"
                        name="Amount"
                        id="Amount"
                        value={Amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount"
                        required
                        />
                    <br />
                    <label style={{ color: '#5649e7', fontSize: '15px', fontWeight: 'bold', marginTop: '10px', marginBottom: '10px' }}htmlFor="add duration">Duration</label>
                    <select
                        name="duration"
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    >
                        <option value="" disabled>Select duration</option>
                        <option value="6">6 months</option>
                        <option value="12">12 months (1 year)</option>
                        <option value="18">18 months </option>
                        <option value="24">24 months(2 years) </option>
                    </select>
                    

                    <label style={{ color: '#5649e6', fontSize: '15px', fontWeight: 'bold', marginTop: '10px', marginBottom: '10px' }}htmlFor="description">Reason</label>
                    <textarea
                        name="description"
                        id="description"
                        cols="30"
                        rows="10"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Reason"
                        required
                    ></textarea>
                    <button
                        type="reset"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                                   
                    <button
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                    <br/>
                </form>
            </fieldset>
        </div>
    );
}

export default EmployeeLoans;
