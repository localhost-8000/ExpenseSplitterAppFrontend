import { Button, Checkbox, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useState } from "react";
import "./editExpense.css";

const userList = [
    {
        name: "Rahul Tiwari",
        share: 0
    },
    {
        name: "Ankur",
        share: 0
    },
    {
        name: "Pramil",
        share: 0
    },
    {
        name: "Rohit",
        share: 0
    }
]

export default function EditExpense({ events, setAddExpense, setEvents }) {
    const [checked, setChecked] = useState(true);
    const [expenseName, setExpenseName] = useState("");
    const [userExpenses, setUserExpenses] = useState(userList);

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
            const uid = Date.now();
            let data = {
                expenseName: expenseName,
                id: uid,
                values: [...userExpenses]
            }
            const curr = events;
            curr.push(data);
            setEvents(curr);
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
                />
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
                                {userList.map(({name, share}, idx) => (
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
