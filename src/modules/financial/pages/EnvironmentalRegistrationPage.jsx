// import React, { useState } from 'react';
// import { Table, Divider, Button, Modal } from 'antd';
// import { fetchAccountSubject } from "../services/AccountSubjectApi.jsx";
// import {FINANCIAL_API} from "../../../config/apiConstants.jsx";
// import axios from 'axios';
//
// const EnvironmentalRegistrationPage = ({ initialData }) => {
//     const [data, setData] = useState(initialData);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [accountSubjects, setAccountSubjects] = useState([]);
//
//     // 서버에서 AccountSubjectsAndMemosDTO를 받아와 처리하는 함수
//     const handleFetchAndShowModal = async () => {
//         try {
//             // 서버에서 데이터를 가져옴 (AccountSubjectsAndMemosDTO를 반환)
//             const result = await fetchAccountSubject();
//
//             // result.accountSubjects에서 이름과 코드를 가져와서 테이블에 사용
//             setAccountSubjects(result.accountSubjects);
//             setIsModalVisible(true); // 모달 창을 띄움
//         } catch (error) {
//             console.error("계정과목 조회 실패", error);
//         }
//     };
//
//     // 모달 닫기
//     const handleCancel = () => {
//         setIsModalVisible(false);
//     };
//
//     // 선택한 계정과목을 저장하는 함수
//     const handleSave = async (selectedSubject) => {
//         if (selectedSubject) {
//             try {
//                 // 서버로 데이터 전송
//                 const response = await axios.post(FINANCIAL_API.UPDATE_JOURNAL_ENTRY_TYPE_SETUP_API, {
//                     journalEntryTypeId: selectedSubject.id,
//                     accountSubjectCode: selectedSubject.code
//                 });
//
//                 if (response.status === 200) {
//                     // 업데이트 성공 시 데이터 반영
//                     const updatedData = data.map((item) =>
//                         item.journalEntryTypeId === selectedSubject.id ?
//                             { ...item, accountSubjectName: selectedSubject.name, accountSubjectCode: selectedSubject.code } : item
//                     );
//                     setData(updatedData);
//                     setIsModalVisible(false); // 모달 닫기
//                 } else {
//                     console.error("업데이트 실패", response.data);
//                 }
//             } catch (error) {
//                 console.error("저장 에러", error);
//             }
//         } else {
//             console.log("선택되지 않음");
//         }
//     };
//
//
//     // 메인 테이블의 컬럼 정의
//     const columns = [
//         {
//             title: <span>분개유형</span>,
//             dataIndex: 'journalEntryTypeName'
//         },
//         {
//             title: <span>계정과목</span>,
//             dataIndex: 'accountSubjectName'
//         },
//         {
//             title: <span>계정과목 코드</span>,
//             dataIndex: 'accountSubjectCode'
//         },
//         {
//             render: (_, record) => (
//                 <div>
//                     <Button
//                         type="primary"
//                         onClick={handleFetchAndShowModal} // 클릭 시 데이터 조회 및 모달 표시
//                     >
//                         계정과목 조회
//                     </Button>
//                 </div>
//             ),
//         }
//     ];
//
//     // 모달 내의 테이블에서 사용할 열 정의
//     const subjectColumns = [
//         {
//             title: <span>계정과목 이름</span>,
//             dataIndex: 'name',
//             key: 'name',
//         },
//         {
//             title: <span>계정과목 코드</span>,
//             dataIndex: 'code',
//             key: 'code',
//         }
//     ];
//
//     return (
//         <div>
//             <Divider>2. 분개 유형 설정</Divider>
//             <Table
//                 columns={columns}
//                 dataSource={data}
//                 rowKey="journalEntryTypeId"
//                 size="small"
//             />
//
//             {/* 계정과목 조회 결과를 표시하는 모달 */}
//             <Modal
//                 title="계정과목 조회"
//                 visible={isModalVisible}
//                 onCancel={handleCancel}
//                 footer={[
//                     <Button key="cancel" onClick={handleCancel}>
//                         취소
//                     </Button>,
//                     <Button key="save" type="primary" onClick={handleSave}>
//                         저장
//                     </Button>
//                 ]}>
//                 <Table
//                     columns={subjectColumns}
//                     dataSource={accountSubjects}
//                     rowKey="id"
//                     size="small"
//                 />
//             </Modal>
//         </div>
//     );
// };
//
// export default EnvironmentalRegistrationPage;

