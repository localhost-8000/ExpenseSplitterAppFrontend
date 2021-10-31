import React from 'react'
import { Fab, Button } from "@material-ui/core";
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import './allgroups.css'
import axios from 'axios';


function AllGroups() {

    const [allGroups,setAllGroups] = useState([])

    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://split-expense-server.herokuapp.com/group/',
        })
            .then(result => {
                setAllGroups(result.data)
                console.log(allGroups)
            })
            .catch(err => {
                alert(err.message);
            })
    }, [])

    return (
        <div>
            <div className="main">
                <h2>All Groups</h2>

                {
                    allGroups.map((group) => {
                        let linkTo = "/expenses/" + group._id
                        return (
                            <div className="link">
                                <Link className="pointer" to={linkTo} style={{ textDecoration: 'none', fontSize: '18px', color: 'black' }}>
                                    {group.name}
                                </Link>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default AllGroups
