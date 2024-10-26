import React, {useEffect, useMemo, useState} from 'react';
import {Box, Grid, Grow, Paper} from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import {Typography} from '@mui/material';
import {Button, Col, Form, Modal, notification, Row, Table} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import {useProcessDetails} from "./ProcessDetailsHook.jsx";
import ProcessDetailsListSection from "./ProcessDetailsListSection.jsx";
import SelectedProcessDetailsSection from "./SelectedProcessDetailsSection.jsx";
import {getRowClassName, tabItems, processDetailsColumn} from "./ProcessDetailsUtil.jsx";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
import {fetchWorkcenter} from "../workcenter_management/WorkcenterApi.jsx";
import {fetchProcessDetail} from "./ProcessDetailsApi.jsx";
import apiClient from "../../../../config/apiClient.jsx";
import {PRODUCTION_API} from "../../../../config/apiConstants.jsx";

const ProcessDetailsPage = ({ initialData }) => {

    const notify = useNotificationContext(); // 알림 컨텍스트 사용
    const [form] = Form.useForm(); // 폼 인스턴스 생성
    const [registrationForm] = Form.useForm(); // 폼 인스턴스 생성
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [isModalVisible, setIsModalVisible] = useState(false); // 모달 상태 관리
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
    const [displayValues, setDisplayValues] = useState({});
    const [processDetailsData, setProcessDetailsData] = useState(null); // 선택된 작업장 데이터 관리
    const [processDetailsParam, setProcessDetailsParam] = useState({

    }); // 선택된 작업장 데이터 관리

    const {
        data,
        processDetail,
        handleSave,
        handleSelectedRow,
        handleDeleteProcessDetail,
        isProcessModalVisible,
        handleClose,
        handleInputChange,
        handleAddProcess,
        handleSearch,
        searchData,
        isSearchActive,
    } = useProcessDetails(initialData);

    useEffect(() => {
        console.log("현재 activeTabKey: ", activeTabKey);
    }, [activeTabKey]);

    const handleTabChange = (key) => {
        console.log("Tab 변경됨:", key);  // 디버그 로그 추가
        setActiveTabKey(key);
    };

    // 폼 제출 핸들러
    const handleFormSubmit = async (values, type) => {
        console.log('handleFormSubmit 호출됨. 폼 제출 값:', values);  // 전달된 값 확인

        confirm({
            title: '저장 확인',
            content: '정말로 저장하시겠습니까?',
            okText: '확인',
            cancelText: '취소',
            onOk: async () => {
                try {
                    if (type === 'register') {
                        // API 요청: 새 작업장 등록
                        await apiClient.post(PRODUCTION_API.SAVE_PROCESS_API, values);
                        notify('success', '등록 성공', '공정이 등록되었습니다.', 'bottomRight');
                    } else if (type === 'update') {
                        // API 요청: 기존 작업장 수정
                        await apiClient.post(PRODUCTION_API.UPDATE_PROCESS_API(values.code), values);
                        notify('success', '등록 성공', '공정이 수정되었습니다.', 'bottomRight');
                    }
                } catch (error) {
                    console.error('저장 실패:', error);
                    notify('error', '저장 실패', '데이터 저장 중 오류가 발생했습니다.', 'top');
                }
            },
            onCancel() {
                notification.warning({
                    message: '저장 취소',
                    description: '저장이 취소되었습니다.',
                    placement: 'bottomLeft',
                });
            },
        });
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="공정세부정보 관리"
                        description={(
                            <Typography>
                                공정세부정보 관리 페이지는 <span>각 제품의 공정에 필요한 세부 정보를 관리</span>하는 곳임. 이 페이지에서는 <span>공정 단계, 소요 시간, 필요 설비</span> 등을 입력하고 관리할 수 있음. 제품의 <span>생산 흐름</span>을 최적화하기 위해 공정 정보를 체계적으로 정리하고, <span>각 공정의 효율성</span>을 분석할 수 있음.
                            </Typography>
                        )}
                        tabItems={tabItems()}
                        activeTabKey={activeTabKey}
                        handleTabChange={handleTabChange}
                    />
                </Grid>
            </Grid>

            {activeTabKey === '1' && (
                <Grid sx={{ padding: '0px 20px 0px 20px', minWidth: '700px !important', maxWidth: '1200px' }} container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                {/* 기본 데이터 목록 */}
                                <Typography variant="h6" sx={{ padding: '20px' }} >생산공정 목록</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Table
                                        columns={processDetailsColumn}
                                        dataSource={data}
                                        rowClassName={getRowClassName}
                                        pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                                        size="small"
                                        rowKey="code"
                                        rowSelection={{
                                            type: 'radio', // 선택 방식 (radio or checkbox)
                                            selectedRowKeys: selectedRowKeys, // 선택된 행의 키들
                                            onChange: (newSelectedRowKeys) => {
                                                console.log('새로운 Row Keys:', newSelectedRowKeys); // 디버그용 로그
                                                setSelectedRowKeys(newSelectedRowKeys); // 선택된 행의 키 업데이트
                                            },
                                        }}
                                        // onRow={(record) => ({
                                        //     onClick: () => handleSelectedRow(record), // 행 클릭 시 해당 공정 선택
                                        //     style: { cursor: 'pointer' },
                                        // })}
                                        onRow={(record) => ({
                                            style: { cursor: 'pointer' },
                                            onClick: async () => {
                                                setSelectedRowKeys([record.code]); // 클릭한 행의 키로 상태 업데이트
                                                try {
                                                    // 공정 상세 정보 가져오기 (API 호출)
                                                    const detail = await fetchProcessDetail([record.code]);

                                                    setProcessDetailsData(detail); // 선택된 작업장 데이터 설정
                                                    setProcessDetailsParam(detail);
                                                    notify('success', '조회', '생산공정 정보 조회 성공.', 'bottomRight');
                                                } catch (error) {
                                                    console.error("생산공정 정보 조회 실패:", error);
                                                    notify('error', '조회 오류', '생산공정 정보 조회 중 오류가 발생했습니다.', 'top');
                                                }
                                                // handleFormSubmit(record);
                                            },
                                        })}
                                    />
                                </Grid>
                            </Paper>
                        </Grow>
                    </Grid>
                    {/* 생산공정 등록 및 수정 */}
                    {processDetailsData && (
                        <SelectedProcessDetailsSection
                            key={processDetailsData.code}
                            processDetail={processDetailsData}
                            handleInputChange={handleInputChange}
                            handleClose={() => setProcessDetailsData(null)} // 닫기 핸들러
                            // handleSave={handleSave}
                            handleSelectedRow={handleSelectedRow}
                            handleDeleteProcessDetail={handleDeleteProcessDetail}
                            rowClassName={getRowClassName}
                            handleFormSubmit={handleFormSubmit}
                        />
                    )}
                </Grid>
            )}

            {activeTabKey === '2' && (
                <Grid sx={{padding: '0px 20px 0px 20px'}} container spacing={3}>
                    <Grid item xs={12} md={5} sx={{minWidth: '500px !important', maxWidth: '700px !important'}}>
                        <Grow in={true} timeout={200}>
                            <div>
                                <TemporarySection/>
                            </div>
                        </Grow>
                    </Grid>
                </Grid>
            )}

        </Box>
    );
};

export default ProcessDetailsPage;