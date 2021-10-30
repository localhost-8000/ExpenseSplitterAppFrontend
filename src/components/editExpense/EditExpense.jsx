import { Checkbox, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { useState } from "react";
import "./editExpense.css";

const userList = ["Rahul Tiwari", "Ankur", "Pramil", "Rohit"]

export default function EditExpense() {
    const [checked, setChecked] = useState(true);
    return (
        <div className="edit-expense-container">
            <div className="edit-heading">
                <h3>Edit expense</h3>
            </div>
            <div className="edit-content">
                <div className="top-bar">
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
                                    <TableCell>Participant Name</TableCell>
                                    {!checked && (
                                        <TableCell align="right">Share in split (%)</TableCell>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userList.map((user, idx) => (
                                    <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {user}
                                        </TableCell>
                                        {!checked && (
                                            <TableCell align="right">
                                                <Input type="number"/>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}
