import Login from "./Login";
import { Route } from 'react-router-dom';

const PrimaryRoutes = () => {
    return (
        <Route exact path="/login">
            <Login />
        </Route>
    )
}