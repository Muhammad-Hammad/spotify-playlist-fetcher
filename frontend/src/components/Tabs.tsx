import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const TabButton = styled(motion.button)<{ active: boolean }>`
  padding: 10px 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-weight: bold;
  color: ${(props) => (props.active ? '#1db954' : '#ccc')};
  border-bottom: ${(props) =>
    props.active ? '2px solid #1db954' : '2px solid transparent'};
  transition:
    color 0.3s ease,
    border-bottom 0.3s ease;

  &:hover {
    color: white;
  }
`;

const TabPanel = styled(motion.div)`
  padding: 5px;
  background: #191414;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface CustomTabsProps {
  tabs: { label: string; content: JSX.Element }[];
  defaultIndex?: number;
  onTabChange?: (tab: string) => void;
  value?: string; // Add value prop
}

const Tabs: React.FC<CustomTabsProps> = ({
  tabs,
  defaultIndex = 0,
  onTabChange,
  value,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  useEffect(() => {
    if (value) {
      const index = tabs.findIndex((tab) => tab.label === value);
      if (index !== -1) {
        setSelectedIndex(index);
      }
    }
  }, [value, tabs]);

  const handleTabChange = (index: number) => {
    setSelectedIndex(index);
    if (onTabChange) {
      onTabChange(tabs[index].label);
    }
  };

  return (
    <div>
      <TabContainer>
        {tabs.map((tab, index) => (
          <TabButton
            key={tab.label}
            active={selectedIndex === index}
            onClick={() => handleTabChange(index)}
            whileHover={{ scale: 1.1 }}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabContainer>
      <TabPanel
        initial="hidden"
        animate="visible"
        variants={tabVariants}
        transition={{ duration: 0.3 }}
      >
        {tabs[selectedIndex].content}
      </TabPanel>
    </div>
  );
};

export default Tabs;
