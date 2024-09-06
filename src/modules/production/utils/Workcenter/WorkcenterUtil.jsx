// getRowClassName 함수 정의
export const getRowClassName = (record) => {
    return record.isActive ? 'active-row' : 'inactive-row';
};