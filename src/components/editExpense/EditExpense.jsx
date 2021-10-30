import { Button, Checkbox, Input, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useState } from "react";
import axios from "axios";
import "./editExpense.css";


export default function EditExpense({ setAddExpense, groupData }) {
    const userList = groupData.people.map(user => {
        return {
            "name": user.name,
            "share": 0
        }
    });

    const [checked, setChecked] = useState(true);
    const [expenseName, setExpenseName] = useState("");
    const [userExpenses, setUserExpenses] = useState(userList);
    const [amount, setAmount] = useState(null);
    const [paidBy, setPaidBy] = useState(0);

    const handleShareChange = (event, idx) => {
        const values = [...userExpenses];
        values[idx].share = event.target.value;
        userList[idx].share = event.target.value;
        setUserExpenses(values);
    }

    const handleSubmit = () => {
        let sum = 0;
        userExpenses.map(({name, share}) => {
            sum += share;
        });
        if(!checked && sum !== 100) {
            alert("Sum of share is not 100%");
        } else {
            let data = {
                title: expenseName,
                groupId: groupData._id,
                whoPaid: userList[paidBy].name,
                price: amount,
                category: "",
                splitEqual: checked,
            }
            if(!checked) {
                data.split = [...userExpenses]
            }
            axios({
                method: 'post',
                url: 'https://split-expense-server.herokuapp.com/transaction/new-transaction',
                data: data
            }).then(result => {
                alert(result.data.message);
                const newTransaction = result.data.newTransaction;
                console.log(result.data);
            })
            .catch(err => {
                alert(err.message);
            })
        }
        setAddExpense(false);

    }

    return (
        <div className="edit-expense-container">
            <div className="edit-heading">
                <TextField 
                    id="standard-basic" 
                    variant="standard" 
                    label="Expense Name"
                    value={expenseName}
                    onChange={e => setExpenseName(e.target.value)}
                    style={{margin: "5px 0"}}
                    required
                />
                <TextField 
                    id="standard-basic"
                    variant="standard"
                    label="Total Amount (Rs.)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{margin: "5px 0"}}
                    required
                    type="number"
                />
                <InputLabel id="paidby">Paid By</InputLabel>
                <Select labelId="paidby" label="Paid By" value={paidBy} onChange={e => setPaidBy(e.target.value)} style={{margin: "5px 0"}}>
                    {userList.map((user, idx) => (
                        <MenuItem value={idx} key={idx}>{user.name}</MenuItem>
                    ))}
                </Select>
            </div>
            <div className="edit-content">
                <div className="top-bar">
                    <span>Split Equally</span>
                    <Checkbox 
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                        color="primary"
                        inputProps={{'aria-label': 'controlled'}}
                    />
                </div>
                <div className="user-list">
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontWeight: "bold"}}>Participant Name</TableCell>
                                    {!checked && (
                                        <TableCell align="right" style={{fontWeight: "bold"}}>Share in split (%)</TableCell>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userExpenses.map(({name, share}, idx) => (
                                    <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {name}
                                        </TableCell>
                                        {!checked && (
                                            <TableCell align="right">
                                                <input type="number" name="" id="" className="split-input" value={share} onChange={event => handleShareChange(event, idx)}/>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="edit-btns">
                    <div className="edit-submit-btns">
                        <Button variant="contained" color="primary" onClick={handleSubmit}>Create</Button>
                        <Button variant="text" color="primary" style={{marginLeft: "8px"}} onClick={() => setAddExpense(false)}>Cancel</Button>
                    </div>
                    <div className="edit-right-btn">
                        <Button variant="contained" style={{backgroundColor: "#D62F2F", color: "white"}} color="error" startIcon={<Delete />}>Delete</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
