import { useEffect, useState, useCallback, Dispatch } from 'react';
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import { useMutation } from 'react-query';
import { setDefaultAddress } from '@/apis/address.api';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '@/store/snackbarReducer';
import LoadingButton from '@mui/lab/LoadingButton';
import AddressForm from '../forms/AddressForm';

interface IAddressModal {
  open: boolean;
  handleClose: () => void;
  listAddress: any;
  currentAddress: any;
  setCurrentAddress: Dispatch<any>;
}

const AddressModal: React.FunctionComponent<IAddressModal> = ({
  open,
  handleClose,
  listAddress,
  currentAddress,
  setCurrentAddress,
}) => {
  console.log(listAddress);
  const dispatch = useDispatch();
  const toast = useCallback(
    ({ type, message }: { type: string; message: string }) => {
      dispatch(toggleSnackbar({ open: true, message, type }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [dispatch]
  );
  const [value, setValue] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<boolean | { data: any }>(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event?.target as any).value);
  };

  const renderListAddress = () => {
    if (listAddress) {
      return (
        <FormControl>
          <RadioGroup
            defaultValue={currentAddress?.id}
            name="radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            {listAddress.map((item: any, _index: number) => {
              return (
                <>
                  <FormControlLabel
                    sx={{
                      width: '100%',
                      '.MuiFormControlLabel-label': { width: '100%' },
                    }}
                    key={_index}
                    value={item?.id}
                    control={<Radio />}
                    label={
                      <Stack
                        sx={{ paddingLeft: 1 }}
                        justifyContent={'space-between'}
                        direction="row"
                        spacing={1}
                      >
                        <Stack spacing={0.5}>
                          <Box>
                            <Typography sx={{ fontWeight: 700 }}>
                              {item?.name} |
                            </Typography>

                            <Typography sx={{ fontWeight: 700 }}>
                              {item?.phone}
                            </Typography>
                          </Box>
                          <Typography>{item?.description}</Typography>
                          {item?.is_default === 1 && (
                            <Typography
                              sx={{
                                color: '#ee4d2d',
                                border: '1px solid #ee4d2d',
                                width: 'fit-content',
                                padding: '4px 8px',
                              }}
                            >
                              Mặc định
                            </Typography>
                          )}
                        </Stack>
                        <Button
                          onClick={() => setEditMode({ data: item })}
                          sx={{
                            width: 'fit-content',
                            whiteSpace: 'nowrap',
                            height: 'fit-content',
                          }}
                        >
                          Cập nhật
                        </Button>
                      </Stack>
                    }
                  />
                  <Divider sx={{ margin: '10px 0' }} />
                </>
              );
            })}
          </RadioGroup>
        </FormControl>
      );
    }
    return null;
  };
  const handleSubmit = () => {
    const newDefaultAddress = listAddress?.find(
      (item: any) => item?.id === Number(value)
    );
    console.log('new', newDefaultAddress);
    setCurrentAddress(newDefaultAddress);

    // close after 500ms
    setTimeout(() => {
      handleClose();
    }, 500);
  };
  useEffect(() => {
    setValue(currentAddress?.id);
  }, [currentAddress, open]);

  return (
    <Dialog onClose={() => handleClose()} open={open}>
      <Stack
        direction="column"
        sx={{ paddingLeft: 2, paddingRight: 2, paddingBottom: 0 }}
        spacing={2}
      >
        <Box
          sx={{
            paddingTop: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            backgroundColor: '#fff',
            zIndex: 100,
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Typography fontWeight="bold" fontSize="20px">
            Địa chỉ của tôi
          </Typography>
          <IconButton
            onClick={() => {
              handleClose();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        {editMode ? (
          <AddressForm setEditMode={setEditMode} currentAddress={editMode} />
        ) : (
          <>
            <Stack sx={{ marginBottom: 2 }} direction="column">
              {renderListAddress()}

              <Button
                startIcon={<AddIcon />}
                sx={{ width: 'fit-content' }}
                variant="outlined"
                onClick={() => setEditMode(true)}
              >
                Thêm địa chỉ mới
              </Button>
            </Stack>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                position: 'sticky',
                bottom: 0,
                backgroundColor: '#fff',
                paddingBottom: 2,
                marginTop: 0,
                paddingTop: 2,
                borderTop: '1px solid rgba(0,0,0,0.1)',
              }}
            >
              <Button onClick={() => handleSubmit()} variant="contained">
                Xác nhận
              </Button>
            </Box>
          </>
        )}
      </Stack>
    </Dialog>
  );
};

export default AddressModal;
