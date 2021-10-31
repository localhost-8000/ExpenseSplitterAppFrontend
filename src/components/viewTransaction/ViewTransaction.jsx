import "./viewTransaction.css";
import MaterialTable from "material-table";
import { Button } from '@material-ui/core'
import { forwardRef } from "react";
import axios from "axios"
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default function ViewTransaction({ data }) {
    const balanceData = data.individualBalance.map(d => {
        return {
            name: d.name,
            balance: Math.floor(d.balance)
        }
    })

    const handleSettle = (how, name1, name2, money) =>{
        const obj = {
            how,
            name1,
            name2,
            money : Number(money)
        }

        console.log(obj)


        axios({
            method: 'post',
            url: 'https://split-expense-server.herokuapp.com/transaction/settle/' + data._id,
            headers: {
                'Content-Type': 'application/json'
            },
            data: obj
        })
            .then(result => {
                alert(`Balance settled between ${name1} and ${name2}`)
                window.location.reload();
            })
            .catch(err => {
                alert(err.message);
            })

    }


    return (
        <div className="transaction-container">

            <div className="transaction-table">
                <MaterialTable
                    icons={tableIcons}
                    columns={[
                        { title: 'Participant Name', field: 'name' },
                        { title: 'Balance', field: 'balance', type: 'numeric' }
                    ]}
                    data={balanceData}
                    title="Individual Balance"
                    options={{
                        exportButton: true
                    }}
                />
            </div>
            <div className="settle-table">
                <MaterialTable
                    icons={tableIcons}
                    columns={[
                        { title: 'How to settle', field: 'how' },
                        {
                            title: 'Settle', field: '', render: rowData =>
                                <Button
                                    onClick={() => handleSettle(rowData.how, rowData.name1, rowData.name2, rowData.money)}
                                    color="success" variant="contained" disabled={rowData.settled}>
                                    Settle
                                </Button>
                        }
                    ]}
                    data={data.howToSettle}
                    title="How to Settle"
                    options={{
                        exportButton: true
                    }}
                />
            </div>
        </div>
    );
}
