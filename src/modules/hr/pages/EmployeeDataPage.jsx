// import React, {useMemo} from 'react';
// import { Table } from 'antd';
// import { EMPLOYEE_API } from '../../';
// import axios from 'axios';
// import { Box, Grid, Grow } from '@mui/material';
// import {employeeDataHook} from '../hooks/EmployeeDataHook';
// import EmployeeDataListSection from '../components/Employee/EmployeeDataListSection.jsx';
// import {employeeDataListColumn} from '../utils/EmployeeData/EmployeeDataListColumn.jsx';
// import EmployeeDataDetailSection from '../../hr/components/Employee/EmployeeDataDetailSection';
// import {getRowClassName} from "../utils/EmployeeData/EmployeeDataUtil.jsx";
//
// const EmployeeDataPage = ({ initialData }) => {
//
//     const employeeMemoizedData = useMemo(() => initialData, [initialData]);
//
//     const{
//         data,
//         showDetail,
//         handleSelectedRow,
//         handleRowSelection,
//         employeeDataDetail,
//         setEmployeeDataDetail
//
//     } = employeeDataHook(initialData);
//     console.log('rendered data:',data);
//
//     return (
//         <Box sx={{flewGrow: 1, p:3}}>
//             <Grid container spacing={2} sx={{marginTop: 2}}>
//                 {/* 사원정보 리스트 영역 */}
//                   <Grid item xs={12}>
//                       <Grow in={true} timeout={200}>
//                           <div>
//                               <EmployeeDataListSection
//                                   columns={employeeDataListColumn}
//                                   data={data}
//                                   handleRowSelection={{handleRowSelection}}
//                                   handleSelectedRow={{handleSelectedRow}}
//                               />
//                           </div>
//                       </Grow>
//                   </Grid>
//         </Grid>
//             {/* 사원정보 상세 영역 */}
//             {showDetail && ( // showDetail이 true일 때만 렌더링
//                 <Grid item xs={12}>
//                     <Grow in={showDetail} timeout={200} key={employeeDataDetail?.id}>
//                         <div>
//                             {employeeDataDetail && (
//                                 <EmployeeDataDetailSection
//                                     data={data}
//                                     employeeDataDetail={employeeDataDetail}
//                                     handlePopupClick={handlePopupClick}
//                                     isFinancialStatementModalVisible={isFinancialStatementModalVisible}
//                                     isRelationCodeModalVisible={isRelationCodeModalVisible}
//                                     handleClose={handleClose}
//                                     selectFinancialStatement={selectFinancialStatement}
//                                     handleInputChange={handleInputChange}
//                                     handleInputChange2={handleInputChange2}
//                                     handleDeleteMemo={handleDeleteMemo}
//                                     handleAddNewMemo={handleAddNewMemo}
//                                     setEquipmentDataDetail={setEmployeeDataDetail}
//                                     selectRelationCode={selectRelationCode}
//                                     handleSave={handleSave}
//                                     deleteRelationCode={deleteRelationCode}
//                                 />
//                             )}
//                         </div>
//                     </Grow>
//                 </Grid>
//             )}
//         </Box>
//      )
// }
//
// export default EmployeeDataPage;


