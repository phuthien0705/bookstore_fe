/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import {
  Grid,
  Stack,
  Typography,
  Button,
  TextField,
  Box,
  styled,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import LinearProgress from '@mui/material/LinearProgress';
import { LoadingButton } from '@mui/lab';
import { updateProfile } from '@/apis/user.api';
import { useToast } from '@/hooks/useToast';
import MainCard from '../cards/MainCard';
import { toggleSnackbar } from '@/store/snackbarReducer';
import createFormDataRequest from '@/common/createFormDataRequest';
import authService from '@/services/authService';
import useGetUserProfile from '@/hooks/user/useGetUserProfile';

const AvatarImg = styled('img')({
  width: 150,
  height: 150,
  borderRadius: '50%',
});

const ProfileTab: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const toast = useToast(dispatch, toggleSnackbar);
  const [previewAvatar, setPreviewAvatar] = useState('');
  const { data, isLoading } = useGetUserProfile();
  const defaultAvatar =
    '../../static/media/user-round.27fe79b102ea6aad2f60e66cff82818d.svg';
  const [values, setValues] = useState<any>({
    avatar: null,
    biography: '',
    address: '',
  });

  const { mutate: updateUserProfileFunc, isLoading: isUpdating } = useMutation(
    (data: any) => updateProfile(data),
    {
      onError: () => {
        toast({
          type: 'error',
          message: 'Xảy ra lỗi trong quá trình cập nhật thông tin người dùng',
        });
      },
      onSuccess: () => {
        toast({
          type: 'success',
          message: 'Cập nhật thông tin thành công',
        });
      },
    }
  );

  const handleSave = () => {
    // if (!values?.phone?.match(/\d/g) && values?.phone?.length !== 10) {
    //   toast({ type: 'info', message: 'Số điện thoại phải đúng định dạng' });
    //   return;
    // }
    const req = createFormDataRequest(
      values?.avatar
        ? {
            address: values?.address,
            biography: values?.biography,
            avatar: values?.avatar,
          }
        : {
            address: values?.address,
            biography: values?.biography,
          }
    );
    updateUserProfileFunc(req);
  };
  const handlePreviewAvatar = (e: any) => {
    const file = e.target.files[0];
    if (file?.size / 1048576 > 2) {
      toast({
        type: 'info',
        message:
          'Dung lượng hình ảnh tối đa là 2Mb, vui lòng chọn ảnh khác' +
          file?.size,
      });
      return;
    }
    // URL.revokeObjectURL(previewAvatar);
    setPreviewAvatar(URL.createObjectURL(file));
    setValues((prevValue: any) => ({
      ...prevValue,
      avatar: file,
    }));
  };

  const handleChange = (e: any) => {
    setValues((prevValue: any) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    return () => {
      values?.avatar && URL.revokeObjectURL(values?.avatar?.preview);
    };
  }, [values?.avatar]);

  useEffect(() => {
    setPreviewAvatar(data?.avatar);
    setValues((prevValue: any) => ({
      ...prevValue,
      biography: data?.biography ?? '',
      address: data?.address ?? '',
    }));
  }, [data]);
  console.log(previewAvatar);
  if (isLoading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={2} mt={1}>
      <Grid item xs={12} md={4}>
        <MainCard title="Ảnh đại diện">
          <Stack
            flexDirection="column"
            alignItems="center"
            spacing={2}
            sx={{ height: '100%' }}
          >
            <AvatarImg
              src={previewAvatar || defaultAvatar || ''}
              alt="avatar"
              referrerPolicy="no-referrer"
            />
            <Typography>Tải lên/Thay đổi ảnh đại diện.</Typography>
            <Button
              variant="contained"
              component="label"
              startIcon={<PhotoCamera />}
            >
              Tải lên
              <input
                onChange={handlePreviewAvatar}
                hidden
                accept="image/*"
                type="file"
              />
            </Button>
          </Stack>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={8}>
        <MainCard title="Chỉnh sửa thông tin chi tiết">
          <Stack spacing={3}>
            <TextField
              disabled
              label="Email"
              value={(authService.getUser() as any)?.email}
            />
            {/* <TextField
              name="address"
              label="Địa chỉ"
              value={values?.address}
              onChange={handleChange}
            /> */}
            <TextField
              name="bio"
              label="Mô tả bản thân"
              value={values?.biography}
              onChange={handleChange}
            />

            <LoadingButton
              onClick={() => handleSave()}
              loading={isUpdating}
              variant="contained"
              sx={{ width: 'fit-content' }}
            >
              Cập nhật
            </LoadingButton>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
};
export default ProfileTab;
