import { Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ProductCardItem from './ProductCardItem';
import { makeStyles } from '@mui/styles';
import config from 'config';

const useStyles = makeStyles({
    container: (props) => ({
        display: 'flex',
        rowGap: '0.2rem',
        flexDirection: 'column',
        borderRadius: config.borderRadius,
        backgroundColor: '#fff',
        overflow: 'hidden'
    }),
    title: (props) => ({
        backgroundColor: props.titleBackground,
        padding: '1rem'
    })
});

const ProductCardItems = ({ data, title, titleIcon, titleBackground = '#fff' }) => {
    const classes = useStyles({ titleBackground });
    const renderProducts = () => {
        return data?.length > 0 ? (
            data.map((product, index) => {
                return <ProductCardItem key={index} product={product} />;
            })
        ) : (
            <Typography>Chưa có sản phẩm.</Typography>
        );
    };

    return (
        <section className={classes.container}>
            <Stack className={classes.title} direction={'row'} spacing={1}>
                {titleIcon ? titleIcon : null}
                <Typography fontWeight={'bold'} fontSize={'1rem'} variant={'h5'}>
                    {title}
                </Typography>
            </Stack>
            <Stack sx={{ p: 1 }}>
                <Grid container spacing={{ xs: 1, lg: 2 }}>
                    {renderProducts()}
                </Grid>
            </Stack>
        </section>
    );
};
ProductCardItems.propTypes = {
    data: PropTypes.any.isRequired,
    title: PropTypes.string,
    titleIcon: PropTypes.node,
    titleBackground: PropTypes.string
};
export default ProductCardItems;
