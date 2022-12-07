import { Card, Grid, CardMedia, Typography, CardContent } from '@mui/material';
import Image from 'next/image';
import LogosloganMd from '/assets/images/boxo/Logoslogan-md.png';
import useMediaQuery from '@mui/material/useMediaQuery';
const CardMember = () => {
  const matches = useMediaQuery('(min-width:700px)');

  return (
    <>
      <Grid item xs={12} sm={6}  md={4} lg={3}>
        <Card
          variant="outlined"
          sx={{
            maxWidth: 320,
            height: 500,
            borderWidth: 1,
            borderColor: '#F5F5F5F5',
          }}
        >
          <CardMedia>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
              }}
            >
              <Image
                style={{
                  marginLeft: 30,
                  marginTop: 20,
                  marginBottom: 20,
                  padding: 10,
                }}
                alt="BOXO Logo-Slogan"
                src={LogosloganMd}
              />
            </div>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              Huỳnh Gia Phú - 20521752 &#40;nhóm trưởng&#41;
            </Typography>
            <Typography>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    <Grid item xs={12} sm={6}  md={4} lg={3}>
        <Card
          variant="outlined"
          sx={{
            maxWidth: 320,
            borderWidth: 1,
            height: 500,
            borderColor: '#F5F5F5F5',
          }}
        >
          <CardMedia>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
              }}
            >
              <Image
                style={{
                  marginLeft: 30,
                  marginTop: 20,
                  marginBottom: 20,
                  padding: 10,
                }}
                alt="BOXO Logo-Slogan"
                src={LogosloganMd}
              />
            </div>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              Hứa Phú Thiên - 20521946
            </Typography>
            <Typography>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
      </Grid>{' '}
    <Grid item xs={12} sm={6}  md={4} lg={3}>
        <Card
          variant="outlined"
          sx={{
            maxWidth: 320,
            borderWidth: 1,
            height: 500,
            borderColor: '#F5F5F5F5',
          }}
        >
          <CardMedia>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
              }}
            >
              <Image
                style={{
                  marginLeft: 30,
                  marginTop: 20,
                  marginBottom: 20,
                  padding: 10,
                }}
                alt="BOXO Logo-Slogan"
                src={LogosloganMd}
              />
            </div>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              Phạm Đức Khánh - 20521453
            </Typography>
            <Typography>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
      </Grid>{' '}
    <Grid item xs={12} sm={6}  md={4} lg={3}>
        <Card
          variant="outlined"
          sx={{
            maxWidth: 320,
            borderWidth: 1,
            height: 500,
            borderColor: '#F5F5F5F5',
          }}
        >
          <CardMedia>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
              }}
            >
              <Image
                style={{
                  marginLeft: 30,
                  marginTop: 20,
                  marginBottom: 20,
                  padding: 10,
                }}
                alt="BOXO Logo-Slogan"
                src={LogosloganMd}
              />
            </div>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              Nguyễn Anh Khoa - 20520584
            </Typography>
            <Typography>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
      </Grid>{' '}
    <Grid item xs={12} sm={6}  md={4} lg={3}>
        <Card
          variant="outlined"
          sx={{
            maxWidth: 320,
            borderWidth: 1,
            height: 500,
            borderColor: '#F5F5F5F5',
          }}
        >
          <CardMedia>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
              }}
            >
              <Image
                style={{
                  marginLeft: 30,
                  marginTop: 20,
                  marginBottom: 20,
                  padding: 10,
                }}
                alt="BOXO Logo-Slogan"
                src={LogosloganMd}
              />
            </div>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              Nguyễn Đình Khoa - 20520586
            </Typography>
            <Typography>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
      </Grid>{' '}
    <Grid item xs={12} sm={6}  md={4} lg={3}>
        <Card
          variant="outlined"
          sx={{
            maxWidth: 320,
            borderWidth: 1,
            height: 500,
            borderColor: '#F5F5F5F5',
          }}
        >
          <CardMedia>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
              }}
            >
              <Image
                style={{
                  marginLeft: 30,
                  marginTop: 20,
                  marginBottom: 20,
                  padding: 10,
                }}
                alt="BOXO Logo-Slogan"
                src={LogosloganMd}
              />
            </div>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              Châu Nhựt Long - 20520238
            </Typography>
            <Typography>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
      </Grid>{' '}
    <Grid item xs={12} sm={6}  md={4} lg={3}>
        <Card
          variant="outlined"
          sx={{
            maxWidth: 320,
            borderWidth: 1,
            height: 500,
            borderColor: '#F5F5F5F5',
          }}
        >
          <CardMedia>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
              }}
            >
              <Image
                style={{
                  marginLeft: 30,
                  marginTop: 20,
                  marginBottom: 20,
                  padding: 10,
                }}
                alt="BOXO Logo-Slogan"
                src={LogosloganMd}
              />
            </div>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              Lê Tấn Lộc - 20520235
            </Typography>
            <Typography>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
      </Grid>{' '}
    </>
  );
};
export default CardMember;
