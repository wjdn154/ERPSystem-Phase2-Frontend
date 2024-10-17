import React, { useEffect, useState } from 'react';
import { Box, Grid, Grow, Typography } from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './DepartmentManagementUtil.jsx';
import DepartmentDataListSection from '../department_management/Existing/DepartmentDataListSection.jsx';
import { fetchDepartmentData } from '../department_management/Existing/DepartmentDataApi.jsx';
import { notification } from 'antd';
import DepartmentRegistrationForm from '../department_management/Existing/DepartmentRegistrationForm.jsx'; // 등록 폼 임포트

const DepartmentManagementPage = () => {
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [departmentList, setDepartmentList] = useState([]); // 부서 목록 상태
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    // 부서 데이터를 API에서 가져오는 함수
    const fetchDepartments = async () => {
        setIsLoading(true);
        try {
            const response = await fetchDepartmentData(); // API 호출
            setDepartmentList(response); // 부서 목록 상태 업데이트
        } catch (error) {
            notification.error({
                message: '오류 발생',
                description: '부서 목록을 불러오는 중 오류가 발생했습니다.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    // 페이지 로드 시 부서 목록 호출
    useEffect(() => {
        fetchDepartments();
    }, []);

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <WelcomeSection
                        title="부서 관리"
                        description={(
                            <Typography>
                                부서 관리 페이지는 <span>기업 내 모든 부서를 체계적으로 관리</span>하는 기능을 제공함.
                                이 페이지에서는 <span>부서의 이름, 역할, 소속 직원</span> 등을 등록하고 수정할 수 있으며,
                                <span>부서별 인원과 조직도를 파악</span>할 수 있음. 부서 간 <span>인력 배치와 변경 사항</span>을
                                효율적으로 관리하여 기업의 인사 구조를 강화함.
                            </Typography>
                        )}
                        tabItems={tabItems()}
                        activeTabKey={activeTabKey}
                        handleTabChange={handleTabChange}
                    />
                </Grid>
            </Grid>

            {activeTabKey === '1' && (
                <Grid container spacing={3} sx={{ padding: '0 20px' }}>
                    <Grid item xs={12} sx={{ minWidth: '500px', maxWidth: '1500px' }}>
                        <Grow in={true} timeout={200}>
                            <div>
                                <DepartmentDataListSection
                                    columns={[
                                        {
                                            title: '부서코드',
                                            dataIndex: 'departmentCode',
                                            key: 'departmentCode',
                                            width: '30%',
                                        },
                                        {
                                            title: '부서명',
                                            dataIndex: 'departmentName',
                                            key: 'departmentName',
                                            width: '35%',
                                        },
                                        {
                                            title: '부서위치',
                                            dataIndex: 'location',
                                            key: 'location',
                                            width: '35%',
                                        },
                                    ]}
                                    data={departmentList}
                                    rowKey={(record) => record.id}
                                    handleRowSelection={{}}
                                    handleSelectedRow={() => {}}
                                />
                            </div>
                        </Grow>
                    </Grid>
                </Grid>
            )}

            {activeTabKey === '2' && (
                <Grid container spacing={3} sx={{ padding: '0 20px' }}>
                    <Grid item xs={12} sx={{ minWidth: '500px', maxWidth: '1500px' }}>
                        <Grow in={true} timeout={200}>
                            <div>
                                {/* 부서 등록 폼 표시 */}
                                <DepartmentRegistrationForm onSuccess={fetchDepartments} />
                            </div>
                        </Grow>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default DepartmentManagementPage;
