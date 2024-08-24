// 수정 불가능한 계정과목의 행을 빨간색으로 표시하기 위한 클래스 이름 반환
export const getRowClassName = (record) => {
    return record.modificationType === false ? 'red-text' : '';
};
