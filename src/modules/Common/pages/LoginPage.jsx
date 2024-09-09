import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {Box, TextField} from "@mui/material";
import {Button, Typography} from "antd";
import { jwtDecode } from "jwt-decode";
import {COMMON_API} from "../../../config/apiConstants.jsx";
import {useDispatch} from "react-redux";
import {setAuth} from "../../../store.jsx";

const LoginPage = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            const response = await axios.post(COMMON_API.LOGIN_API, { userName, password });
            const token = response.data;

            console.log("로그인 성공", jwtDecode(token));
            Cookies.set('jwt', token, { expires: 1 }); // 1일 동안 JWT 저장
            dispatch(setAuth(token));
            navigate('/');
        } catch (error) {
            alert("로그인 실패");
            console.error("로그인 실패", error);
        }
    };

    return (

        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <Typography variant="h4" >Login</Typography>
            <form onSubmit={handleLogin}>
                <Box mb={2}>
                    <TextField
                        label="아이디"
                        value={userName}
                        variant="outlined"
                        onChange={(e) => setUserName(e.target.value)}
                        fullWidth
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="비밀번호"
                        type="password"
                        value={password}
                        variant="outlined"
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />
                </Box>
                <Button onClick={handleLogin} type="primary">로그인</Button>
            </form>
        </Box>
    );
};

export default LoginPage;