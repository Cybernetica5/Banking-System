import React, { useState, useEffect } from "react";
import { FormControl, TextField, Autocomplete, Select, MenuItem, Button, Typography, InputLabel, TextareaAutosize, Card, Alert } from "@mui/material";
import Cookies from 'js-cookie';
import api from "../../../../services/api";

function EmployeeLoans() {
    const [loanType, setLoanType] = useState("");
    const [selectedAccount, setSelectedAccount] = useState("");
    const [userAccounts, setUserAccounts] = useState([]);
    const [amount, setAmount] = useState("");
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
            amount,
            start_date: startDate.toISOString().split("T")[0],
            end_date: endDate.toISOString().split("T")[0],
            status
        };

        try {
            const response = await api.post("/employee_loans", loanDetails);
            if (response.status === 200) {
                console.log("Loan details added successfully");
                alert("Loan application submitted successfully");
            } else {
                console.error("Loan details adding failed");
            }
        } catch (error) {
            console.error("Error in Loan submission:", error);
        }
        handleReset();
    };

    const handleReset = () => {
        setLoanType("");
        setSelectedAccount("");
        setAmount("");
        setDescription("");
        setDuration("");
    };

    return (
        <Card sx={{ maxWidth: '600px', margin: 'auto', padding: '20px', borderRadius: 4, marginTop: '20px'}}>
            <Typography variant="h6" gutterBottom>Loan Application</Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                    <Autocomplete
                        options={userAccounts}
                        getOptionLabel={(option) => option.account_number}
                        value={userAccounts.find(account => account.account_number === selectedAccount) || null}
                        onChange={(event, newValue) => {
                            if (newValue) {
                                setSelectedAccount(newValue.account_number);
                            } else {
                                setSelectedAccount('');
                            }
                        }}
                        renderInput={(params) => <TextField {...params} label="Selected Account Number" />}
                    />
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Loan Type</InputLabel>
                    <Select
                        value={loanType}
                        onChange={(e) => setLoanType(e.target.value)}
                        required
                    >
                        <MenuItem value="" disabled>Select loan type</MenuItem>
                        <MenuItem value="personal">Personal</MenuItem>
                        <MenuItem value="business">Business</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    margin="normal"
                    label="Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    required
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel>Duration</InputLabel>
                    <Select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    >
                        <MenuItem value="" disabled>Select duration</MenuItem>
                        <MenuItem value="6">6 months</MenuItem>
                        <MenuItem value="12">12 months (1 year)</MenuItem>
                        <MenuItem value="18">18 months</MenuItem>
                        <MenuItem value="24">24 months (2 years)</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Reason"
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Reason for loan"
                        required
                    />
                </FormControl>

                <Button variant="contained" color="primary" type="submit" style={{ marginRight: '10px' }}>Submit</Button>
                <Button variant="outlined" color="secondary" onClick={handleReset}>Reset</Button>
            </form>
        </Card>
    );
}

export default EmployeeLoans;
