import { useState } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import {
  Avatar,
  Box,
  ButtonBase,
  Card,
  Grid,
  InputAdornment,
  OutlinedInput,
  Popper,
  useMediaQuery,
} from '@mui/material';
import { IconSearch } from '@tabler/icons';
import { shouldForwardProp } from '@mui/system';

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(
  ({ theme }) => ({
    width: 300,
    height: 33,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    '& input': {
      background: 'transparent !important',
      paddingLeft: '4px !important',
    },
    [theme.breakpoints.down('lg')]: {
      width: 250,
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginLeft: 0,
      background: '#fff',
    },
  })
);

const SearchSection = () => {
  const theme = useTheme();
  const [value, setValue] = useState('');
  const matches = useMediaQuery('(min-width:900px)');

  return (
    <>
      <Box
        sx={{
          width: '100%',
          marginRight: 0.5,
          marginLeft: { xs: 0, md: 1.5 },
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <OutlineInputStyle
          sx={{ width: matches ? '300px' : '100%' }}
          id="input-search-header"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Tìm kiếm sản phẩm tại đây"
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
    </>
  );
};

export default SearchSection;
