import ProfileTab from './ProfileTab';
import SecurityTab from './SecurityTab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { IAccountTabs } from '@/interfaces/compontents/profile.interface';

const AccountTabs: React.FunctionComponent<IAccountTabs> = ({
  userInfo,
  setUserInfo,
}) => {
  const [currentTab, setCurrentTab] = useState('1');
  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: any
  ) => {
    setCurrentTab(newValue);
  };
  console.log(userInfo);
  return (
    <TabContext value={currentTab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange}>
          <Tab label="Thông tin tài khoản" value="1" />
          <Tab label="Địa chỉ" value="2" />
          <Tab label="Bảo mật" value="3" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <ProfileTab userInfo={userInfo} setUserInfo={setUserInfo} />
      </TabPanel>

      <TabPanel value="2">
        <SecurityTab />
      </TabPanel>
    </TabContext>
  );
};
export default AccountTabs;
