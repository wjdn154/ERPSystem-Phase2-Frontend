import React from 'react';
import { Tree } from 'antd';

const HierarchyGroupListSection = ({
                                       hierarchyGroups, // 트리 데이터
                                       expandedKeys, // 확장된 노드 키
                                       toggleExpand, // 확장 토글 함수
                                       onSelectGroup, // 선택된 그룹 처리 함수
                                   }) => {
    // 트리 노드 생성 함수 (재귀)
    const generateTreeNodes = (groups) =>
        groups.map((group) => ({
            key: group.id,
            title: `${group.code} - ${group.name}`,
            children: group.childGroups ? generateTreeNodes(group.childGroups) : [],
        }));

    return (
        <Tree
            treeData={generateTreeNodes(hierarchyGroups)}
            expandedKeys={expandedKeys}
            onExpand={toggleExpand}
            onSelect={(selectedKeys) => onSelectGroup(selectedKeys[0])} // 첫 번째 선택된 ID 전달
            showLine={{ showLeafIcon: false }}
            style={{ marginBottom: '20px' }}
        />
    );
};

export default HierarchyGroupListSection;
