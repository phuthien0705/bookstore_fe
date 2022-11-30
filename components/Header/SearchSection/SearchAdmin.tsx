import { useState, FC } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Box, InputAdornment, OutlinedInput } from '@mui/material';
import { IconAdjustmentsHorizontal, IconSearch, IconX } from '@tabler/icons';
import { shouldForwardProp } from '@mui/system';
import React from 'react';

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(
  ({ theme }) => ({
    width: 250,
    paddingLeft: 16,
    paddingRight: 16,

    '& input': {
      background: 'transparent !important',
      paddingLeft: '4px !important',
      fontWeight: 'semibold !important',
    },
    [theme.breakpoints.down('lg')]: {
      width: 250,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      background: '#fff',
    },
  })
);
interface ISearchAdminSection {
  value: any;
  setValue: Function;
}
const SearchAdminSection: FC<ISearchAdminSection> = ({ value, setValue }) => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%' }}>
      <OutlineInputStyle
        id="input-search-admin"
        size="small"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Tìm kiếm"
        startAdornment={
          <InputAdornment position="start">
            <IconSearch
              stroke={1.5}
              size="1rem"
              color={theme.palette.grey[500]}
            />
          </InputAdornment>
        }
        aria-describedby="search-helper-text"
        inputProps={{ 'aria-label': 'weight' }}
      />
    </Box>
  );
};

export default SearchAdminSection;
