import "./mainPage.css";
import {InputLabel, InputAdornment, FilledInput, FormControl, TextField, Button, IconButton } from "@material-ui/core"
import { DeleteOutline } from "@material-ui/icons"
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function MainPage() {
    const history = useHistory();
    const [groupName, setGroupName] = useState("");
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        let temp = [{
            "name": admin.name,
            "email": admin.email
        }];
        fields.map(data => {
            temp.push({
                "name": data.name,
                "email": data.email
            });
        })
        let data = {
            "name": groupName,
            "people": temp
        }

        axios({
            method: 'post',
            data: data,
            url: "https://split-expense-server.herokuapp.com/group/new-group"
        }).then(result => {
            alert(result.data.message);
            console.log(result.data);
            history.push(`/expenses/${result.data.newGroup._id}`)
        })
        .catch(err => {
            alert(err.message);
        })
        
    }

    return (
        <div className="main-container">
            <div className="main-container-wrapper">
                <div className="main-heading">
                    <h3>Create New Group</h3>
                </div>
                <div className="main-form-container">
                    <form className="grp-form" onSubmit={(e) => handleSubmit(e)}>
                        <TextField id="standard-basic" label="Event Name" className="event-name" variant="standard" value={groupName} onChange={e => setGroupName(e.target.value)} required/>
                        <div className="participant-field">
                            <TextField id="standard-basic" label="Participant Name" variant="standard" className="first-field" onChange={handleAdminNameChange} required/>
                            <TextField id="standard-basic" label="Participant Email" variant="standard" className="first-field" onChange={handleAdminEmailChange} type="email" required/>
                        </div>
                    
                        {fields.map((field, idx) => {
                            return (
                                <div key={`${field}-${idx}`} className="participant-field">
                                    <TextField id="standard-basic" label="Participant Name" variant="standard" className="extra-field" onChange={e => handleNameChange(idx, e)} required/>
                                    <TextField id="standard-basic" label="Participant Email" variant="standard" className="extra-field" onChange={e => handleEmailChange(idx, e)} type="email" required/>
                                    <IconButton aria-label="delete" onClick={() => handleRemove(idx)} style={{marginBottom: "-12px", marginLeft: "-20px"}}>
                                        <DeleteOutline color="red"/>
                                    </IconButton>
                                </div>
                            );
                        })}

                        
                        <Button variant="outlined" id="form-add-btn" onClick={handleAdd}>Add more participants</Button>
                        <div className="form-btns">
                            <Button variant="cotained" id="submit-btn" type="submit">Create group</Button>
                            <Button variant="outlined" id="cancel-btn">Cancel</Button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MainPage
