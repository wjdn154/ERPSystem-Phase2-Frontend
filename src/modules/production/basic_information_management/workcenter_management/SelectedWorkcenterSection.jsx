import React from 'react';
import { Form, Input, Tag, Select } from 'antd';
import { ActionButtons, showDeleteConfirm } from '../../common/commonActions.jsx';  // 공통 버튼 및 다이얼로그
import { isTrueOptions, workcenterTypeOptions } from '../../common/dropdownOptions.jsx';  // 공통 드롭다운 옵션

const SelectedWorkcenterSection = ({
                                     workcenter,
                                     handleInputChange,
                                     handleSave,
                                     handleDeleteWorkcenter,
                                       handleWorkcenterTypeChange,
                                   }) => {

    // 작업장 유형을 한국어로 매핑하는 함수
    const typeToKorean = {
        Press: '프레스',
        Welding: '용접',
        Paint: '도장',
        Machining: '정밀 가공',
        Assembly: '조립',
        'Quality Inspection': '품질 검사',
        Casting: '주조',
        Forging: '단조',
        'Heat Treatment': '열처리',
        'Plastic Molding': '플라스틱 성형'
    };

    // 작업장 유형을 영어로 매핑하는 함수 (드롭다운 선택 후 원래 값으로 되돌릴 때 사용)
    const koreanToType = {
        '프레스': 'Press',
        '용접': 'Welding',
        '도장': 'Paint',
        '정밀 가공': 'Machining',
        '조립': 'Assembly',
        '품질 검사': 'Quality Inspection',
        '주조': 'Casting',
        '단조': 'Forging',
        '열처리': 'Heat Treatment',
        '플라스틱 성형': 'Plastic Molding'
    };

    // 삭제 확인 다이얼로그 호출
  const handleDelete = () => {
    showDeleteConfirm(
        '이 작업은 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?',
        () => handleDeleteWorkcenter(workcenter.code)
    );
  };

  if (!workcenter) {
    return <div>작업장을 선택하면 상세 조회할 수 있습니다.</div>;
  }

  return (
      <div style={{ padding: '20px', position: 'relative' }}>
        <Form layout="vertical" initialValues={workcenter}>

          <Form.Item label="작업장 코드">
            <Input
                value={workcenter.code}
                onChange={(e) => handleInputChange(e, 'code')}
                disabled
            />
          </Form.Item>

          <Form.Item label="작업장명">
            <Input
                value={workcenter.name}
                onChange={(e) => handleInputChange(e, 'name')}
            />
          </Form.Item>
            {/* 작업장 유형 (한국어로 표시하고, 선택 시 영어로 변환) */}
            <Form.Item label="작업장 유형">
                <Select
                    value={typeToKorean[workcenter.workcenterType] || workcenter.workcenterType} // 현재 값이 한국어로 변환된 값
                    onChange={(value) => {
                        const englishType = koreanToType[value];  // 선택한 한국어 값을 영어로 변환
                        handleWorkcenterTypeChange(englishType, 'workcenterType'); // 영어 값을 workcenterType으로 상태 업데이트
                    }}
                    options={Object.keys(koreanToType).map((key) => ({
                        label: key,  // 드롭다운에서 한국어를 표시
                        value: key   // 한국어 값 선택
                    }))}
                />
            </Form.Item>

        {/* 활성 상태 라벨과 드롭다운 */}
          <Form.Item label="사용여부">
            <Select
                value={workcenter.isActive ? '사용중' : '미사용'}  // boolean 값에 따른 라벨 변경
                options={[
                    { label: '사용중', value: true },
                    { label: '미사용', value: false }
                ]}  // 옵션에서 true/false 값을 선택하게 변경
                onChange={(value) => handleInputChange({ target: { value } }, 'isActive')}
            />
          </Form.Item>

          {/* 공장 코드 */}
          <Form.Item label="공장명">
            <Input
                value={workcenter.factoryName || ''}
                onChange={(e) => handleInputChange(e, 'factoryName')}
            />
          </Form.Item>

          {/* 공정 코드 */}
          <Form.Item label="생산공정 코드">
            <Input
                value={workcenter.processCode || ''}
                onChange={(e) => handleInputChange(e, 'processCode')}
            />
          </Form.Item>
          {/* 공정 코드 */}
          <Form.Item label="생산공정명">
            <Input
                value={workcenter.processName || ''}
                onChange={(e) => handleInputChange(e, 'processName')}
            />
          </Form.Item>

        </Form>

        {/* 공통 ActionButtons 컴포넌트 사용 */}
        <ActionButtons
            onSave={handleSave}
            onDelete={handleDelete}
        />
      </div>
  );
};

export default SelectedWorkcenterSection;
