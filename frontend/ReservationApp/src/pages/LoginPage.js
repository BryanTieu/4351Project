import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link } from 'react-router-dom';
import * as profilesAPI from '../api/signUp';

const LoginPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mailingAddress, setMailingAddress] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [billingChecked, setBillingChecked] = useState(false);
    const [signUp, setSignUp] = useState();
    const [profile, setProfile] = useState();


    const billingHandler = (event) => {
        setBillingChecked(event.target.checked);

        if (event.target.checked) {
            setBillingAddress(mailingAddress);
        }
        else {
            setBillingAddress('');
        }
    };

    const onSignUpClick = () => {
        setSignUp('true');
    }

    const OnSignUpForAccountHandler = () => {
        setProfile(
            {
                firstName: firstName,
                lastName: lastName,
                mailAddress: mailingAddress,
                billAddress: billingAddress,
                phoneNumber: phoneNumber,
                email: email,
                password: password
            }
        )
    }

    useEffect(() => {
        if (profile !== undefined) {
            profilesAPI.postData(profile);
        }
    }, [profile])



    const clear = () => {
        setSignUp(null);
    }

    return (
        <Container>
            <Box sx={{ padding: 10 }}>
                <Card sx={{ padding: 10 }}>
                    <div>
                        <Button onClick={clear}>Returning Customer</Button>
                        <Button onClick={onSignUpClick}>Sign Up</Button>
                    </div>
                    <Stack>
                        <TextField
                            id="Login-Email"
                            label="Email"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            margin="dense"
                        />

                        <TextField
                            id="Login-Password"
                            label="Password"
                            placeholder="Enter your Password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            margin="dense"
                        />

                        {!signUp &&
                            <div>
                                <Link to={{ pathname: "/Reservation", state: { id: profile?.id } }} style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" >
                                        Login!
                                    </Button>
                                </Link>
                                <Link to={{ pathname: "/Reservation" }} style={{ textDecoration: 'none' }}>
                                    <Button variant="outlined">
                                        Continue as Guest
                                    </Button>
                                </Link>
                            </div>
                        }
                    </Stack>

                    {signUp && (
                        <div>
                            <Stack>
                                <TextField
                                    id="Login-First-Name"
                                    label="First Name"
                                    placeholder="Enter your First Name "
                                    value={firstName}
                                    onChange={(e) => { setFirstName(e.target.value) }}
                                    margin="dense"
                                />

                                <TextField
                                    id="Login-Last-Name"
                                    label="Last Name"
                                    placeholder="Enter your Last Name "
                                    value={lastName}
                                    onChange={(e) => { setLastName(e.target.value) }}
                                    margin="dense"
                                />

                                <TextField
                                    id="Login-Phone-Number"
                                    label="Phone Number"
                                    placeholder="Enter your Phone Number "
                                    value={phoneNumber}
                                    onChange={(e) => { setPhoneNumber(e.target.value) }}
                                    margin="dense"
                                />
                                <TextField
                                    id="Confirmation-Mailing-Address"
                                    label="Mailing Address"
                                    placeholder="Enter your Mailing Address"
                                    value={mailingAddress}
                                    onChange={(e) => { setMailingAddress(e.target.value) }}
                                    margin="dense"
                                />

                                <TextField
                                    id="Confirmation-Billing-Address"
                                    label="Billing Address"
                                    placeholder="Enter your Billing Address"
                                    value={billingAddress}
                                    onChange={(e) => { setBillingAddress(e.target.value) }}
                                    margin="dense"
                                />

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={billingHandler}
                                            checked={billingChecked}
                                        />}
                                    label="Same as mailing address"
                                />

                                <div><Button variant="contained" onClick={OnSignUpForAccountHandler}>Sign Up!</Button></div>

                            </Stack>
                        </div>
                    )
                    }
                </Card>



            </Box>
        </Container>
    )
}
export default LoginPage;