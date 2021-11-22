import Card from "../components/Card";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const HomePage = (props) => {

    return (
        <Card>
            <div> <h1> Welcome to Group 2's WebApp </h1> </div>

            <div>  <p>  Bryan Tieu | Jorge Ngimbi | Kenneth Easo </p> </div>

            <Link to="/Login" style={{textDecoration: 'none'}}>
                <Button variant="contained">Make A Reservation!</Button>
            </Link>
        </Card>
    );
}

export default HomePage;