// import React, { useMemo, useState } from 'react';
// import { Table, Modal, Button, Form, Input } from 'antd';
// import { Box, Grid, Grow } from '@mui/material';
// import { EMPLOYEE_API } from '../../../config/apiConstants.jsx';
// import axios from 'axios';
// import { employeeDataHook } from '../hooks/EmployeeDataHook';
// import EmployeeDataListSection from '../components/Employee/EmployeeDataListSection.jsx';
// import { employeeDataListColumn } from '../utils/EmployeeData/EmployeeDataListColumn.jsx';
// import EmployeeDataDetailSection from '../../hr/components/Employee/EmployeeDataDetailSection';
// import { getRowClassName } from "../utils/EmployeeData/EmployeeDataUtil.jsx";
//
// const EmployeeDataPage = ({ initialData }) => {
//     const [isModalVisible, setIsModalVisible] = useState(false); // 모달 표시 상태
//     const [newEmployee, setNewEmployee] = useState({ name: '', age: '', department: '' }); // 신규 사원 정보 상태
//
//     const employeeMemoizedData = useMemo(() => initialData, [initialData]);
//
//     const {
//         data,
//         showDetail,
//         handleSelectedRow,
//         handleRowSelection,
//         employeeDataDetail,
//         setEmployeeDataDetail
//     } = employeeDataHook(initialData);
//     console.log('rendered data:', data);
//
//     // 모달 열기 핸들러
//     const showModal = () => {
//         setIsModalVisible(true);
//     };
//
//     // 모달 닫기 핸들러
//     const handleCancel = () => {
//         setIsModalVisible(false);
//     };
//
//     // 신규 사원 등록 핸들러
//     const handleRegisterEmployee = async () => {
//         try {
//             await axios.post(EMPLOYEE_API.SAVE_EMPLOYEE_DATA_API, newEmployee);
//             setIsModalVisible(false); // 모달 닫기
//             // TODO: 새로고침 또는 신규 등록된 사원 데이터 추가 로직 구현
//         } catch (error) {
//             console.error('Error registering employee:', error);
//         }
//     };
//
//     // 신규 사원 정보 입력 변경 핸들러
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewEmployee((prev) => ({ ...prev, [name]: value }));
//     };
//
//     return (
//         <Box sx={{ flexGrow: 1, p: 3 }}>
//             <Grid container spacing={2} sx={{ marginTop: 2 }}>
//
//                 {/* 사원정보 리스트 영역 */}
//                 <Grid item xs={12}>
//                     <Grow in={true} timeout={200}>
//                         <div>
//                             <EmployeeDataListSection
//                                 columns={employeeDataListColumn}
//                                 data={data}
//                                 handleRowSelection={handleRowSelection}
//                                 handleSelectedRow={handleSelectedRow}
//                             />
//                         </div>
//                     </Grow>
//                 </Grid>
//
//                 {/* 사원정보 상세 영역 */}
//                 {showDetail && (
//                     <Grid item xs={12}>
//                         <Grow in={showDetail} timeout={200} key={employeeDataDetail?.id}>
//                             <div>
//                                 {employeeDataDetail && (
//                                     <EmployeeDataDetailSection
//                                         data={data}
//                                         employeeDataDetail={employeeDataDetail}
//                                         handlePopupClick={() => {}}
//                                         isFinancialStatementModalVisible={false}
//                                         isRelationCodeModalVisible={false}
//                                         handleClose={() => {}}
//                                         selectFinancialStatement={() => {}}
//                                         handleInputChange={handleInputChange}
//                                         handleInputChange2={() => {}}
//                                         handleDeleteMemo={() => {}}
//                                         handleAddNewMemo={() => {}}
//                                         setEmployeeDataDetail={setEmployeeDataDetail}
//                                         selectRelationCode={() => {}}
//                                         handleSave={() => {}}
//                                         deleteRelationCode={() => {}}
//                                     />
//                                 )}
//                             </div>
//                         </Grow>
//                     </Grid>
//                 )}
//                 {/* 사원 등록 버튼 */}
//                 <Grid item xs={12}>
//                     <Button type="primary" onClick={showModal}>
//                         사원 등록
//                     </Button>
//                 </Grid>
//
//             </Grid>
//
//             {/* 사원 등록 모달 */}
//             <Modal
//                 title="사원 등록"
//                 visible={isModalVisible}
//                 onOk={handleRegisterEmployee}
//                 onCancel={handleCancel}
//             >
//                 <Form layout="vertical">
//                     <Form.Item label="이름">
//                         <Input
//                             name="name"
//                             value={newEmployee.name}
//                             onChange={handleInputChange}
//                         />
//                     </Form.Item>
//                     <Form.Item label="나이">
//                         <Input
//                             name="age"
//                             value={newEmployee.age}
//                             onChange={handleInputChange}
//                         />
//                     </Form.Item>
//                     <Form.Item label="부서">
//                         <Input
//                             name="department"
//                             value={newEmployee.department}
//                             onChange={handleInputChange}
//                         />
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </Box>
//     );
// };
//
// export default EmployeeDataPage;


import React, { useMemo, useState } from 'react';
import { Table, Modal, Button, Form, Input, Radio, message } from 'antd';
import { Box, Grid, Grow } from '@mui/material';
import { EMPLOYEE_API } from '../../../config/apiConstants.jsx';
import axios from 'axios';
import { employeeDataHook } from '../hooks/EmployeeDataHook';
import EmployeeDataListSection from '../components/Employee/EmployeeDataListSection.jsx';
import { employeeDataListColumn } from '../utils/EmployeeData/EmployeeDataListColumn.jsx';
import EmployeeDataDetailSection from '../../hr/components/Employee/EmployeeDataDetailSection';
import { getRowClassName } from "../utils/EmployeeData/EmployeeDataUtil.jsx";

