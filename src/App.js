import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Expenses from "./pages/expenses/Expenses";
import MainPage from "./pages/mainPage/MainPage";
import "./global.css"

function App() {
    return (

        <Router>
            <Switch>
                <Route exact path="/">
                    <MainPage />
                </Route>

                <Route path="/expenses/:id">
                    <Expenses />
                </Route>                
            </Switch>
        </Router>

    );
}

export default App;
