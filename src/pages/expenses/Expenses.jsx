import { Fab } from "@material-ui/core";
import { Add, AddCircle, Edit } from "@material-ui/icons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import EditExpense from "../../components/editExpense/EditExpense";
import "./expenses.css";

export default function Expenses({isValid}) {
    const [events, setEvents] = useState([]);
    const [addExpense, setAddExpense] = useState(false);
    const { id: groupId } = useParams();

    return (
        <div className="expenses-container">
            <div className="expenses-wrapper">
                <div className="expenses-left">
                    <div className="left-heading">
                        <h2>Add New Event</h2>
                    </div>
                    <div className="left-content-box">
                        
                        {events.map(event => (
                            <div className="left-list" key={event.id}>
                                <span className="list-item-name">{event.expenseName}</span>
                                <span className="list-item-icon">
                                    <Fab size="small" area-label="edit" id="edit-icon">
                                        <Edit style={{width: "20px", height: "20px"}}/>
                                    </Fab>
                                </span>
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
                    {addExpense && (<EditExpense setAddExpense={setAddExpense} events={events} setEvents={setEvents}/>)}
                </div>
            </div>
        </div>
    )
}
