import { FC, useState, useRef, useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { Box, InputAdornment, OutlinedInput } from '@mui/material';
import { shouldForwardProp } from '@mui/system';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { ISearchAdminSection } from '@/interfaces/compontents/search.interface';

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

const SearchAdminSection: FC<ISearchAdminSection> = ({
  value,
  setValue,
  setPage,
}) => {
  const inputRef = useRef<any>(null);
  const [searchContent, setSearchContent] = useState<string>('');
  const handleSearch = useCallback(() => {
    console.log('click - search');
    setValue(searchContent);
    setPage && setPage(1);
  }, [searchContent, setPage, setValue]);
  const handleClearSearch = () => {
    setValue('');
    setSearchContent('');
    setPage && setPage(1);
  };
  useEffect(() => {
    const inputRefCurrent = inputRef?.current;
    inputRefCurrent.addEventListener('keypress', function (event: any) {
      if (event.key === 'Enter') {
        handleSearch();
      }
    });

    return () => {
      inputRefCurrent.removeEventListener('keypress');
    };
  }, [handleSearch]);

  return (
    <Box sx={{ width: '100%' }}>
      <OutlineInputStyle
        ref={inputRef}
        id="input-search-admin"
        size="small"
        value={searchContent}
        onChange={(e) => setSearchContent(e.target.value)}
        placeholder="Tìm kiếm"
        startAdornment={
          <InputAdornment
            sx={{ cursor: 'pointer' }}
            onClick={() => handleSearch()}
            position="start"
          >
            <SearchIcon />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment
            sx={{ cursor: 'pointer' }}
            onClick={() => handleClearSearch()}
            position="end"
          >
            {searchContent && <CloseIcon />}
          </InputAdornment>
        }
        aria-describedby="search-helper-text"
        inputProps={{ 'aria-label': 'weight' }}
      />
    </Box>
  );
};

export default SearchAdminSection;
