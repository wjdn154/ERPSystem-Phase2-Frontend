import React, { useState, useEffect } from 'react';
import { Paper, TextField, Button, Grid, Typography } from '@mui/material';

const DepartmentDetailSection = ({ selectedDept, handleSave, handleClose }) => {
    // 선택된 부서 정보를 상태로 관리 (수정 가능)
    const [deptDetails, setDeptDetails] = useState({
        id: '',
        name: '',
        location: '',
    });

    // 선택된 부서 정보가 바뀔 때마다 상태 업데이트
    useEffect(() => {
        if (selectedDept) {
            setDeptDetails(selectedDept);
        }
    }, [selectedDept]);

    // 입력값이 변경될 때 상태 업데이트
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDeptDetails({ ...deptDetails, [name]: value });
    };

    // 저장 버튼 클릭 시 처리
    const handleSaveClick = () => {
        handleSave(deptDetails);
    };

    if (!selectedDept) {
        return (
            <Paper elevation={3} sx={{ height: '100%', p: 2 }}>
                <Typography variant="h6">부서 상세 정보</Typography>
                <Typography variant="body1">부서를 선택하세요.</Typography>
            </Paper>
        );
    }

    return (
        <Paper elevation={3} sx={{ height: '100%', p: 2 }}>
            <Typography variant="h6" marginBottom={'20px'}>
                부서 상세 정보
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="부서 코드"
                        name="id"
                        value={deptDetails.id}
                        onChange={handleInputChange}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="부서명"
                        name="name"
                        value={deptDetails.name}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="부서 위치"
                        name="location"
                        value={deptDetails.location}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="flex-end" mt={2}>
                    <Button variant="contained" color="primary" onClick={handleSaveClick}>
                        저장
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleClose}
                        sx={{ ml: 2 }}
                    >
                        닫기
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default DepartmentDetailSection;
