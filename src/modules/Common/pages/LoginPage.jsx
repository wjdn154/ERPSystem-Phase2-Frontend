import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { TextField, Button, Box, Typography } from '@mui/material';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === '1' && password === '1') {
            // 쿠키에 로그인 상태 저장 (1일 동안 유지)
            Cookies.set('username', username, { expires: 1, path: '/' });

            // 로그인 후 메인 페이지로 리디렉션
            navigate('/');
        } else {
            alert('로그인 정보가 올바르지 않습니다.');
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <Typography variant="h4" gutterBottom>Login</Typography>
            <form onSubmit={handleLogin}>
                <Box mb={2}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />
                </Box>
                <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
            </form>
        </Box>
    );
};

export default LoginPage;