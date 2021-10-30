import { Fab } from "@material-ui/core";
import { Add, AddCircle, Edit } from "@material-ui/icons";
import EditExpense from "../../components/editExpense/EditExpense";
import "./expenses.css";

export default function Expenses() {
    return (
        <div className="expenses-container">
            <div className="expenses-wrapper">
                <div className="expenses-left">
                    <div className="left-heading">
                        <h2>Add New Expense</h2>
                    </div>
                    <div className="left-content-box">
                        <div className="left-list">
                            <span className="list-item-name">Travel cost</span>
                            <span className="list-item-icon">
                                <Fab size="small" area-label="edit" id="edit-icon">
                                    <Edit style={{width: "20px", height: "20px"}}/>
                                </Fab>
                            </span>
                        </div>
                        <div className="left-list">
                            <span className="list-item-name">Food cost</span>
                            <span className="list-item-icon">
                                <Fab size="small" area-label="edit" id="edit-icon">
                                    <Edit style={{width: "20px", height: "20px"}}/>
                                </Fab>
                            </span>
                        </div>
                        <div className="left-list">
                            <Fab color="primary" area-label="add" size="medium">
                                <Add />
                            </Fab>
                        </div>
                    </div>
                </div>
                <div className="expenses-right">
                    <EditExpense />
                </div>
            </div>
        </div>
    )
}
