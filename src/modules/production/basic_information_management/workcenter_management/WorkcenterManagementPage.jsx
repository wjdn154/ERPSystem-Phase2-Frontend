import React, {useMemo, useState} from 'react';
import {Box, Grid, Grow, Paper} from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './WorkcenterUtil.jsx';
import {Typography} from '@mui/material';
import {Button, Col, Divider, Form, Input, Modal, notification, Row, Select} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import SearchBar from "../../common/SearchBar.jsx";
import WorkcenterListSection from "./tab1_workcenter_list/WorkcenterListSection.jsx";
import {workcenterColumns} from "./WorkcenterColumn.jsx";
import {getRowClassName} from "./WorkcenterUtil.jsx";
import SelectedWorkcenterSection from "./tab1_workcenter_list/SelectedWorkcenterSection.jsx";
import WorkerAssignmentPage from "./tab3_workcenter_assignment/WorkerAssignmentPage.jsx";
import {useWorkcenter} from "./WorkcenterHook.jsx";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
import apiClient from "../../../../config/apiClient.jsx";
import {PRODUCTION_API} from "../../../../config/apiConstants.jsx";

const WorkcenterManagementPage = ({ initialData }) => {

    const notify = useNotificationContext(); // 알림 컨텍스트 사용
    const [form] = Form.useForm(); // 폼 인스턴스 생성
    const [registrationForm] = Form.useForm(); // 폼 인스턴스 생성
    const [Data, setData] = useState({});

    const {
        data,
        workcenter,
        handleSave,
        handleSelectedRow,
        handleDeleteWorkcenter,
        isWorkcenterModalVisible,
        handleClose,
        handleInputChange,
        handleAddWorkcenter,
        handleSearch,
        searchData,
        isSearchActive,
        handleTabChange,
        activeTabKey,
    } = useWorkcenter(initialData);

    const refreshWorkcenters = async () => {
        const updatedData = await fetchWorkcenters(); // 작업장 목록 새로고침
        setData(updatedData);
    };


    // 폼 제출 핸들러
    const handleFormSubmit = async (values, type) => {
        confirm({
            title: '저장 확인',
            content: '정말로 저장하시겠습니까?',
            okText: '확인',
            cancelText: '취소',
            onOk: async () => {
                try {
                    if (type === 'register') {
                        // API 요청: 새 작업장 등록
                        await apiClient.post(PRODUCTION_API.SAVE_WORKCENTER_API, values);
                        notify('success', '등록 성공', '새 작업장이 등록되었습니다.', 'bottomRight');
                    } else if (type === 'update') {
                        // API 요청: 기존 작업장 수정
                        await apiClient.post(PRODUCTION_API.UPDATE_WORKCENTER_API(values.code), values);
                        notify('success', '등록 성공', '작업장이 수정되었습니다.', 'bottomRight');
                    }
                    isWorkcenterModalVisible(false); // 모달 닫기
                    refreshWorkcenters(); // 작업장 목록 새로고침
                } catch (error) {
                    console.error('Error saving workcenter:', error);
                    notification.error({
                        message: '저장 실패',
                        description: '데이터 저장 중 오류가 발생했습니다.',
                        placement: 'top',
                    });
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
                        title="작업장 관리"
                        description={(
                            <Typography>
                                작업장 관리 페이지는 <span>제품을 생산하는 작업장에 대한 기본 정보를 관리</span>하는 곳임. 이 페이지에서는 <span>작업장 추가, 수정, 삭제</span>와 같은 기능을 통해 작업장의 <span>위치, 담당자, 설비 정보</span>를 입력할 수 있음. 또한 작업장 간의 <span>생산 공정 배분</span> 및 <span>작업량 조정</span>을 효율적으로 관리할 수 있음.
                            </Typography>
                        )}
                        tabItems={tabItems()}
                        activeTabKey={activeTabKey}
                        handleTabChange={handleTabChange}
                    />
                </Grid>
            </Grid>

            {activeTabKey === '1' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12} md={12} sx={{ minWidth: '1000px !important', maxWidth: '1500px !important' }}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }} >작업장 목록</Typography>

                                {/* 기본 데이터 목록 */}
                                <WorkcenterListSection
                                    columns={workcenterColumns}
                                    data={data}
                                    handleSelectedRow={handleSelectedRow}
                                    rowClassName={getRowClassName}
                                />
                                {/* 모달 컴포넌트 */}
                                {workcenter && (
                                    <Modal
                                        visible={isWorkcenterModalVisible} // 모달 상태에 따라 표시
                                        onCancel={handleClose} // 모달을 닫는 함수
                                        footer={null} // 모달의 하단 버튼 제거
                                    >
                                        <SelectedWorkcenterSection
                                            workcenter={workcenter}
                                            handleClose={handleClose}
                                            handleInputChange={handleInputChange}
                                            handleSave={handleSave}
                                            handleDeleteWorkcenter={handleDeleteWorkcenter}
                                        />
                                    </Modal>
                                )}
                            </Paper>

                        </Grow>
                    </Grid>
                </Grid>
            )}

            {activeTabKey === '2' && (
                <Grid item xs={12} md={6} sx={{ minWidth: '700px !important', maxWidth: '1200px !important' }}>
                    <Grow in={true} timeout={200}>
                        <Paper elevation={3} sx={{ height: '100%' }}>
                            <Typography variant="h6" sx={{ padding: '20px' }}>작업장 등록</Typography>
                            <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                <Form
                                    layout="vertical"
                                    form={form}
                                    onFinish={(values) => handleFormSubmit(values)}
                                    initialValues={{
                                        workcenterType: 'Press', // 기본값 설정
                                    }}
                                >
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="code"
                                                label="작업장 코드"
                                                rules={[{ required: true, message: '작업장 코드를 입력해주세요.' }]}
                                            >
                                                <Input placeholder="예: WC001" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="name"
                                                label="작업장 이름"
                                                rules={[{ required: true, message: '작업장 이름을 입력해주세요.' }]}
                                            >
                                                <Input placeholder="예: 프레스 작업장" />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="workcenterType"
                                                label="작업장 유형"
                                                rules={[{ required: true, message: '작업장 유형을 선택해주세요.' }]}
                                            >
                                                <Select placeholder="작업장 유형 선택">
                                                    <Option value="Press">프레스</Option>
                                                    <Option value="Assembly">조립</Option>
                                                    <Option value="Welding">용접</Option>
                                                    <Option value="Machining">가공</Option>
                                                    <Option value="Quality Inspection">품질 검사</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="description"
                                                label="설명"
                                                rules={[{ required: false }]}
                                            >
                                                <Input.TextArea rows={2} placeholder="작업장 설명을 입력하세요." />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <Form.Item
                                                name="equipmentIds"
                                                label="설비 선택"
                                            >
                                                <Select
                                                    mode="tags"
                                                    style={{ width: '100%' }}
                                                    placeholder="설치된 설비를 선택하세요."
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={24} style={{ textAlign: 'right' }}>
                                            <Button type="primary" htmlType="submit">
                                                작업장 등록
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Grid>
                        </Paper>
                    </Grow>
                </Grid>
            )}

            {activeTabKey === '3' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12} md={6} sx={{ minWidth: '700px !important', maxWidth: '1200px !important' }}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }}>오늘의 작업자</Typography>
                                    <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                        {/* 작업장별 오늘의 작업자 배정 명단 */}
                                        <WorkerAssignmentPage />
                                    </Grid>
                            </Paper>
                        </Grow>
                    </Grid>
                </Grid>
            )}

        </Box>
    );
};

export default WorkcenterManagementPage;