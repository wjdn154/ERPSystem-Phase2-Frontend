import React from 'react';
import { Row, Col, Button, Modal, Typography } from 'antd';
import SearchBar from '../../components/SearchBar.jsx';
import WorkcenterListSection from '../../components/Workcenter/WorkcenterListSection.jsx';
import SelectedWorkcenterSection from '../../components/Workcenter/SelectedWorkcenterSection.jsx';
import { useWorkcenter } from '../../hooks/Workcenter/WorkcenterHook.jsx';
import { workcenterColumns } from '../../utils/Workcenter/WorkcenterColumn.jsx';
import { getRowClassName } from '../../utils/Workcenter/WorkcenterUtil.jsx';
import { filterDataByTerm } from '../../utils/filterDataByTerm.jsx'
import WorkcenterDashboard from "./WorkcenterDashboard.jsx";

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
  } = useWorkcenter(initialData);

  return (


      <div style={{padding: '24px'}}>
          {/* 사용중 작업장 대시보드 */}
          <div style={{marginBottom: '16px'}}>
              <WorkcenterDashboard/>
          </div>
          {/* 검색 바 */}
          <Row gutter={16} style={{marginBottom: '16px'}}>
              <Col span={8}>
                  <SearchBar onSearch={handleSearch}/>
              </Col>
          </Row>

          {/* 검색 결과 목록 또는 경고 메시지 */}
          {isSearchActive && (
              <>
                  {searchData && searchData.length > 0 ? (
                      <Row gutter={16} style={{marginBottom: '16px'}}>
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
          <Row gutter={16} style={{marginTop: isSearchActive && searchData && searchData.length > 0 ? '16px' : '0'}}>
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
          <Button type="primary" onClick={handleAddWorkcenter} style={{marginTop: '16px'}}>
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
      </div>
  );
};

export default WorkcenterPage;
