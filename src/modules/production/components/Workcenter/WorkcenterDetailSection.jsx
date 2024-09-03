import React from "react";
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
  Button,
} from "@mui/material";
import { Col, Form, Row, Input, Table as AntTable } from "antd";

const WorkcenterDetailSection = ({
  workcenterDetail,
  handlePopupClick,
  isModalVisible,
  handleClose,
  selectWorkcenter,
  handleInputChange,
  handleDeleteMemo,
  handleAddNewMemo,
  setWorkcenterDetail,
}) => (
  <Box sx={{ mt: 2 }}>
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" marginBottom={"20px"}>
        작업장 상세 정보
      </Typography>
      <Box sx={{ padding: "30px" }}>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="작업장 코드"
                onClick={() => handlePopupClick("작업장코드")}
              >
                <Input
                  value={workcenterDetail.code}
                  style={{ marginRight: "10px", flex: 1 }}
                  readOnly
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="작업장 명"
                onClick={() => handlePopupClick("작업장명")}
              >
                <Input
                  value={workcenterDetail.name}
                  style={{ flex: 1 }}
                  readOnly
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="작업장 유형"
                onClick={() => handlePopupClick("작업장유형")}
              >
                <Input
                  value={workcenterDetail.workcenterType}
                  style={{ flex: 1 }}
                  readOnly
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="설명" onClick={() => handlePopupClick("설명")}>
                <Input
                  value={workcenterDetail.description}
                  style={{ flex: 1 }}
                  readOnly
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="공장" onClick={() => handlePopupClick("공장")}>
                <Input
                  value={workcenterDetail.factory?.name || "N/A"}
                  style={{ flex: 1 }}
                  readOnly
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="활성 여부"
                onClick={() => handlePopupClick("활성여부")}
              >
                <Input
                  value={workcenterDetail.isActive ? "활성화" : "비활성화"}
                  style={{ flex: 1 }}
                  readOnly
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="생산 공정"
                onClick={() => handlePopupClick("생산공정")}
              >
                <Input
                  value={workcenterDetail.processDetails?.name || "N/A"}
                  style={{ flex: 1 }}
                  readOnly
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        {/* 설비 목록 테이블 */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">설비 목록</Typography>
          <AntTable
            rowKey="id"
            pagination={false}
            bordered={true}
            size="small"
            columns={equipmentColumns}
            dataSource={workcenterDetail.equipmentList}
          />

          <Typography variant="h6" sx={{ mt: 2 }}>
            작업자 배치 이력
          </Typography>
          <AntTable
            rowKey="id"
            pagination={false}
            bordered={true}
            size="small"
            columns={workerAssignmentColumns}
            dataSource={workcenterDetail.workerAssignments}
          />
        </Box>

        {/* 모달 */}
        <Modal
          open={isModalVisible}
          onClose={handleClose}
          aria-labelledby="select-workcenter-modal"
          aria-describedby="select-a-workcenter-from-list"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "auto",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              maxWidth: "80vw",
              maxHeight: "80vh",
              overflow: "auto",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              작업장 선택
            </Typography>
            <TableContainer component={Paper}>
              <MuiTable size="small">
                <TableBody>
                  {workcenterDetail.availableWorkcenters.map((item, index) => (
                    <TableRow
                      hover
                      key={index}
                      onClick={() => {
                        selectWorkcenter(item);
                        handleClose();
                      }}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontSize: "0.7rem" }}
                      >
                        {item.code}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.7rem" }}>
                        {item.name}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </MuiTable>
            </TableContainer>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={handleClose}
                variant="contained"
                color="primary"
                sx={{ mr: 1 }}
              >
                닫기
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Paper>
  </Box>
);

// 설비 목록 테이블 columns 설정
const equipmentColumns = [
  { title: "설비 번호", dataIndex: "equipmentNum", key: "equipmentNum" },
  { title: "설비명", dataIndex: "equipmentName", key: "equipmentName" },
  { title: "유형", dataIndex: "equipmentType", key: "equipmentType" },
  { title: "제조사", dataIndex: "manufacturer", key: "manufacturer" },
  { title: "설치일", dataIndex: "installDate", key: "installDate" },
  { title: "상태", dataIndex: "operationStatus", key: "operationStatus" },
];

// 작업자 배치 이력 테이블 columns 설정
const workerAssignmentColumns = [
  { title: "작업자 이름", dataIndex: ["worker", "name"], key: "workerName" },
  {
    title: "작업장 코드",
    dataIndex: ["workcenters", "code"],
    key: "workcenterCode",
  },
  { title: "배치 날짜", dataIndex: "assignmentDate", key: "assignmentDate" },
  { title: "교대", dataIndex: "shift", key: "shift" },
];

export default WorkcenterDetailSection;
