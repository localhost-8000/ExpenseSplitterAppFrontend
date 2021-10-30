import { Fab } from "@material-ui/core";
import { Add, AddCircle, Edit } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditExpense from "../../components/editExpense/EditExpense";
import axios from "axios";

import "./expenses.css";
import ViewTransaction from "../../components/viewTransaction/ViewTransaction";

export default function Expenses() {
    const [addExpense, setAddExpense] = useState(false);
    const { id: groupId } = useParams();
    const [groups, setGroups] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [viewTransaction, setViewTransaction] = useState(false);
    const [transactionData, setTransactionData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            axios({
                method: 'get',
                url: 'https://split-expense-server.herokuapp.com/group/' + groupId,
            })
            .then(result => {
                setGroups(result.data);
            })
            .catch(err => {
                alert(err.message);
            })
        }
        fetchData();
    }, [groupId])

    useEffect(() => {
        const fetchExpenseData = async () => {
            axios({
                method: 'get',
                url: 'https://split-expense-server.herokuapp.com/transaction/' + groupId
            })
            .then(result => {
                setTransactions(result.data);
            })
            .catch(err => {
                alert(err.message);
            })
        }
        fetchExpenseData();
    }, [addExpense]);

    const handleTransaction = (expense) => {
        setTransactionData(expense);
        setViewTransaction(true);
    }
    
    return (
        <div className="expenses-container">
            <div className="grp-name">
                <h2>{groups.name}</h2>
            </div>
            <div className="expenses-wrapper">
                <div className="expenses-left">
                    <div className="left-heading">
                        <h2>Add New Event</h2>
                    </div>
                    <div className="left-content-box">
                        
                        {transactions.map(expense => (
                            <div className="left-list" key={expense._id} onClick={() => handleTransaction(expense)}>
                                <span className="list-item-name">{expense.title}</span>
                            </div>
                        ))}
                        <div className="left-list list-add-btn">
                            <Fab color="primary" area-label="add" size="medium"  onClick={() => setAddExpense(true)}>
                                <Add />
                            </Fab>
                            <span className="list-add-name">Add new expense</span>
                        </div>
                        
                    </div>
                </div>
                <div className="expenses-right">
                    {addExpense && (<EditExpense setAddExpense={setAddExpense} groupData={groups}/>)}
                    {viewTransaction && (<ViewTransaction data={transactionData}/>)}
                </div>
            </div>
        </div>
    )
}
