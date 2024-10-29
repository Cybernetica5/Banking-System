import api from "../../../../services/api";
// import "./employeeLoan.css";
import React, { useState, useEffect } from "react";
import { FormControl, TextField, Autocomplete } from "@mui/material";
import Cookies from 'js-cookie';

function EmployeeLoans() {
    const [loanType, setLoanType] = useState("");
    const [selectedAccount, setSelectedAccount] = useState("");
    const [userAccounts, setUserAccounts] = useState([]);
    const [Amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [status] = useState("pending");

    const customerId = Cookies.get('customerId');
    console.log('Customer ID:', customerId);

    useEffect(() => {
        const fetchUserAccounts = async () => {
          try {
            //console.log('Fetching user accounts for customer ID:', customerId);
            const response = await api.get('/accounts');

            console.log('API Response:', response.data); // Log the raw response
      
            const data = Array.isArray(response.data) ? response.data : [];
            console.log('User Accounts:', data);
            setUserAccounts(data);
      
          } catch (error) {
            console.error('Error fetching savings accounts:', error);
            setUserAccounts([]); // Set as empty array on error to avoid null issues
          }
        };
      
        fetchUserAccounts();
      }, []);

      console.log('User Accounts:', userAccounts);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!duration || isNaN(parseInt(duration))) {
            alert("Please select a valid loan duration.");
            return;
        }
    
        const startDate = new Date();
        
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + parseInt(duration));

        const loanDetails = {
            selectedAccount,
            loanType,
            Amount,
            start_date: startDate.toISOString().split("T")[0],  
            end_date: endDate.toISOString().split("T")[0],
            status     
        };

        console.log("Loan details:", loanDetails);

        try {
            
            const response = await api.post("/employee_loans", loanDetails);
            // const response = await fetch("/api/employee-loans", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(loanDetails),
            // });

            if (response.status === 200) {
                console.log("Loan details added successfully");
            } else {
                console.error("Loan details adding failed");
            }
        } catch (error) {
            console.error("Error in Loan submission:", error);
        }
    };

    const handleReset = () => {
        setLoanType("");
        setSelectedAccount("");	
        setAmount("");
        setDescription("");
        setDuration("");
    };

    return (
        <div className="App2">
            <h1>Loan Application</h1>
            <fieldset>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <label style={{ color: '#5649e7', fontSize: '15px', fontWeight: 'bold', marginTop: '10px', marginBottom: '10px' }} htmlFor="selectAccount">Select an account</label>
                        <Autocomplete
                            options={userAccounts}
                            getOptionLabel={(option) => option.account_number}
                            value={userAccounts.find(account => account.account_number === selectedAccount) || null}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setSelectedAccount(newValue.account_number);
                                    console.log('Selected account:', newValue.account_number);
                                } else {
                                    setSelectedAccount('');
                                    console.log('No account selected');
                                }
                            }}
                            renderInput={(params) => {
                                console.log('Rendering Autocomplete with options:', userAccounts);
                                return <TextField {...params} label="Selected Account Number" />;
                            }}
                        />
                    </FormControl>
                    {/* <TextField
                        fullWidth
                        margin="normal"
                        label="Account Name"
                        value={selectedAccount}
                        disabled
                    /> */}
                    <br />
                    <label htmlFor="loanType" style={{ color: '#5649e7', fontSize: '15px', fontWeight: 'bold', marginTop: '10px', marginBottom: '10px' }}>Loan Type</label>
                    <select
                        name="loanType"
                        id="loanType"
                        value={loanType}
                        onChange={(e) => setLoanType(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select loan type</option>
                        <option value="personal">Personal</option>
                        <option value="business">Business</option>
                    </select>
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
                    <label htmlFor="add duration" style={{ color: '#5649e7', fontSize: '15px', fontWeight: 'bold', marginTop: '10px', marginBottom: '10px' }}>Duration</label>
                    <select
                        name="duration"
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    >
                        <option value="" disabled>Select duration</option>
                        <option value="6">6 months</option>
                        <option value="12">12 months (1 year)</option>
                        <option value="18">18 months</option>
                        <option value="24">24 months (2 years)</option>
                    </select>
                    <br />
                    <label htmlFor="description" style={{ color: '#5649e6', fontSize: '15px', fontWeight: 'bold', marginTop: '10px', marginBottom: '10px' }}>Reason</label>
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
                    <button type="reset" onClick={handleReset}>
                        Reset
                    </button>
                    <button type="submit">
                        Submit
                    </button>
                    <br />
                </form>
            </fieldset>
        </div>
    );
}

export default EmployeeLoans;