import MainCard from '../cards/MainCard';
import {
  Grid,
  Stack,
  Avatar,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import { useEffect, useState } from 'react';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import authService from '../../services/authService';

interface IProfileTab {
  userInfo: any;
  setUserInfo: Function;
}

const ProfileTab: React.FunctionComponent<IProfileTab> = ({
  userInfo,
  setUserInfo,
}) => {
  const defaultAvatar =
    '../../static/media/user-round.27fe79b102ea6aad2f60e66cff82818d.svg';
  const defaultGen = 'Nam';
  const defaultUserName = authService.isAuthenticated() && userInfo?.name;
  const defaultPhone = '+84 113 114 115';
  const defaultAddr = 'No addr';
  const [avatar, setAvatar] = useState<any>(defaultAvatar);
  const [gender, setGender] = useState(defaultGen);
  const [userName, setUserName] = useState(defaultUserName);
  const [fullName, setFullName] = useState(defaultUserName);
  const [phone, setPhone] = useState(defaultPhone);
  const [addr, setAddr] = useState(defaultAddr);
  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);
  const handleSave = () => {
    //CALL API
    console.log({ avatar, gender });
  };
  const handlePreviewAvatar = (e: any) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatar(file);
  };
  const handleSelectGender = (event: SelectChangeEvent<string>) => {
    setGender(event.target.value);
  };
  const handleChangeUserName = (e: any) => {
    setUserName(e.target.value);
  };
  const handleChangeFullName = (e: any) => {
    setFullName(e.target.value);
  };
  const handleChangePhone = (e: any) => {
    setPhone(e.target.value);
  };
  const handleChangeAddr = (e: any) => {
    setAddr(e.target.value);
  };
  useEffect(() => {
    setUserInfo(authService.getUser());
  }, [setUserInfo]);
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <MainCard title="Ảnh đại diện">
          <Stack flexDirection="column" alignItems="center" spacing={2}>
            <Avatar
              alt="Cak"
              src={avatar.preview || avatar || ''}
              sx={{ width: 150, height: 150 }}
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
      <Grid item xs={8}>
        <MainCard title="Chỉnh sửa thông tin chi tiết">
          <Stack spacing={3}>
            <TextField
              id="outlined-fullname"
              label="Họ và tên"
              value={fullName}
              onChange={handleChangeFullName}
            />
            <TextField
              id="outlined-username"
              label="Tên người dùng"
              helperText="Chỉ có thể đổi tên người dùng 1 lần mỗi 60 ngày."
              value={userName}
              onChange={handleChangeUserName}
            />
            <TextField
              id="outlined-email"
              label="Địa chỉ email"
              defaultValue="Default Value"
              InputProps={{
                readOnly: true,
              }}
            />
            <Grid container>
              <Grid item xs={2}>
                <FormControl>
                  <InputLabel id="gender">Giới tính</InputLabel>
                  <Select
                    labelId="gender"
                    id="gender-select"
                    value={gender}
                    label="Giới tính"
                    onChange={handleSelectGender}
                  >
                    <MenuItem value="Nam">Nam</MenuItem>
                    <MenuItem value="Nữ">Nữ</MenuItem>
                    <MenuItem value="Khác">Khác</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid xs={4} item>
                <TextField
                  id="outlined-birthdate"
                  label="Ngày sinh"
                  defaultValue="Default Value"
                />
              </Grid>
              <Grid xs={6} item>
                <TextField
                  id="outlined-phone"
                  label="Số điện thoại"
                  value={phone}
                  onChange={handleChangePhone}
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item sx={{ mt: 3 }}>
                <TextField
                  id="outlined-address"
                  label="Địa chỉ"
                  value={addr}
                  onChange={handleChangeAddr}
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  component="label"
                  onClick={handleSave}
                >
                  Lưu thông tin
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
};
export default ProfileTab;
