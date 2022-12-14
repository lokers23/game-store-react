import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tokenService  from '../../services/TokenService'

function Login() {
    const keyLocalStorage = "game-store";
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const user = 
    {
        login: "", 
        password: ""
    }

    const onChangeHandler = (setFunction, event) => {
        setFunction(event.target.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        user.login = login;
        user.password = password;

        const url = "https://localhost:7125/api/user/login";
        axios.post(url, user)
        .then((response) => tokenService.setToken(keyLocalStorage, response.data)).then(() => navigate("/"))
        .catch((error) => console.log(error.message));
    }

    return (  
        <div>
            <h1>Вход в аккаунт</h1>
            <form onSubmit={ onSubmitHandler }>
                <div>
                    <label>Login</label>
                    <input placeholder="Login..." name="login" onChange={(e) => onChangeHandler(setLogin, e)}/>
                </div>
                <div>
                    <label>Password</label>
                    <input placeholder="Password..." onChange={(e) => onChangeHandler(setPassword, e)}/>
                </div>
                <input type="submit"/>
            </form>
        </div> 
    );
}

export default Login;