import React, {useMemo, useState} from 'react';
import { Box, Grid, Grow } from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './WorkcenterUtil.jsx';
// import { tabItems } from './WorkcenterManagementUtil.jsx';
import {Typography} from '@mui/material';
import {Button, Col, Modal, Row} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import WorkcenterDashboard from "./WorkcenterDashboard.jsx";
import SearchBar from "../../common/SearchBar.jsx";
import WorkcenterListSection from "./WorkcenterListSection.jsx";
import {workcenterColumns} from "./WorkcenterColumn.jsx";
import {getRowClassName} from "./WorkcenterUtil.jsx";
import SelectedWorkcenterSection from "./SelectedWorkcenterSection.jsx";
import FactorySelectSection from "./FactorySelectSection.jsx";
import WorkerAssignmentPage from "./WorkerAssignmentPage.jsx";
import {useWorkcenter} from "./WorkcenterHook.jsx";

const WorkcenterManagementPage = ({ initialData }) => {

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
                            <div>
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
                            </div>
                        </Grow>
                    </Grid>
                </Grid>
            )}

            {activeTabKey === '2' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12} md={6} sx={{ minWidth: '700px !important', maxWidth: '1200px !important' }}>
                        <Grow in={true} timeout={200}>
                            <div>
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
                            </div>
                        </Grow>
                    </Grid>
                </Grid>
            )}

        </Box>
    );
};

export default WorkcenterManagementPage;