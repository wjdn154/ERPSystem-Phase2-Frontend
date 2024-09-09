import {useEffect, useMemo, useState} from 'react';

export const ClientRegistrationHook = () => {
    const [activeTabKey, setActiveTabKey] = useState('1');

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    return {
        activeTabKey,
        handleTabChange,
    };
};