import React from 'react';
import { Form, Input, Select, Button} from 'antd';
import { Typography, Paper, Box} from '@mui/material';

const { Option } = Select;

const WorkerDetailSection = ({
                                 workerDetail,
                                 handleUpdate,
                                 handleInputChange,
                             }) => {
    return (
        <Paper elevation={3} sx={{padding: '20px', height: '100%', display: 'flex', flexDirection: 'column'}}>
            {/* 리스트 아래에 작업자 세부 정보 표시 */}
            {workerDetail && (
                <div style={{marginTop: '20px'}}>
                    <Typography variant="h6" marginBottom="20px">
                        작업자 정보
                    </Typography>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                        <Input value="사원번호" style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                        <Input value={workerDetail?.employeeNumber} style={{marginRight: '50px',flex: 1}} readOnly/>
                        <Input value="성명" style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                        <Input
                            value={workerDetail?.employeeLastName + workerDetail?.employeeFirstName}
                            style={{flex: 1}}
                            readOnly
                        />
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                        <Input value="부서" style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                        <Input value={workerDetail?.departmentName} style={{marginRight: '50px',flex: 1}} readOnly/>
                        <Input value="전화번호" style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                        <Input value={workerDetail?.phoneNumber} style={{flex: 1}} readOnly/>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                        <Input value="직위" style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                        <Input value={workerDetail?.positionName} style={{marginRight: '50px',flex: 1}} readOnly/>
                        <Input value="직책" style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                        <Input value={workerDetail?.jobTitleName} style={{flex: 1}} readOnly/>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                        <Input value="고용유형" style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                        <Input value={workerDetail?.employmentType} style={{marginRight: '50px',flex: 1}} readOnly/>
                        <Input value="고용상태" style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                        <Input value={workerDetail?.employmentStatus} style={{flex: 1}} readOnly/>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                        <Input value="안전교육 이수 여부" style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}}
                               readOnly/>
                        <Select
                            value={workerDetail?.trainingStatus}
                            onChange={(value) => handleInputChange({target: {value: value}}, 'trainingStatus')}
                            style={{marginRight: '50px', flex: 1}}
                        >
                            <Option value={true}>이수</Option>
                            <Option value={false}>미이수</Option>
                        </Select>
                        <Input value="배치된 작업장" style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                        <Input value={workerDetail?.workcenterName} style={{flex: 1}} readOnly/>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                        <Input value="고용일" style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                        <Input value={workerDetail?.hireDate} style={{marginRight: '50px',flex: 1}} readOnly/>
                        <Input value="프로필 사진" style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}}
                               readOnly/>
                        <Input value={workerDetail?.profilePicture} style={{flex: 1}} readOnly/>
                    </div>
                </div>

            )}
            <Box style={{display: 'flex', justifyContent: 'flex-end', marginTop: '20px'}}>
                <Button type="primary" onClick={handleUpdate} style={{marginRight: '8px'}}>
                    수정
                </Button>
            </Box>
        </Paper>
    );
};

export default WorkerDetailSection;
