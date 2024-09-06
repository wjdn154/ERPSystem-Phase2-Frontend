import React, {useEffect, useState} from 'react';
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
    Grid, MenuItem
} from '@mui/material';
import {Button, Col, Form, Row, Input, Table as AntTable, Switch, Select} from "antd";
const { Option } = Select;
import { productDetailColumn } from "../../utils/BasicInformationManagement/ProductDetailColumn.jsx";

const productGroups = [
    { id: 1, code: "01", name: "가공식품"},
    { id: 2, code: "02", name: "신선식품"}
]

const productionRoutings = [
    { id: 1, code: "ROUT001", name: "루트 A"},
    { id: 2, code: "ROUT002", name: "루트 B"}
]

const ProductDetailSection = ({ productDetail, handleInputChange }) => {

    const [groupOptions, setGroupOptions] = useState([]);
    const [routingOptions, setRoutingOptions] = useState([]);

    useEffect(() => {
        // 실제 API 호출로부터 가져온 데이터를 설정
        setGroupOptions(productGroups); // 예시로 하드코딩된 값을 사용하고 있으나, 실제론 API 호출 결과를 사용해야 함.
        setRoutingOptions(productionRoutings);
    }, []);

    if (!productDetail) return null;

    const handleChange = (key) => (event) => {
        if (key === 'productGroup') {
            const selectedGroup = groupOptions.find((group) => group.code === event);
            handleInputChange(key, { code: selectedGroup.code, name: selectedGroup.name });  // ID와 이름을 함께 저장
        } else if (key === 'productionRouting') {
            const selectedRouting = routingOptions.find((routing) => routing.code === event);
            handleInputChange(key, { code: selectedRouting.code, name: selectedRouting.name });  // ID와 이름을 함께 저장
        } else {
            handleInputChange(key, event.target.value);  // 나머지 값 처리
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: '20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                    <TextField
                        label="코드"
                        value={productDetail.code}
                        onChange={handleChange('code')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="품목명"
                        value={productDetail.name}
                        onChange={handleChange('name')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Select
                        label="품목 그룹"
                        value={productDetail.productGroupCode || ''}
                        style={{ width: '100%' }}
                        onChange={handleChange('productGroup')}
                    >
                        {groupOptions.map((group) => (
                            <Option key={group.code} value={group.code}>
                                {`${group.code} - ${group.name}`}  {/* ID와 이름 함께 표시 */}
                            </Option>
                        ))}
                    </Select>
                    {productDetail.productGroupCode && productDetail.productGroupName && (
                        <Typography>{`선택된 그룹: ${productDetail.productGroupCode} - ${productDetail.productGroupName}`}</Typography>
                        )}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="규격"
                        value={productDetail.standard}
                        onChange={handleChange('standard')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="단위"
                        value={productDetail.unit}
                        onChange={handleChange('unit')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="입고 단가"
                        value={productDetail.purchasePrice}
                        onChange={handleChange('purchasePrice')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="출고 단가"
                        value={productDetail.salesPrice}
                        onChange={handleChange('salesPrice')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="품목 구분"
                        value={productDetail.productType}
                        onChange={handleChange('productType')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Select
                        label="생산 라우팅"
                        value={productDetail.productionRoutingCode || ''}  // 선택된 라우팅 ID 사용
                        style={{ width: '100%' }}
                        onChange={handleChange('productionRouting')}
                    >
                        {routingOptions.map((routing) => (
                            <Option key={routing.code} value={routing.code}>
                                {`${routing.code} - ${routing.name}`}  {/* ID와 이름 함께 표시 */}
                            </Option>
                        ))}
                    </Select>
                    {productDetail.productionRoutingCode && productDetail.productionRoutingName && (
                        <Typography>{`선택된 라우팅: ${productDetail.productionRoutingCode} - ${productDetail.productionRoutingName}`}</Typography>
                        )}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ProductDetailSection;