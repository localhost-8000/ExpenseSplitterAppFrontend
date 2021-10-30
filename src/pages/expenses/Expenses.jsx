import { Fab } from "@material-ui/core";
import { Add, AddCircle, Edit } from "@material-ui/icons";
import { useState } from "react";
import EditExpense from "../../components/editExpense/EditExpense";
import "./expenses.css";

export default function Expenses() {
    const [events, setEvents] = useState([]);
    

    return (
        <div className="expenses-container">
            <div className="expenses-wrapper">
                <div className="expenses-left">
                    <div className="left-heading">
                        <h2>Add New Event</h2>
                    </div>
                    <div className="left-content-box">
                        
                        {events.length === 0 
                        ? (
                            <div className="left-list list-add-btn">
                                <Fab color="primary" area-label="add" size="medium">
                                    <Add />
                                </Fab>
                                <span className="list-add-name">Add new expense</span>
                            </div>
                        ) : (
                            <div className="left-list">
                                <span className="list-item-name">Travel cost</span>
                                <span className="list-item-icon">
                                    <Fab size="small" area-label="edit" id="edit-icon">
                                        <Edit style={{width: "20px", height: "20px"}}/>
                                    </Fab>
                                </span>
                            </div>
                        )}
                        
                    </div>
                </div>
                <div className="expenses-right">
                    <EditExpense />
                </div>
            </div>
        </div>
    )
}