import React, { useState } from 'react';
import { Table, Divider, Button, Modal } from 'antd';
import axios from 'axios';
import { fetchAccountSubject } from "../services/AccountSubjectApi.jsx";
import {FINANCIAL_API} from "../../../config/apiConstants.jsx";

const EnvironmentalRegistrationPage = ({ initialData }) => {
    const [data, setData] = useState(initialData);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [accountSubjects, setAccountSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null); // 선택된 계정과목

    // 계정과목 목록 조회
    const handleFetchAndShowModal = async () => {
        try {
            const result = await fetchAccountSubject();
            setAccountSubjects(result.accountSubjects);
            setIsModalVisible(true); // 모달 창을 띄움
        } catch (error) {
            console.error("계정과목 목록 생성 오류", error);
        }
    };

    // 모달 닫기
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // 선택한 계정과목으로 변경
    const handleSave = async () => {
      console.log(selectedSubject);
        if (selectedSubject) {
            try {
                const response = await axios.post(FINANCIAL_API.UPDATE_JOURNAL_ENTRY_TYPE_SETUP_API, {
                    journalEntryTypeId: selectedSubject.id,
                    accountSubjectCode: selectedSubject.code
                });
                console.log(response);

                if (response.status === 200) {
                    const updatedData = data.map((item) =>
                        item.journalEntryTypeId === selectedSubject.id ?
                            { ...item, accountSubjectName: selectedSubject.name, accountSubjectCode: selectedSubject.code } : item
                    );
                    setData(updatedData);
                    setIsModalVisible(false); // 모달 닫기
                } else {
                    console.error("업데이트 실패", response.data);
                }
            } catch (error) {
                console.error("저장 에러", error);
            }
        } else {
            console.log("선택되지 않음");
        }
    };

    // 메인 테이블의 컬럼 정의
    const columns = [
        {
            title: <span>분개유형</span>,
            dataIndex: 'journalEntryTypeName'
        },
        {
            title: <span>계정과목</span>,
            dataIndex: 'accountSubjectName'
        },
        {
            title: <span>계정과목 코드</span>,
            dataIndex: 'accountSubjectCode'
        },
        {
            render: (_, record) => (
                <div>
                    <Button
                        type="primary"
                        onClick={handleFetchAndShowModal} // 클릭 시 데이터 조회 및 모달 표시
                    >
                        계정과목 조회
                    </Button>
                </div>
            ),
        }
    ];

    // 모달 내의 테이블에서 사용할 열 정의
    const subjectColumns = [
        {
            title: <span>계정과목 이름</span>,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: <span>계정과목 코드</span>,
            dataIndex: 'code',
            key: 'code',
        }
    ];

    return (
        <div>
            <Divider>2. 분개 유형 설정</Divider>
            <Table
                columns={columns}
                dataSource={data}
                rowKey="journalEntryTypeId"
                size="small"
            />
            <Modal
                title="계정과목 조회"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        취소
                    </Button>,
                    <Button key="save" type="primary" onClick={handleSave}>
                        저장
                    </Button>
                ]}
            >
                <Table
                    columns={subjectColumns}
                    dataSource={accountSubjects}
                    rowKey="id"
                    size="small"
                    onRow={(record) => ({
                        onClick: () => {
                            setSelectedSubject(record); // 선택한 계정과목 설정
                        }
                    })}
                    rowSelection={{
                        type: "radio",
                        selectedRowKeys: selectedSubject ? [selectedSubject.id] : [],
                        onChange: (_, selectedRows) => {
                            setSelectedSubject(selectedRows[0]);
                        }
                    }}
                />
            </Modal>
        </div>
    );
};

export default EnvironmentalRegistrationPage;