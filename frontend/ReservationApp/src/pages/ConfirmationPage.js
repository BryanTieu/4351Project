import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import * as profilesAPI from '../api/signUp';

const ConfirmationPage = (props) => {

    const [cardNumber, setCardNumber] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [mailingAddress, setMailingAddress] = useState();
    const [billingAddress, setBillingAddress] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUpChecked, setSignUpChecked] = useState(false);
    const [billingChecked, setBillingChecked] = useState(false);
    const [profile, setProfile] = useState();
    const [confirm, setConfirm] = useState(false);
    const [signUpOption, setSignUpOption] = useState('false');

    const reservationDetails = {
        numberOfGuests: '8',
        time: '3:00PM',
        date: '4/2/2021'
    }

    const signUpHandler = (event) => {
        if (signUpOption === 'false') {
            setSignUpOption('true');
        }
        else if (signUpOption === 'true') {
            setSignUpOption('false')
        }

        setSignUpChecked(event.target.checked);
    };

    const billingHandler = (event) => {
        setBillingChecked(event.target.checked);

        if (billingChecked) {
            setBillingAddress(mailingAddress);
        }
    };

    const buttonContinueHandler = () => {
        setConfirm(true);

        setProfile(
            {
                firstName: firstName,
                password: password,
                lastName: lastName,
                mailingAddress: mailingAddress,
                billingAddress: billingAddress,
                phone: phoneNumber,
                email: email
            }
        )
    }

    useEffect(() => {
        if (profile !== undefined) {
            profilesAPI.postData(profile);
        }
    }, [profile])

    const SignUpForAccountHandler = () => {
        
    }



    return (
        <div>
            <Box sx={{ padding: 10 }}>
                <Card sx={{ padding: 5 }}>
                    <h1>Reservation Details</h1>
                    <h2>Date: {reservationDetails.date} </h2>
                    <h2>Time: {reservationDetails.time} </h2>
                    <h2>Number of Guests: {reservationDetails.numberOfGuests} </h2>
                </Card>
            </Box>
            <Box sx={{ padding: 10 }}>
                {!confirm &&
                    <Card sx={{ padding: 5 }}>
                        <h1>This information is required to make your reservation.</h1>

                        <Stack spacing={2}>
                           

                            <TextField
                                id="Confirmation-Email"
                                label="Email"
                                placeholder="Enter your Email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />

                            <TextField
                                id="Confirmation-Phone-Number"
                                label="Phone Number"
                                placeholder="Enter your Phone Number"
                                value={phoneNumber}
                                onChange={(e) => { setPhoneNumber(e.target.value) }}
                            />

                            <TextField
                                id="Confirmation-First-Name"
                                label="First Name"
                                placeholder="Enter your First Name"
                                value={firstName}
                                onChange={(e) => { setFirstName(e.target.value) }}
                            />

                            <TextField
                                id="Confirmation-Last-Name"
                                label="Last Name"
                                placeholder="Enter your Last Name"
                                value={lastName}
                                onChange={(e) => { setLastName(e.target.value) }}
                            />
                            {
                                !signUpChecked &&
                                <Button px={{ padding: 10 }} variant="contained" onClick={buttonContinueHandler}>Continue</Button>

                            }

                            {
                                signUpChecked &&
                                <Stack spacing={2}>
                                    <TextField
                                        id="Confirmation-Mailing-Address"
                                        label="Mailing Address"
                                        placeholder="Enter your Mailing Address"
                                        value={mailingAddress}
                                        onChange={(e) => { setMailingAddress(e.target.value) }}
                                    />
                                    <div>
                                        <TextField
                                            id="Confirmation-Billing-Address"
                                            label="Billing Address"
                                            placeholder="Enter your Billing Address"
                                            value={billingAddress}
                                            onChange={(e) => { setBillingAddress(e.target.value) }}
                                        />

                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    onChange={billingHandler}
                                                    checked={billingChecked}
                                                />}
                                            label="Same as mailing address"
                                        />
                                    </div>
                                </Stack>
                            }

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={signUpHandler}
                                        checked={signUpChecked}
                                    />}
                                label="Sign up for account"
                            />

                            {signUpChecked &&
                                <Stack>
                                    <TextField
                                        id="Confirmation-Password"
                                        label="Password"
                                        placeholder="Enter your Password"
                                        value={password}
                                        margin='dense'
                                        onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                    <Button px={{ padding: 10 }} variant="contained" onClick={SignUpForAccountHandler}>Sign Up and Confirm Reservation!</Button>
                                </Stack>
                            }

                        </Stack>


                    </Card>
                }
            </Box>

            {
                confirm &&
                <Box px={{ padding: 10 }}>
                    <Card px={{ padding: 10 }}>
                        {JSON.stringify(profile)}
                    </Card>
                </Box>
            }

        </div>
    );
}

export default ConfirmationPage;