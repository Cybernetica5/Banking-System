import React, { useState, useEffect } from "react";
import { Card, Typography, TextField, Autocomplete, FormControl, Button, Grid, Box } from "@mui/material";
import Cookies from 'js-cookie';
import api from '../../../services/api';
import './MoneyTransfer1.css';

function MoneyTransfer1() {
    const [selectedAccount, setSelectedAccount] = useState("");
    const [userAccounts, setUserAccounts] = useState([]);
    const [beneficiaryName, setBeneficiaryName] = useState("");
    const [bankName, setBankName] = useState("Seychells Trust Bank");
    const [beneficiaryAccount, setBeneficiaryAccount] = useState("");
    const [transferAmount, setTransferAmount] = useState("");
    const [description, setDescription] = useState("");
    const [transferDetails, setTransferDetails] = useState(null);

    const customerId = Cookies.get('customerId');

    useEffect(() => {
        const submitTransfer = async () => {
            if (transferDetails) {
                try {
                    const response = await api.post("/money_transfer", transferDetails);
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
    }, [transferDetails]);

    useEffect(() => {
        const fetchUserAccounts = async () => {
          try {
            const response = await api.get('/user_accounts', { params: { customerId } });
            const data = Array.isArray(response.data) ? response.data : [];
            setUserAccounts(data);
          } catch (error) {
            console.error('Error fetching accounts:', error);
            setUserAccounts([]);
          }
        };

        fetchUserAccounts();
    }, []);

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
        setBankName("Seychells Trust Bank");
    };

    return (
        <Box p={3}>
            <Card className="shadow" sx={{ p: 3, maxWidth: 600, margin: "0 auto" }}>
                <Typography variant="h4" color="primary" gutterBottom>
                    Money Transfer
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Autocomplete
                                options={userAccounts}
                                getOptionLabel={(option) => option.account_number}
                                value={userAccounts.find(account => account.account_number === selectedAccount) || null}
                                onChange={(event, newValue) => {
                                    setSelectedAccount(newValue ? newValue.account_number : '');
                                }}
                                renderInput={(params) => (
                                    <TextField 
                                        {...params} 
                                        label="Select Account" 
                                        fullWidth 
                                        required 
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Beneficiary Name"
                                value={beneficiaryName}
                                onChange={(e) => setBeneficiaryName(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Beneficiary Account"
                                value={beneficiaryAccount}
                                onChange={(e) => setBeneficiaryAccount(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Beneficiary Bank"
                                value={bankName}
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Currency"
                                value="SCR"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="number"
                                label="Transfer Amount"
                                value={transferAmount}
                                onChange={(e) => setTransferAmount(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                multiline
                                rows={4}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                onClick={handleReset}
                            >
                                Reset
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button className="button"
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Box>
    );
}

export default MoneyTransfer1;
