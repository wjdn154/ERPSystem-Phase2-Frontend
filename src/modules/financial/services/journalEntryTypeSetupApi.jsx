import axios from 'axios';
import { FINANCIAL_API } from '../../../config/apiConstants.jsx';

// // 분개유형 출력 함수
// export const showJournalEntrySetup = async () => {
//     try {
//         const response = await axios.post(FINANCIAL_API.SHOW_JOURNAL_ENTRY_TYPE_SETUP_API);
//         return response.data;
//     } catch (error) {
//         console.error("분개 유형 설정 정보를 가져오는데 실패하였습니다.", error);
//         throw error;
//     }
// };
// export const updateAccountSubjectDetail = async (code, accountSubjectDetail) => {
//     try {
//         await axios.put(FINANCIAL_API.UPDATE_ACCOUNT_SUBJECT_API(code),
//             accountSubjectDetail
//         );
//     } catch (error) {
//         console.error("계정과목 정보를 업데이트 하는 중 오류 발생:", error);
//         throw error;
//     }
// };
//
//
// const handleSave = async ({selectedSubject}) => {
//     if (selectedSubject) {
//         try {
//             // 서버로 데이터 전송
//             const response = await axios.post(FINANCIAL_API.UPDATE_JOURNAL_ENTRY_TYPE_SETUP_API, {
//                 journalEntryTypeId: selectedSubject.id,
//                 accountSubjectName: selectedSubject.name,
//                 accountSubjectCode: selectedSubject.code,
//             });
//
//             if (response.status === 200) {
//                 // 업데이트 성공 시 데이터 반영
//                 const updatedData = data.map((item) =>
//                     item.journalEntryTypeId === selectedSubject.id ?
//                         { ...item, accountSubjectName: selectedSubject.name, accountSubjectCode: selectedSubject.code } : item
//                 );
//                 setData(updatedData);
//                 setIsModalVisible(false); // 모달 닫기
//             } else {
//                 console.error("실패:", response.data);
//             }
//         } catch (error) {
//             console.error("업데이트 실패", error);
//         }
//     } else {
//         console.log("선택한 항목이 없음");
//     }
// };

