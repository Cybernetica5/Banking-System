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
    const [BranchName, setBranchName] = useState("");
    const [beneficiaryAccount, setBeneficiaryAccount] = useState("");
    const [beneficiaryEmail, setBeneficiaryEmail] = useState("");
    const [transferAmount, setTransferAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        const transferDetails = {
            selectedAccount,
            beneficiaryName,
          //  bankName,
         //   branchName,
            beneficiaryAccount,
            beneficiaryEmail,
            transferAmount,
            paymentMethod,
            description,
        };
        // Add your form submission logic here
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
            // Handle success, show a success message to the user, etc.
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
        setPaymentMethod("");
        setDescription("");
        setBeneficiaryName("");
        setBeneficiaryEmail("");
        setBankName("");
        setBranchName("");
    };  

    return (
        <div className="App1">
            <h1>Money Transfer</h1>
            <h2>Other Bank Accounts</h2>
            <fieldset>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="selectAccount">Payment To</label>
                    <br />

                    <input Beneficiary Name
                        name="selectAccount"
                        id="selectAccount"
                        value={selectedAccount}
                        onChange={(e) => setSelectedAccount(e.target.value)}
                        placeholder="Account Number"
                        required
                    />


                    <label htmlFor="beneficiaryAccount">Beneficiary Details</label>
    
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
                     <br />
                      <input
                        name="beneficiaryEmail"
                        id="beneficiaryEmail"
                        value={beneficiaryEmail}
                        onChange={(e) => setBeneficiaryEmail(e.target.value)}
                        placeholder="Beneficiary Email"
                        required
                     />   
                     <br />
                    <label htmlFor="beneficiaryAccount">Beneficiary Bank Details</label>
    
                        <input type="text"  name="bank name" value="Seychelles Trust Bank"></input>
                        <br />
                        <br />
                        <input
                            name="branchName"
                            id="branchName"
                            value={BranchName}
                            onChange={(e) => setBranchName(e.target.value)}
                            placeholder="Branch Name"
                            required
                        />   

                    <label htmlFor="paymentMethod">Payment Details</label>
                    <select
                        name="paymentMethod"
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="" disabled>Select the method</option>
                        <option value="online">Online</option>
                        <option value="scheduled">Schedule Periodically</option>
                        <option value="onetime">Schedule Onetime</option>
                    </select>
                    
                    
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

                    <label htmlFor="description">Description Details</label>
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
