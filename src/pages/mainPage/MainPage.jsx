import "./mainPage.css";
import {InputLabel, InputAdornment, FilledInput, FormControl, TextField, Button, IconButton } from "@material-ui/core"
import { DeleteOutline } from "@material-ui/icons"
import { useState } from "react";

function MainPage() {
    const [eventName, setEventName] = useState("");
    const [admin, setAdmin] = useState({});
    const [fields, setFields] = useState([{ nameValue: null, emailValue: null }])

    const handleAdminNameChange = e => {
        const curr = admin;
        curr.name = e.target.value;
        setAdmin(curr);
    }

    const handleAdminEmailChange = e => {
        const curr = admin;
        curr.email = e.target.value;
        setAdmin(curr);
    }
    const handleNameChange = (i, event) => {
        const values = [...fields];
        values[i].nameValue = event.target.value;
        setFields(values);
    }

    const handleEmailChange = (i, event) => {
        const values = [...fields];
        values[i].emailValue = event.target.value;
        setFields(values);
    }
    const handleAdd = () => {
        const values = [...fields];
        values.push({ nameValue: null, emailValue: null });
        setFields(values);
    }

    const handleRemove = i => {
        const values = [...fields];
        values.splice(i, 1);
        setFields(values);
    }

    return (
        <div className="main-container">
            <div className="main-container-wrapper">
                <div className="main-heading">
                    <h3>Create New Group</h3>
                </div>
                <div className="main-form-container">
                    <form action="" className="grp-form">
                        <TextField id="standard-basic" label="Event Name" className="event-name" variant="standard" value={eventName} onChange={e => setEventName(e.target.value)} />
                        <div className="participant-field">
                            <TextField id="standard-basic" label="Participant Name" variant="standard" className="first-field" onChange={handleAdminNameChange}/>
                            <TextField id="standard-basic" label="Participant Email" variant="standard" className="first-field" onChange={handleAdminEmailChange}/>
                        </div>
                    
                        {fields.map((field, idx) => {
                            return (
                                <div key={`${field}-${idx}`} className="participant-field">
                                    <TextField id="standard-basic" label="Participant Name" variant="standard" className="extra-field" onChange={e => handleNameChange(idx, e)}/>
                                    <TextField id="standard-basic" label="Participant Email" variant="standard" className="extra-field" onChange={e => handleEmailChange(idx, e)}/>
                                    <IconButton aria-label="delete" onClick={() => handleRemove(idx)} style={{marginBottom: "-12px", marginLeft: "-20px"}}>
                                        <DeleteOutline color="red"/>
                                    </IconButton>
                                </div>
                            );
                        })}

                        
                        <Button variant="outlined" id="form-add-btn" onClick={handleAdd}>Add more participants</Button>
                        <div className="form-btns">
                            <Button variant="cotained" id="submit-btn">Create group</Button>
                            <Button variant="outlined" id="cancel-btn">Cancel</Button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MainPage
