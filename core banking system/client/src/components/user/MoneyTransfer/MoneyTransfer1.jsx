// Filename - MoneyTransfer.jsx
// It contains the Form, its Structure
// and Basic Form Functionalities

import { OutlinedInput } from "@mui/material";
import "./MoneyTransfer1.css";   
import React, { useState } from "react";
//import { Input, Page, setOptions } from '@mobiscroll/react';


function MoneyTransfer1() {
    const [selectedAccount, setSelectedAccount] = useState("");
    const [beneficiaryName, setBeneficiaryName] = useState("");
    const [BankName, setBankName] = useState("Seychells Trust Bank");
    const [beneficiaryAccount, setBeneficiaryAccount] = useState("");
    const [transferAmount, setTransferAmount] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async(e) => {
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
        <div className="App1">
            <h1>Money Transfer</h1>
            <fieldset>
                <form onSubmit={handleSubmit}>
                    <label style={{ color: '#5649e7', fontSize: '15px', fontWeight: 'bold', marginTop: '10px', marginBottom: '10px' }}htmlFor="selectAccount">Payment To</label>
                    <br />

                    <input Beneficiary Name
                        name="selectAccount"
                        id="selectAccount"
                        value={selectedAccount}
                        onChange={(e) => setSelectedAccount(e.target.value)}
                        placeholder="Account Number"
                        required
                    />


<label style={{ color: '#5649e7', fontSize: '15px', fontWeight: 'bold', marginTop: '10px', marginBottom: '10px' }} htmlFor="beneficiaryAccount">Beneficiary Details</label>
    
                    <input Beneficiary Name
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
                     
                    <label style={{ color: '#5649e7', fontSize: '15px', fontWeight: 'bold', marginTop: '10px', marginBottom: '10px' }} htmlFor="beneficiaryAccount">Beneficiary Bank Details</label>
    
                        <input type="text"  name="bank name" value="Seychelles Trust Bank"></input>
                        <br />
                        <br />
                       
                    <label style={{ color: '#5649e7', fontSize: '15px', fontWeight: 'bold', marginTop: '10px', marginBottom: '10px' }} htmlFor="paymentMethod">Payment Details</label>
                    
                    
                    
                      <input type="text"  name="currency" value="LKR"></input>
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

                    <label style={{ color: '#5649e6', fontSize: '15px', fontWeight: 'bold', marginTop: '10px', marginBottom: '10px' }}htmlFor="description">Description Details</label>
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

export default MoneyTransfer1;
