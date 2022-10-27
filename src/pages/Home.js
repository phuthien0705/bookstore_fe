import * as React from 'react';
import { Typography, Card, CardActionArea, CardMedia, CardContent, Grid, Rating, Container, Button, Stack } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const sampleData = [
    {
        name: 'product 1',
        description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '30000',
        rating: 4.5
    },
    {
        name: 'product 1',
        description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '30000',
        rating: 4.5
    },
    {
        name: 'product 1',
        description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '30000',
        rating: 4.5
    },
    {
        name: 'product 1',
        description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '30000',
        rating: 4.5
    },
    {
        name: 'product 1',
        description: 'Ga osi ovemosoki kon hohon raepi jegjoted no ki waetahe',
        image: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
        price: '30000',
        rating: 4.5
    }
];
const useStyles = makeStyles({
    root: (theme) => ({
        transition: 'transform 0.3s ease-in-out',
        '&:hover': { transform: 'scale3d(1.02, 1.02, 1)' }
    })
});
const Home = () => {
    const theme = useTheme();

    const classes = useStyles(theme);

    const renderCardItem = () => {
        return sampleData?.length > 0 ? (
            sampleData.map((product, index) => {
                return (
                    <Grid item xs={12 / 5} key={index} sx={{ padding: 0.5 }}>
                        <Card className={classes.root} sx={{ maxWidth: 345 }}>
                            <CardMedia component="img" height="200" image={product?.image} alt={product?.name} />
                            <CardContent sx={{ padding: 2 }}>
                                <Stack spacing={1} direction="column">
                                    <Typography gutterBottom variant="h5" component="div" sx={{ margin: 0 }}>
                                        {product?.name}
                                    </Typography>
                                    <Stack>
                                        {/* <Typography gutterBottom variant="caption" component="div">
                                            {product?.description}
                                        </Typography> */}
                                        <Rating size="small" name="read-only" value={product?.rating} readOnly precision={0.5} />
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography gutterBottom fontWeight="bold" component="div" color="#000" fontSize="16px">
                                            {product?.price}
                                        </Typography>
                                        <Button variant="contained" sx={{ padding: 0, width: 'fit-content', minWidth: 0 }}>
                                            <ShoppingCartOutlinedIcon fontSize="small" sx={{ margin: '5px 10px' }} />
                                        </Button>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })
        ) : (
            <p>Chưa có sản phẩm.</p>
        );
    };
    return (
        <Container>
            {' '}
            {/* <Typography variant="body2">Loading...</Typography> */}
            <Grid container spacing={{ xs: 1, lg: 2 }}>
                {renderCardItem()}
            </Grid>
            {/* <Card sx={{ maxWidth: 345 }}>
               <CardActionArea>
                   <CardMedia component="img" height="140" image="/static/images/cards/contemplative-reptile.jpg" alt="green iguana" />
                   <CardContent>
                       <Typography gutterBottom variant="h5" component="div">
                           Lizard
                       </Typography>
                       <Typography variant="body2" color="text.secondary">
                           Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents
                           except Antarctica
                       </Typography>
                   </CardContent>
               </CardActionArea>
           </Card> */}
        </Container>
    );
};

export default Home;
