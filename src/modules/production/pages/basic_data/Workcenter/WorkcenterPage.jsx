import React from 'react';
import { Row, Col, Button, Modal, Typography } from 'antd';
import SearchBar from '../../../utils/common/SearchBar.jsx';
import WorkcenterListSection from '../../../components/basic_data/workcenter/WorkcenterListSection.jsx';
import SelectedWorkcenterSection from '../../../components/basic_data/workcenter/SelectedWorkcenterSection.jsx';
import FactorySelectSection from '../../../components/basic_data/workcenter/FactorySelectSection.jsx'; // 여기서 .jsx.jsx 수정
import { useWorkcenter } from '../../../hooks/basic_data/workcenter/WorkcenterHook.jsx';
import { workcenterColumns } from '../../../utils/basic_data/workcenter/WorkcenterColumn.jsx';
import { getRowClassName } from '../../../utils/basic_data/workcenter/WorkcenterUtil.jsx';
import { filterDataByTerm } from '../../../utils/common/filterDataByTerm.jsx';
import WorkcenterDashboard from "./WorkcenterDashboard.jsx";
import { Box, Grid } from "@mui/material";
import WelcomeSection from "../../../../common/components/WelcomeSection.jsx";
import WorkerAssignmentPage from "./WorkerAssignmentPage.jsx";
import { tabItems } from "../../../utils/basic_data/workcenter/WorkcenterUtil.jsx";

const { Text } = Typography;

const WorkcenterPage = ({ initialData }) => {
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

    return (
        <Box sx={{ margin: '20px' }}>
            {/* 작업장 관리 제목과 환영 메시지 */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="작업장 관리"
                        description={(
                            <Typography>
                                작업장 관리 페이지는 작업장 관리 시스템에서{' '}
                                <span style={{ color: '#00C1D8' }}>작업장</span>과{' '}
                                <span style={{ color: '#00C1D8' }}>작업 내역</span>(작업에 대한 정보와 상태)을{' '}
                                <span style={{ color: '#00C1D8' }}>관리하고 등록</span>하는 중요한 기능을 제공하는 페이지임.
                                <br />
                                이 페이지는 작업장의 효율적인 운영과 관리를 지원하며, 작업 상태를 실시간으로 모니터링하는 데 필수적인 역할을 함.
                            </Typography>
                        )}
                        tabItems={tabItems()}
                        activeTabKey={activeTabKey}
                        handleTabChange={handleTabChange}
                    />
                </Grid>
            </Grid>
            {activeTabKey === '1' && (
                <Grid>
                    {/* 사용중 작업장 대시보드 */}
                    <div style={{ marginBottom: '16px' }}>
                        <WorkcenterDashboard />
                    </div>
                    {/* 검색 바 */}
                    <Row gutter={16} style={{ marginBottom: '16px' }}>
                        <Col span={8}>
                            <SearchBar onSearch={handleSearch} />
                        </Col>
                    </Row>

                    {/* 검색 결과 목록 또는 경고 메시지 */}
                    {isSearchActive && (
                        <>
                            {searchData && searchData.length > 0 ? (
                                <Row gutter={16} style={{ marginBottom: '16px' }}>
                                    <Col span={24}>
                                        <WorkcenterListSection
                                            columns={workcenterColumns}
                                            data={searchData}
                                            handleSelectedRow={handleSelectedRow}
                                            rowClassName={getRowClassName}
                                        />
                                    </Col>
                                </Row>
                            ) : (
                                <Text type="warning">검색하신 작업장을 찾을 수 없습니다.</Text>
                            )}
                        </>
                    )}

                    {/* 기본 데이터 목록 */}
                    <Row gutter={16} style={{ marginTop: isSearchActive && searchData && searchData.length > 0 ? '16px' : '0' }}>
                        <Col span={24}>
                            <WorkcenterListSection
                                columns={workcenterColumns}
                                data={data}
                                handleSelectedRow={handleSelectedRow}
                                rowClassName={getRowClassName}
                            />
                        </Col>
                    </Row>

                    {/* 작업장 추가 버튼 */}
                    <Button type="primary" onClick={handleAddWorkcenter} style={{ marginTop: '16px' }}>
                        등록
                    </Button>

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
                </Grid>
            )}
            {activeTabKey === '2' && (
                <Grid>
                    {/* 공장 선택 */}
                    <div style={{ marginTop: '16px' }}>
                        <FactorySelectSection />
                    </div>

                    {/* 작업장별 오늘의 작업자 배정 명단 */}
                    <div style={{ marginBottom: '16px' }}>
                        <WorkerAssignmentPage />
                    </div>

                    {/* 출력 버튼 */}
                    <Button type="primary" onClick={handleAddWorkcenter} style={{ marginTop: '16px' }}>출력</Button>
                </Grid>
            )}
        </Box>
    );
};

export default WorkcenterPage;
