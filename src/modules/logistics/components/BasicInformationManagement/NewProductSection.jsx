import React from 'react';
import { TextField, Grid, Paper } from '@mui/material';

const NewProductDetailSection = ({ productDetail, handleInputChange }) => {
    return (
        <Paper elevation={3} sx={{ padding: '20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        label="코드"
                        value={productDetail.code || ""}  // 기본값으로 빈 문자열 설정
                        onChange={(e) => handleInputChange("code", e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="품목명"
                        value={productDetail.name || ""}  // 기본값으로 빈 문자열 설정
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="품목 그룹명"
                        value={productDetail.productGroupName || ""}  // 기본값으로 빈 문자열 설정
                        onChange={(e) => handleInputChange("productGroupName", e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="규격"
                        value={productDetail.standard || ""}  // 기본값으로 빈 문자열 설정
                        onChange={(e) => handleInputChange("standard", e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="단위"
                        value={productDetail.unit || ""}  // 기본값으로 빈 문자열 설정
                        onChange={(e) => handleInputChange("unit", e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="입고 단가"
                        value={productDetail.purchasePrice || ""}  // 기본값으로 빈 문자열 설정
                        onChange={(e) => handleInputChange("purchasePrice", e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="출고 단가"
                        value={productDetail.salesPrice || ""}  // 기본값으로 빈 문자열 설정
                        onChange={(e) => handleInputChange("salesPrice", e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="품목 구분"
                        value={productDetail.productType || ""}  // 기본값으로 빈 문자열 설정
                        onChange={(e) => handleInputChange("productType", e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="생산 라우팅"
                        value={productDetail.productionRoutingName || ""}  // 기본값으로 빈 문자열 설정
                        onChange={(e) => handleInputChange("productionRoutingName", e.target.value)}
                        fullWidth
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default NewProductDetailSection;
