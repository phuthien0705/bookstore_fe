import ProfileTab from './ProfileTab';
import BillingTab from './BillingTab';
import SecurityTab from './SecurityTab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { SyntheticEvent, useState } from 'react';

const AccountTabs = () => {
  const [value, setValue] = useState('1');
  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: any
  ) => {
    setValue(newValue);
  };
  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Thông tin tài khoản" value="1" />
          <Tab label="Tài khoản thanh toán" value="2" />
          <Tab label="Bảo mật" value="3" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <ProfileTab />
      </TabPanel>
      <TabPanel value="2">
        <BillingTab />
      </TabPanel>
      <TabPanel value="3">
        <SecurityTab />
      </TabPanel>
    </TabContext>
  );
};
export default AccountTabs;
