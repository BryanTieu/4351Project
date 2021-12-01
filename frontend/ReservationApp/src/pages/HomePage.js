import Card from "../components/Card";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import * as profilesAPI from '../api/testGet';
import { useEffect } from "react";


const HomePage = ({ id }) => {

    const get = () => {
        console.log(profilesAPI.getAll());
    }

    
    return (
        <Card>
            <div> <h1> Welcome to Group 2's WebApp </h1> </div>

            <div>  <p>  Bryan Tieu | Jorge Ngimbi | Kenneth Easo </p> </div>

            <Link to="/Login" style={{ textDecoration: 'none' }}>
                <Button variant="contained">Make A Reservation!</Button>
            </Link>

            <Button onClick={get}>fetch</Button>
        </Card>


    );
}

export default HomePage;