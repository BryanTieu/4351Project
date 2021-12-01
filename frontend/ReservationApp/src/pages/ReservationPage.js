import { useState } from 'react';
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

const ReservationPage = () => {

    const [guestNumber, setGuestNumber] = useState(0);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [available, setAvailable] = useState();
    const [reservationDetails, setReservationDetails] = useState();
    const [isDisabled, setIsDisabled] = useState(true);

    const serverResponseForAvailability = 'false'

    const availabilityHandler = () => {
        if (serverResponseForAvailability === 'false') {
            setAvailable(false)
        }

        else if (serverResponseForAvailability === 'true') {
            setAvailable(true);
        }
        // const htd =(date.getMonth()+1).toString() + date.getDate().toString();
        // console.log(htd);
    }

    const highTrafficDays = [
        "1 1",
        "7 4",
        "8 31"
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


        </div>
    );
}

export default ReservationPage;