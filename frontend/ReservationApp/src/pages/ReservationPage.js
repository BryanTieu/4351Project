import { useState, useEffect } from 'react';
import data from "./mock.json";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import TimePicker from '@mui/lab/TimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import * as reservationAPI from '../api/axios';
const ReservationPage = () => {

    const [cardNumber, setCardNumber] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const [guestNumber, setGuestNumber] = useState(0);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [available, setAvailable] = useState();
    const [reservationDetails, setReservationDetails] = useState();
    const [isDisabled, setIsDisabled] = useState(true);
    const [isHighTrafficDay, setIsHighTrafficDay] = useState(false);

    const serverResponseForAvailability = 'true'

    const availabilityHandler = () => {
        if (serverResponseForAvailability === 'false') {
            setAvailable(false)
        }

        else if (serverResponseForAvailability === 'true') {
            setAvailable(true);
        }

        setReservationDetails({
            date: date,
            numberOfGuests: guestNumber
        })
        const htd = (date.getMonth() + 1).toString() + ' ' + date.getDate().toString();
        // console.log(highTrafficDays.indexOf(htd));
        if (highTrafficDays.indexOf(htd) > 0) {
            setIsHighTrafficDay(true);
        }
        else {
            setIsHighTrafficDay(false);
        }
        //  console.log(htd);
    }

    const highTrafficButtonHandler = () => {

    }

    useEffect(() => {
        // console.log(reservationDetails);
        if (reservationDetails !== undefined) {
            reservationAPI.postData(reservationDetails);
            // reservationAPI.po
        }
    }, [reservationDetails])

    const highTrafficDays = [
        "1 1",
        "2 28",
        "3 14",
        "7 4",
        "10 31",
        "12 25",
        "12 31",
        "11 11"
    ];

    return (
        <div>
            <Link to="/Login" style={{ textDecoration: 'none' }}><Button>Back</Button></Link>
            <Box sx={{ padding: 10 }}>
                <Card sx={{ padding: 10 }}>
                    <Stack spacing={2}>

                        <LocalizationProvider dateAdapter={AdapterDateFns} >

                            <DesktopDatePicker
                                label="Select Date"
                                inputFormat="MM/dd/yyyy"
                                value={date}
                                onChange={(e) => { setDate(e) }}
                                renderInput={(params) => <TextField {...params} />}
                                sx={{ padding: 10 }}
                            />


                            <TimePicker
                                label="Time"
                                value={time}
                                onChange={(e) => { setTime(e) }}
                                renderInput={(params) => <TextField {...params} />}
                                sx={{ padding: 10 }}
                            />


                        </LocalizationProvider>

                        <TextField
                            id="Reservation-Guests-Number"
                            label="Select the Number of Guests"
                            placeholder="Guests"
                            value={guestNumber}
                            onChange={(e) => { setGuestNumber(e.target.value) }}
                            type="number"
                            margin="normal"
                        />

                        <Button variant="contained" onClick={availabilityHandler}>
                            Check Availability!
                        </Button>

                    </Stack>


                </Card>
            </Box>

            {isHighTrafficDay === true &&
                <Box sx={{ padding: 10 }}>
                    <Card sx={{ padding: 5 }}>

                        <h1>This is a high traffic day. We require a credit card on file before making a reservation. There is a $10 no show fee.</h1>

                        <Stack spacing={2}>
                            <TextField
                                id="Confirmation-Card-Number"
                                label="Card Number"
                                placeholder="Enter your Card Number"
                                value={cardNumber}
                                onChange={(e) => { setCardNumber(e.target.value) }}
                            />

                            <TextField
                                id="Confirmation-Security-Code"
                                label="Security Code"
                                placeholder="Enter your Security Code"
                                value={securityCode}
                                onChange={(e) => { setSecurityCode(e.target.value) }}
                            />

                            <Button variant="contained" onClick={highTrafficButtonHandler}>Continue</Button>
                        </Stack>
                    </Card>
                </Box>
            }

            {available === false &&

                <Box sx={{ padding: 10 }}>
                    <Card sx={{ padding: 5 }}>
                        <Stack spacing={2}>

                            <h2>We're sorry but we cannot fit you in at this time</h2>
                            <p>However we can fit your party of {guestNumber} on {date.getUTCMonth() + 1}/{date.getDate()}/{date.getFullYear()} at these times</p>

                            <Button variant="contained" disabled={isDisabled}>Continue</Button>

                        </Stack>
                    </Card>
                </Box>
            }

            {available === true &&
                <Box sx={{ padding: 10 }}>
                    <Card sx={{ padding: 5 }}>
                        <Stack>
                            <h2>
                                We are able to make your reservation on {date.getUTCMonth() + 1}/{date.getDate()}/{date.getFullYear()} for your party of {guestNumber} at {time.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' })}
                            </h2>
                            <Link to="/Confirmation" style={{ textDecoration: 'none' }}><Button variant="contained">Confirm!</Button> </Link>
                        </Stack>
                    </Card>
                </Box>
            }

            <Link to={{ pathname: "/Confirmation", state: { date: reservationDetails?.date, numberOfGuests: reservationDetails?.numberOfGuests } }} style={{ textDecoration: 'none' }}>
                <Button variant="contained" >
                    Continue
                </Button>
            </Link>


        </div>
    );
}

export default ReservationPage;