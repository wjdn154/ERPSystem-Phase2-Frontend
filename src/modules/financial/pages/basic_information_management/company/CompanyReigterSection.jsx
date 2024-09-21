import React from 'react';
import {Box, Grid, Paper, Typography} from '@mui/material';
import {Table as AntTable} from "antd";
import {accountSubjectColumn} from "../account_subject/AccountSubjectColumn.jsx";

const CompanyRegisterSection = ({ Initialdata }) => {
    if (!Initialdata) return null;
    console.log(Initialdata);

    return (
        <Paper elevation={3} sx={{ height: '100%' }}>
            <Typography variant="h6" sx={{ padding: '20px' }} >회사 등록</Typography>
            ㅁㄴㅇ
        </Paper>
    )
}

export default CompanyRegisterSection;