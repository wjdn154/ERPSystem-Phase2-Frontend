import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Box, TextField, Typography, Grid, Paper, Link, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from "@mui/material";
import { Button, Alert } from "antd";  // Ant Design의 Alert 컴포넌트 가져오기
import { COMMON_API } from "../../../config/apiConstants.jsx";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../store.jsx";
import background from "../../../assets/img/background3.png";
import CompanyRegisterSection from "../../financial/components/Company/CompanyReigterSection.jsx";
import DebounceSelect from '../components/DebounceSelect'; // DebounceSelect 컴포넌트 import

const LoginPage = () => {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        companyId: null,
    });
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');  // 에러 메시지를 저장할 상태
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 초기값 API 호출
    const fetchInitialCompanyOptions = async () => {
        try {
            const response = await axios.post(COMMON_API.COMPANY_LIST_API);  // 초기값 API
            return response.data.map((company) => ({
                label: company.name,
                value: company.id
            }));
        } catch (error) {
            console.error('초기 회사 목록을 불러오는 중 오류 발생', error);
            return [];
        }
    };

    // 검색 API 호출
    const fetchSearchCompanyOptions = async (searchText) => {
        try {
            const response = await axios.post(COMMON_API.COMPANY_SEARCH_API, { searchText });  // 검색 API
            return response.data.map((company) => ({
                label: company.name,
                value: company.id
            }));
        } catch (error) {
            console.error('회사 검색 중 오류 발생', error);
            return [];
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    // 입력 필드의 변화에 따른 상태 업데이트
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    // 회사 선택 시 상태 업데이트
    const handleCompanyChange = (newValue) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            companyId: newValue,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');  // 로그인 시도 시 에러 메시지 초기화
        try {
            const response = await axios.post(COMMON_API.LOGIN_API, formData);
            const token = response.data;
            Cookies.set('jwt', token, { expires: 1 });
            dispatch(setAuth(token));
            navigate('/');
        } catch (error) {
            setError('로그인 실패. 사용자 정보를 확인하세요.');  // 에러 메시지 설정
            console.error("로그인 실패", error);
        }
    };

    return (
        <Grid container style={{ height: '100vh' }}>
            {/* 왼쪽 부분 */}
            <Grid item xs={12} md={4} style={{ backgroundImage: 'url(' + background + ')', backgroundSize: 'cover', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box p={6} >
                    <Typography sx={{ fontSize: '30px' }}>Think Global, Act Local ERP 솔루션<br />
                        지역사회를 위한 지속 가능한 성장
                    </Typography>
                    <Typography>
                        개인사업자, 중소기업을 위한 소프트웨어 업무 효율 및 생산성 향상을 위한 선택
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

                        {/* 에러가 있을 경우 Alert 표시 */}
                        {error && (
                            <Alert
                                message="로그인 실패"
                                description={error}
                                type="error"
                                showIcon
                                style={{ marginBottom: '20px' }}
                            />
                        )}

                        <form onSubmit={handleLogin} style={{ marginTop: '20px' }}>
                            <Box mb={2}>
                                {loading ? (
                                    <CircularProgress />
                                ) : (
                                    <DebounceSelect
                                        value={formData.companyId}
                                        placeholder="회사 선택"
                                        fetchInitialOptions={fetchInitialCompanyOptions}  // 초기값 호출 API
                                        fetchSearchOptions={fetchSearchCompanyOptions}    // 검색 API
                                        onChange={handleCompanyChange}  // 회사 선택 시 상태 업데이트
                                        style={{ width: '100%', height: '56px', marginBottom: '20px' }}
                                    />
                                )}
                            </Box>

                            {/* 회사 추가 Dialog */}
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>새로운 회사 추가</DialogTitle>
                                <DialogContent>
                                    <CompanyRegisterSection />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">취소</Button>
                                </DialogActions>
                            </Dialog>

                            <Box mb={2}>
                                <TextField
                                    label="Email"
                                    name="userName"  // name 속성을 이용해 상태를 업데이트
                                    value={formData.userName}
                                    variant="outlined"
                                    onChange={handleInputChange}
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
                                    name="password"  // name 속성을 이용해 상태를 업데이트
                                    type="password"
                                    value={formData.password}
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body2" mt={2}>
                                    계정이 없으신가요? <Link href="/register">회원가입</Link>
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