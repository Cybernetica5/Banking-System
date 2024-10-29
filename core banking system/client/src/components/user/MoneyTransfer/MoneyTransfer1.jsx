// import "./MoneyTransfer1.css";   
import React, { useState, useEffect } from "react";
import { FormControl, TextField, Autocomplete } from "@mui/material";
import Cookies from 'js-cookie';
import api from '../../../services/api';

function MoneyTransfer1() {
    const [selectedAccount, setSelectedAccount] = useState("");
    const [userAccounts, setUserAccounts] = useState([]);
    const [beneficiaryName, setBeneficiaryName] = useState("");
    const [BankName, setBankName] = useState("Seychells Trust Bank");
    const [beneficiaryAccount, setBeneficiaryAccount] = useState("");
    const [transferAmount, setTransferAmount] = useState("");
    const [description, setDescription] = useState("");
    const [transferDetails, setTransferDetails] = useState(null);

    const customerId = Cookies.get('customerId');
    console.log('Customer ID:', customerId);

    useEffect(() => {
        const submitTransfer = async () => {
            if (transferDetails) {
                try {
                    const response = await api.post("/money_transfer", transferDetails); // Using api.post
                    if (response.status === 200) {
                        console.log("Money transfer successful");
                    } else {
                        console.error("Money transfer failed");
                    }
                } catch (error) {
                    console.error("Error during transfer:", error);
                }
            }
        };

        submitTransfer();
    }, [transferDetails]); // Runs whenever transferDetails changes

    useEffect(() => {
        const fetchUserAccounts = async () => {
          try {
            console.log('Fetching user accounts for customer ID:', customerId);
            const response = await api.get('/user_accounts',{params:{customerId}});

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setTransferDetails({
            selectedAccount,
            beneficiaryAccount,
            transferAmount,
            description,
        });
    };

    const handleReset = () => {
        setSelectedAccount("");
        setBeneficiaryAccount("");
        setTransferAmount("");
        setDescription("");
        setBeneficiaryName("");
        setBankName("");
    };  

    return (
        <div className="App1">
            <h1>Money Transfer</h1>
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
                    <label style={{ color: '#5649e7', fontSize: '15px', fontWeight: 'bold', marginTop: '10px', marginBottom: '10px' }} htmlFor="beneficiaryName">Beneficiary Details</label>
                    <input
                        name="beneficiaryName"
                        id="beneficiaryName"
                        value={beneficiaryName}
                        onChange={(e) => setBeneficiaryName(e.target.value)}
                        placeholder="Beneficiary name"
                        required
                    />
                    <br />
                    <br />
                    <input
                        name="beneficiaryAccount"
                        id="beneficiaryAccount"
                        value={beneficiaryAccount}
                        onChange={(e) => setBeneficiaryAccount(e.target.value)}
                        placeholder="To Account"
                        required
                    />   
                    <br />
                    <label style={{ color: '#5649e7', fontSize: '15px', fontWeight: 'bold', marginTop: '10px', marginBottom: '10px' }} htmlFor="bankName">Beneficiary Bank Details</label>
                    <input type="text" name="bankName" value={BankName} readOnly />
                    <br />
                    <br />
                    <label style={{ color: '#5649e7', fontSize: '15px', fontWeight: 'bold', marginTop: '10px', marginBottom: '10px' }} htmlFor="currency">Payment Details</label>
                    <input type="text" name="currency" value="SCR" readOnly />
                    <br />
                    <br />
                    <input
                        type="number"
                        name="transferAmount"
                        id="transferAmount"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        placeholder="Transfer Amount"
                        required
                    />
                    <label style={{ color: '#5649e6', fontSize: '15px', fontWeight: 'bold', marginTop: '10px', marginBottom: '10px' }} htmlFor="description">Description Details</label>
                    <textarea
                        name="description"
                        id="description"
                        cols="30"
                        rows="10"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter Description"
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
                    >
                        Submit
                    </button>
                    <br />
                </form>
            </fieldset>
        </div>
    );
}

export default MoneyTransfer1;