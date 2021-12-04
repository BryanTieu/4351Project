import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link } from 'react-router-dom';
import * as profilesAPI from '../api/axios';

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
    const [message, setMessage] = useState();


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

    const OnSignUpForAccountHandler = async (e) => {
       
        e.preventDefault()
       
        setProfile(
            {
                firstName:firstName,
                lastName,
                mailAddress:mailingAddress,
                billAdress:billingAddress,
                phoneNumber,
                email,
                password
            }
            )
            
            
            const response = await profilesAPI.postData(profile,'registration');

            if(response.type == 'error'){

                setMessage({type:response.type,text:response.message});
               
            }else{
                setMessage({type:response.type,text:'You can login now'});

            }

            
            console.log(response)
            
    }
        
    const OnLoginHandler = async (e) => {

        e.preventDefault()

            setProfile({
                email,
                password

            })

            // console.log(profile)
         
        const response = await profilesAPI.postData(profile,'login');

        if(response.type == 'error'){

            setMessage({type:response.type,text:response.message});
           
        }else{
            setMessage({type:response.type,text:'Logged in'});

        }

        
        console.log(response)
       



    }
     

  


    const clear = () => {
        setSignUp(null);
    }

    return (
        <Container>

            
            <Box sx={{ padding: 10 }}>
                <Card sx={{ padding: 10 }}>


                {message && 
                
                <Alert severity={message.type}>
                         <AlertTitle>{message.type}</AlertTitle>
                                {message.text}
                </Alert>}


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
                                    <Button variant="contained" onClick={OnLoginHandler}>
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

                                <div>
                                    <Link to={{ pathname: "/Reservation", state: { id: profile } }}>
                                        <Button variant="contained" onClick={OnSignUpForAccountHandler}>Sign Up!</Button>
                                    </Link>
                                </div>

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