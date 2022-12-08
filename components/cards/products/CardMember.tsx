import { Card, Grid, CardMedia, Typography, CardContent } from '@mui/material';
import Image from 'next/image';
import LogosloganMd from '/assets/images/boxo/Logoslogan-md.png';
import useMediaQuery from '@mui/material/useMediaQuery';
import Phu from '/assets/images/boxo/giaphu.jpg';
import DKhoa from '/assets/images/boxo/dinhkhoa.jpg';
import Khanh from '/assets/images/boxo/khanh.jpg';
import Loc from '/assets/images/boxo/loc.jpg';
import Thien from '/assets/images/boxo/thien.jpg';
import AKhoa from '/assets/images/boxo/anhkhoa.jpg';
import Long from '/assets/images/boxo/long.jpg';
const CardMember = () => {
  const matches = useMediaQuery('(min-width:700px)');

  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          variant="outlined"
          sx={{
            maxWidth: 320,
            height: 500,
            borderWidth: 1,
            borderColor: '#2196f3',
          }}
        >
          <CardMedia>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '50%',
              }}
            >
              <Image
                width={320}
                height={300}
                alt="Ảnh Huỳnh Gia Phú"
                src={Phu}
              />
            </div>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h4">
              Huỳnh Gia Phú - 20521752 &#40;nhóm trưởng&#41;
            </Typography>
            <Typography variant="h5">
              <strong>Team: </strong>Back-end <br />
              <strong>Nhiệm vụ: </strong>Phân chia công việc, lập kế hoạch, quản
              lý tài liệu dự án, lập trình API, Controller, Middleware.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          variant="outlined"
          sx={{
            maxWidth: 320,
            height: 500,
            borderWidth: 1,
            borderColor: '#2196f3',
          }}
        >
          <CardMedia>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '50%',
              }}
            >
              <Image
                width={320}
                height={300}
                alt="Ảnh Hứa Phú Thiên"
                src={Thien}
              />
            </div>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h4">
              Hứa Phú Thiên - 20521946
            </Typography>
            <br />
            <Typography variant="h5">
              <strong>Team: </strong>Front-end
              <br />
              <strong>Nhiệm vụ: </strong>Thiết kế, dựng layout giao diện, khởi
              tạo source dự án, handle logic, integrate API, deploy website,
              SEO, responsive.
            </Typography>
          </CardContent>
        </Card>
      </Grid>{' '}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          variant="outlined"
          sx={{
            maxWidth: 320,
            height: 500,
            borderWidth: 1,
            borderColor: '#2196f3',
          }}
        >
          <CardMedia>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '50%',
              }}
            >
              <Image
                width={320}
                height={300}
                alt="Ảnh Phạm Đức Khánh"
                src={Khanh}
              />
            </div>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h4">
              Phạm Đức Khánh - 20521453
            </Typography>
            <br />
            <Typography variant="h5">
              <strong>Team: </strong>Back-end
              <br />
              <strong>Nhiệm vụ: </strong> Lập trình API, Controller, Model, tạo
              Dataset.
            </Typography>
          </CardContent>
        </Card>
      </Grid>{' '}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          variant="outlined"
          sx={{
            maxWidth: 320,
            height: 500,
            borderWidth: 1,
            borderColor: '#2196f3',
          }}
        >
          <CardMedia>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '50%',
              }}
            >
              <Image
                width={320}
                height={300}
                alt="Ảnh Nguyễn Anh Khoa"
                src={AKhoa}
              />
            </div>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h4">
              Nguyễn Anh Khoa - 20520584
            </Typography>
            <br />
            <Typography variant="h5">
              <strong>Team: </strong>Front-end
              <br />
              <strong>Nhiệm vụ: </strong> Lập trình giao diện.
            </Typography>
          </CardContent>
        </Card>
      </Grid>{' '}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          variant="outlined"
          sx={{
            maxWidth: 320,
            height: 500,
            borderWidth: 1,
            borderColor: '#2196f3',
          }}
        >
          <CardMedia>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '50%',
              }}
            >
              <Image
                width={320}
                height={300}
                alt="Ảnh Nguyễn Đình Khoa"
                src={DKhoa}
              />
            </div>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h4">
              Nguyễn Đình Khoa - 20520586
            </Typography>
            <br />
            <Typography variant="h5">
              <strong>Team: </strong>Front-end
              <br />
              <strong>Nhiệm vụ: </strong> Lập trình giao diện.
            </Typography>
          </CardContent>
        </Card>
      </Grid>{' '}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          variant="outlined"
          sx={{
            maxWidth: 320,
            height: 500,
            borderWidth: 1,
            borderColor: '#2196f3',
          }}
        >
          <CardMedia>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '50%',
              }}
            >
              <Image
                width={320}
                height={300}
                alt="Ảnh Châu Nhựt Long"
                src={Long}
              />
            </div>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h4">
              Châu Nhựt Long - 20520238
            </Typography>
            <br />
            <Typography variant="h5">
              <strong>Team: </strong>Back-end
              <br />
              <strong>Nhiệm vụ: </strong> Phân tích thiết kế hệ thống, xác định
              chức năng, khởi tạo source BE, tạo dựng Database, lập trình API,
              Middleware.
            </Typography>
          </CardContent>
        </Card>
      </Grid>{' '}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          variant="outlined"
          sx={{
            maxWidth: 320,
            height: 500,
            borderWidth: 1,
            borderColor: '#2196f3',
          }}
        >
          <CardMedia>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '50%',
              }}
            >
              <Image width={320} height={300} alt="Ảnh Lê Tấn Lộc" src={Loc} />
            </div>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h4">
              Lê Tấn Lộc - 20520235
            </Typography>
            <br />
            <Typography variant="h5">
              <strong>Team: </strong>Back-end
              <br />
              <strong>Nhiệm vụ: </strong> Lập trình Controller, API, vẽ usecase,
              tạo dataset, kiểm thử lỗi.
            </Typography>
          </CardContent>
        </Card>
      </Grid>{' '}
    </>
  );
};
export default CardMember;
