import React, { useEffect, useState } from 'react';
import { Tree, Typography, Empty } from 'antd';
import { getHierarchyGroupList } from './HierarchyGroupApi';

// 데이터를 트리 형식으로 변환하는 함수
const transformDataToTree = (data = []) =>
    data.map((group) => ({
        title: group.hierarchyGroupName || '이름 없음',
        key: group.id,
        children: transformDataToTree(group.childGroups || []),
    }));

const HierarchyTree = ({ onSelectGroup }) => {
    const [treeData, setTreeData] = useState([]); // 트리 데이터
    const [expandedKeys, setExpandedKeys] = useState([]); // 확장된 노드 키
    const [selectedKeys, setSelectedKeys] = useState([]); // 선택된 노드 키

    // API로 계층 그룹 목록을 가져오는 함수
    const fetchHierarchyGroups = async () => {
        try {
            const data = await getHierarchyGroupList();
            const transformedData = transformDataToTree(data);
            setTreeData(transformedData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchHierarchyGroups();
    }, []);

    // 선택된 그룹 ID 전달
    const handleSelect = (selectedKeys) => {
        setSelectedKeys(selectedKeys);
        if (selectedKeys.length > 0) {
            onSelectGroup(selectedKeys[0]);
        }
    };

    const handleExpand = (expandedKeys) => setExpandedKeys(expandedKeys);

    return (
        <div style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'left', padding: '20px' }}>
            <Typography.Title level={4} style={{ marginBottom: '10px' }}>
                계층 그룹
            </Typography.Title>

            {treeData.length === 0 ? (
                <Empty description="계층 그룹이 없습니다." />
            ) : (
                <Tree
                    treeData={treeData}
                    expandedKeys={expandedKeys}
                    selectedKeys={selectedKeys}
                    onExpand={handleExpand}
                    onSelect={handleSelect}
                    showLine={{ showLeafIcon: false }}
                    switcherIcon={<span>▶</span>}
                    style={{
                        maxWidth: '100%',
                        overflowY: 'auto',
                        maxHeight: '300px',
                        padding: '5px',
                        background: 'none',
                    }}
                />
            )}
        </div>
    );
};

export default HierarchyTree;
