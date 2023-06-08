import { Card, Grid, CardMedia } from '@mui/material';
const CardMember = () => {
  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          className="shadow"
          variant="outlined"
          sx={{
            maxWidth: 300,
            borderWidth: 1,
          }}
        >
          <CardMedia
            component="img"
            image="img/thien.jpg"
            height="300"
            title="Thiên"
            sx={{ height: 300 }}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          className="shadow"
          variant="outlined"
          sx={{
            maxWidth: 300,

            borderWidth: 1,
          }}
        >
          <CardMedia
            component="img"
            image="img/giaphu.jpg"
            height="300"
            title="Phú"
            sx={{ height: 300 }}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          className="shadow"
          variant="outlined"
          sx={{
            maxWidth: 300,
            borderWidth: 1,
          }}
        >
          <CardMedia
            component="img"
            image="img/khanh.jpg"
            height="300"
            title="Khanh"
            sx={{ height: 300 }}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          className="shadow"
          variant="outlined"
          sx={{
            maxWidth: 300,
            borderWidth: 1,
          }}
        >
          <CardMedia
            component="img"
            image="img/anhkhoa.jpg"
            height="300"
            title="AnhKhoa"
            sx={{ height: 300 }}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          variant="outlined"
          className="shadow"
          sx={{
            maxWidth: 300,
            borderWidth: 1,
          }}
        >
          <CardMedia
            component="img"
            image="img/long.jpg"
            height="300"
            title="Nhựt Long"
            sx={{ height: 300 }}
          />
        </Card>
      </Grid>{' '}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          variant="outlined"
          className="shadow"
          sx={{
            maxWidth: 300,
            borderWidth: 1,
          }}
        >
          <CardMedia
            component="img"
            image="img/loc.jpg"
            height="300"
            title="Tấn Lộc"
            sx={{ height: 300 }}
          />
        </Card>
      </Grid>{' '}
    </>
  );
};
export default CardMember;
