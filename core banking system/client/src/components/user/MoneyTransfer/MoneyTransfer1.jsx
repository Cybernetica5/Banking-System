import { TextField, Button, Typography, Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import "./MoneyTransfer1.css";

function MoneyTransfer1() {
  const [selectedAccount, setSelectedAccount] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [bankName, setBankName] = useState("Seychelles Trust Bank");
  const [beneficiaryAccount, setBeneficiaryAccount] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transferDetails = {
      selectedAccount,
      beneficiaryAccount,
      transferAmount,
      description,
    };
    try {
      const response = await fetch("/api/money-transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transferDetails),
      });

      if (response.ok) {
        console.log("Money transfer successful");
      } else {
        console.error("Money transfer failed");
      }
    } catch (error) {
      console.error("Error during transfer:", error);
    }
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
    <Card style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Money Transfer
        </Typography>

        <form onSubmit={handleSubmit}>

          <TextField
            label="Account Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            required
          />

          <TextField
            label="Beneficiary Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={beneficiaryName}
            onChange={(e) => setBeneficiaryName(e.target.value)}
            required
          />
          <TextField
            label="To Account"
            variant="outlined"
            fullWidth
            margin="normal"
            value={beneficiaryAccount}
            onChange={(e) => setBeneficiaryAccount(e.target.value)}
            required
          />

          <TextField
            label="Bank Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={bankName}
            InputProps={{
              readOnly: true,
            }}
          />

          <TextField
            label="Currency"
            variant="outlined"
            fullWidth
            margin="normal"
            value="$"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Transfer Amount"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{
                height: '56px', 
                '& input': { 
                  height: '56px',
                  fontSize: '16px'
                  }
                }}
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
            required
          />

          <TextField
            label="Enter Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          {/* Action Buttons */}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleReset}
            style={{ marginRight: '10px', marginTop: '20px' }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: '20px' }}
          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default MoneyTransfer1;
