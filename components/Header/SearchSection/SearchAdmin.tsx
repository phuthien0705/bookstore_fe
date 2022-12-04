import { FC } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Box, InputAdornment, OutlinedInput } from '@mui/material';
import { shouldForwardProp } from '@mui/system';
import React from 'react';
import Image from 'next/image';
import SearchIcon from '@/assets/images/icons/search.svg';
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
            <Image
              src={SearchIcon}
              alt="search"
              width={20}
              height={20}
              style={{ opacity: 0.8 }}
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