const EmployeeDataPage = ({ initialData }) => {
    const [isModalVisible, setIsModalVisible] = useState(false); // 모달 표시 상태
    const [newEmployee, setNewEmployee] = useState({
        employeeNumber: '', lastName: '', firstName: '', dob: '', phone: '', email: '', address: '',
        joinDate: '', department: '', position: '', jobTitle: '', account: ''
    }); // 신규 사원 정보 상태
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null); // 선택된 사원 ID

    const employeeMemoizedData = useMemo(() => initialData, [initialData]);

    const {
        data,
        showDetail,
        handleSelectedRow,
        handleRowSelection,
        employeeDataDetail,
        setEmployeeDataDetail
    } = employeeDataHook(initialData);
    console.log('rendered data:', data);

    // 모달 열기 핸들러
    const showModal = () => {
        setIsModalVisible(true);
    };

    // 모달 닫기 핸들러
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // 신규 사원 등록 핸들러
    const handleRegisterEmployee = async () => {
        try {
            await axios.post(EMPLOYEE_API.SAVE_EMPLOYEE_DATA_API, newEmployee);
            setIsModalVisible(false); // 모달 닫기
            setNewEmployee({
                employeeNumber: '', lastName: '', firstName: '', dob: '', phone: '', email: '', address: '',
                joinDate: '', department: '', position: '', jobTitle: '', account: ''
            }); // 입력 필드 초기화
            message.success('사원이 성공적으로 등록되었습니다.');
            // TODO: 새로고침 또는 신규 등록된 사원 데이터 추가 로직 구현
        } catch (error) {
            console.error('Error registering employee:', error);
            message.error('사원 등록 중 오류가 발생했습니다.');
        }
    };

    // 신규 사원 정보 입력 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee((prev) => ({ ...prev, [name]: value }));
    };

    // 사원 삭제 핸들러
    const handleDeleteEmployee = async () => {
        if (!selectedEmployeeId) {
            message.warning('삭제할 사원을 선택해주세요.');
            return;
        }

        try {
            // ID를 API 엔드포인트에 전달하여 호출
            const response = await axios.delete(EMPLOYEE_API.DELETE_EMPLOYEE_DATA_API(selectedEmployeeId));
            console.log('삭제 응답:', response); // 응답 로그
            message.success('사원이 성공적으로 삭제되었습니다.');
            // TODO: 데이터 삭제 후 목록 업데이트 로직 구현
        } catch (error) {
            console.error('Error deleting employee:', error);
            message.error('사원 삭제 중 오류가 발생했습니다.');
        }
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>

                {/* 사원정보 리스트 영역 */}
                <Grid item xs={12}>
                    <Grow in={true} timeout={200}>
                        <div>
                            <EmployeeDataListSection
                                columns={employeeDataListColumn}
                                data={data}
                                handleRowSelection={(selectedRowKeys) => setSelectedEmployeeId(selectedRowKeys[0])}
                                handleSelectedRow={handleSelectedRow}
                            />
                        </div>
                    </Grow>
                </Grid>

                {/* 사원정보 상세 영역 */}
                {showDetail && (
                    <Grid item xs={12}>
                        <Grow in={showDetail} timeout={200} key={employeeDataDetail?.id}>
                            <div>
                                {employeeDataDetail && (
                                    <EmployeeDataDetailSection
                                        data={data}
                                        employeeDataDetail={employeeDataDetail}
                                        handlePopupClick={() => {}}
                                        isFinancialStatementModalVisible={false}
                                        isRelationCodeModalVisible={false}
                                        handleClose={() => {}}
                                        selectFinancialStatement={() => {}}
                                        handleInputChange={handleInputChange}
                                        handleInputChange2={() => {}}
                                        handleDeleteMemo={() => {}}
                                        handleAddNewMemo={() => {}}
                                        setEmployeeDataDetail={setEmployeeDataDetail}
                                        selectRelationCode={() => {}}
                                        handleSave={() => {}}
                                        deleteRelationCode={() => {}}
                                    />
                                )}
                            </div>
                        </Grow>
                    </Grid>
                )}

                {/* 사원 등록 및 삭제 버튼 */}
                <Grid item xs={12}>
                    <Button type="primary" onClick={showModal}>
                        사원 등록
                    </Button>
                    <Button type="danger" onClick={handleDeleteEmployee} style={{ marginLeft: 8 }}>
                        사원 삭제
                    </Button>
                </Grid>

            </Grid>

            {/* 사원 등록 모달 */}
            <Modal
                title="사원 등록"
                visible={isModalVisible}
                onOk={handleRegisterEmployee}
                onCancel={handleCancel}
            >
                <Form layout="vertical">
                    <Form.Item label="사원 번호">
                        <Input
                            name="employeeNumber"
                            value={newEmployee.employeeNumber}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label="성">
                        <Input
                            name="lastName"
                            value={newEmployee.lastName}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label="이름">
                        <Input
                            name="firstName"
                            value={newEmployee.firstName}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label="생년월일">
                        <Input
                            name="dob"
                            value={newEmployee.dob}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label="휴대폰 번호">
                        <Input
                            name="phone"
                            value={newEmployee.phone}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label="이메일">
                        <Input
                            name="email"
                            value={newEmployee.email}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label="주소">
                        <Input
                            name="address"
                            value={newEmployee.address}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label="입사 일자">
                        <Input
                            name="joinDate"
                            value={newEmployee.joinDate}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label="부서">
                        <Input
                            name="department"
                            value={newEmployee.department}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label="직위">
                        <Input
                            name="position"
                            value={newEmployee.position}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label="직책">
                        <Input
                            name="jobTitle"
                            value={newEmployee.jobTitle}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label="계좌">
                        <Input
                            name="account"
                            value={newEmployee.account}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </Box>
    );
};

export default EmployeeDataPage;
