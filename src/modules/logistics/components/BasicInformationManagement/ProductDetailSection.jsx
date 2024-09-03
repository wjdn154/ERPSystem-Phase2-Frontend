import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Modal,
    TableContainer,
    Table as MuiTable,
    TableBody,
    TableRow,
    TableCell,
    TextField,
    Grid
} from '@mui/material';
import {Button, Col, Form, Row, Input, Table as AntTable, Switch, Select} from "antd";
const { Option } = Select;
import { productDetailColumn } from "../../utils/BasicInformationManagement/ProductDetailColumn.jsx";


const ProductDetailSection = ({ productDetail }) => {
    if (!productDetail) return null;

    return (
        <Paper elevation={3} sx={{ padding: '20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                    <TextField
                        label="코드"
                        value={productDetail.code}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="품목명"
                        value={productDetail.name}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="품목 그룹명"
                        value={productDetail.productGroupName}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="규격"
                        value={productDetail.standard}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="단위"
                        value={productDetail.unit}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="입고 단가"
                        value={productDetail.purchasePrice}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="출고 단가"
                        value={productDetail.salesPrice}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="품목 구분"
                        value={productDetail.productType}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="생산 라우팅"
                        value={productDetail.productionRoutingName}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ProductDetailSection;