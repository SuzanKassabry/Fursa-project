import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Value } from "sass";

export default function Register() {
    const nav = useNavigate();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validationPassword, setValidationPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showValidationPassword, setShowValidationPassword] = useState(false);

    function handleName(ev: any) {
        ev.preventDefault();
        setName(ev.target.value);
    }

    function handleUsername(ev: any) {
        ev.preventDefault();
        setUsername(ev.target.value);
    }

    function handlePassword1(ev: any) {
        ev.preventDefault();
        setPassword(ev.target.value);
    }

    function handlePassword2(ev: any) {
        ev.preventDefault();
        setValidationPassword(ev.target.value);
    }

    const handleClickShowPassword1 = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowPassword2 = () => {
        setShowValidationPassword(!showValidationPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    async function handleRegister() {
        if (name === '' || username ==='' || password ==='' || validationPassword === '') {
            alert("missing data, fill all the form fields!")

        }else if (password !== validationPassword) {
            alert("the two password do not match !!!")
        }else {
            //add new school user to data base 
            //nav to login page
            const response = await axios.post('/user/register', {name, username, password});
            if (response.data.registerStatus) {
                alert("registered successfully!")
                nav('/login');
            } else {
                alert("register faild, try again!")
                setName('');
                setUsername('');
                setPassword('');
                setValidationPassword('');
                setShowPassword(false);
                setShowValidationPassword(false);
            }
        }
    }

    return (
        <div>
            <TextField
                id="outlined-basic"
                required
                label="school name"
                variant="outlined"
                // error={name === ''}
                // helperText = {name === '' ? 'Empty field' : ""}
                onKeyUp={handleName} />

            <TextField
                id="outlined-basic"
                required
                label="username"
                variant="outlined"
                onKeyUp={handleUsername} />

            <OutlinedInput
                required
                label="password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword1}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                onKeyUp={handlePassword1}
            />

            <OutlinedInput
                required
                label="re-enter password"
                type={showValidationPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword2}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showValidationPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                onKeyUp={handlePassword2}
            />

            <Button variant="contained" onClick={handleRegister}>Register</Button>
        </div>
    );
}