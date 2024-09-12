import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {Box, TextField, Typography, Grid, Paper, Link} from "@mui/material";
import { Button } from "antd";
import { jwtDecode } from "jwt-decode";
import { COMMON_API } from "../../../config/apiConstants.jsx";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../store.jsx";
import background from "../../../assets/img/background.png";
import background2 from "../../../assets/img/background2.png";
import background3 from "../../../assets/img/background3.png";

const LoginPage = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
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
        <Grid container style={{ height: '100vh' }}>
            {/* 왼쪽 부분 */}
            <Grid item xs={12} md={4} style={{ backgroundImage: 'url(' + background3 + ')', backgroundSize: 'cover', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box p={6} >
                    <Typography sx={{ fontSize: '35px' }}>Think Global, Act Local ERP 솔루션<br/>
                        지역사회를 위한 지속 가능한 성장
                    </Typography>
                    <Typography>
                        개인사업자,  중소기업을 위한 소프트웨어 업무 효율 및 생산성 향상을 위한 선택
                    </Typography>
                </Box>
            </Grid>

            {/* 오른쪽 부분 */}
            <Grid item xs={12} md={8} component={Paper}>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: '750px',
                            backgroundColor: '#fff',
                            padding: '40px',
                            borderRadius: '8px',
                        }}
                    >
                        <Typography variant="h4" gutterBottom>로그인</Typography>
                        <Typography variant="body2" gutterBottom color="textSecondary">
                            이메일과 비밀번호를 입력해주세요.
                        </Typography>
                        <form onSubmit={handleLogin} style={{ marginTop: '20px' }}>
                            <Box mb={2}>
                                <TextField
                                    label="Email"
                                    value={userName}
                                    variant="outlined"
                                    onChange={(e) => setUserName(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </Box>
                            <Box mb={2}>
                                <Link href="#" variant="body2" sx={{
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'flex-end',
                                    color: 'gray',
                                    textDecoration: 'none',
                                    transition: 'color 0.3s ease',
                                    '&:hover': {
                                        color: '#000',
                                        textDecoration: 'none'
                                     }}}>
                                    암호를 잊으셨나요?
                                </Link>
                                <TextField
                                    label="비밀번호"
                                    type="password"
                                    value={password}
                                    variant="outlined"
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body2" mt={2}>
                                    계정이 없으신가요? <Link href="#">회원가입</Link>
                                </Typography>
                                <Button htmlType="submit" type="primary" style={{ width: '100px', height: '45px', fontSize: '1rem' }} >
                                    로그인
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default LoginPage;