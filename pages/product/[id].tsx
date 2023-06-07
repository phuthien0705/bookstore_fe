/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Divider,
  Link,
  Paper,
  Rating,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import ProductInfo from '../../components/productdetails/ProductInfo';
import ProductSlides from '../../components/productdetails/ProductSlides';
import useGetListBookDetail from '../../hooks/book/useGetListBookDetail';
import ProductLayout from '../../layout/ProductLayot';
import LoadingScreen from '../../components/loading/LoadingScreen';
import useGetRelativeBook from '@/hooks/book/useGetRelativeBook';
import { FormattedMessage } from 'react-intl';
import ReviewItem from '@/components/review/ReviewItem';
import CreateIcon from '@mui/icons-material/Create';
import authService from '@/services/authService';
import ReviewModal from '@/components/modals/ReviewModal';

const ProductDetail = () => {
  const theme = useTheme();
  const router = useRouter();
  const [id, setId] = useState(null);
  const desRef = useRef<HTMLDivElement>(null);
  const [hiddenDescriptionFlag, setHiddenDescriptionFlag] =
    useState<boolean>(false);
  const [hiddenDescription, setHiddenDescription] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState<boolean>(false);
  const [reviewBook, setReviewBook] = useState({
    id: '',
    name: '',
    images: '',
  });
  const { data, isLoading } = useGetListBookDetail(id, !!id);
  const {
    data: slideData,
    isLoading: isSlideLoading,
    isFetching: isSlideFetching,
  } = useGetRelativeBook(data, !!data);

  const numberOfLine = () => {
    if (desRef?.current) return desRef?.current?.clientHeight / 20;
    return 0;
  };

  const reviews = [
    {
      user: 'Huỳnh Gia Phú',
      rating: 1,
      comment: 'Sách dở, không đáng đọc',
    },
    {
      user: 'Lê Tấn Lộc',
      rating: 5,
      comment: 'Sách hay',
    },
    {
      user: 'Châu Nhật Long',
      rating: 3,
      comment: 'Sách đọc oke',
    },
    {
      user: 'Hứa Phú Thiên',
      rating: 1,
      comment: 'Sách quá tệ',
    },
  ];

  useEffect(() => {
    if (router.isReady) {
      setId(router?.query?.id as any);
    }
  }, [router, setId]);

  useEffect(() => {
    if (numberOfLine() > 3 && !hiddenDescriptionFlag) {
      setHiddenDescription(true);
      setHiddenDescriptionFlag(true);
    }
  });

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ProductLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: theme.spacing(2),
        }}
      >
        <Paper
          sx={{
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack>
            <Stack direction="row">
              <ProductInfo data={data} isLoading={isLoading} />
            </Stack>

            {/* product info */}
            <Stack
              className="shadow"
              sx={{
                px: { xs: theme.spacing(2), sm: theme.spacing(2) },
                py: { xs: theme.spacing(2), sm: theme.spacing(4) },
                borderRadius: theme.spacing(1),
                mt: { md: theme.spacing(2), xs: theme.spacing(1) },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  py: { xs: theme.spacing(1), md: theme.spacing(1) },
                  px: { xs: theme.spacing(1), md: theme.spacing(1) },
                }}
              >
                <FormattedMessage id="product.productInfo" />
              </Typography>
              <Stack
                direction="row"
                spacing={{ xs: theme.spacing(2), sm: theme.spacing(4) }}
                sx={{
                  py: { xs: theme.spacing(1), md: theme.spacing(1) },
                  px: { xs: theme.spacing(1), md: theme.spacing(1) },
                }}
              >
                <Stack direction="column" spacing={1}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      <FormattedMessage id="product.productCode" />
                    </Typography>{' '}
                    <Box>{data?.isbn}</Box> {/* render authors */}
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      <FormattedMessage id="product.author" />
                    </Typography>
                    <Box>
                      {data &&
                        data?.authors.map((author: any, _index: number) => {
                          if (_index === data?.authors.length - 1)
                            return <span key={_index}>{author?.name}</span>;
                          return <span key={_index}>{author?.name}, </span>;
                        })}
                    </Box>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      <FormattedMessage id="product.publisher" />
                    </Typography>
                    <Box>{data && data?.publisher?.name}</Box>{' '}
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      <FormattedMessage id="product.numberOfPage" />
                    </Typography>
                    <Box>{data?.totalPages}</Box>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      noWrap
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      <FormattedMessage id="product.genre" />
                    </Typography>
                    {/* render genres */}
                    <Box>
                      {data &&
                        data?.genres.map((genre: any, _index: number) => {
                          if (_index === data?.genres.length - 1)
                            return <span key={_index}>{genre?.name}</span>;
                          return <span key={_index}>{genre?.name}, </span>;
                        })}{' '}
                    </Box>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      noWrap
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      <FormattedMessage id="product.remainder" />
                    </Typography>
                    <Box>{data && data?.availableQuantity}</Box>
                  </Stack>
                  {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      noWrap
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      Mô tả sách
                    </Typography>
                    <Stack spacing={1}>
                      {' '}
                      <Box
                        sx={
                          hiddenDescription
                            ? {
                                overflow: 'hidden',
                                maxHeight: '60px',
                                lineHeight: '20px',
                              }
                            : {
                                lineHeight: '20px',
                                overflow: 'hidden',
                              }
                        }
                      >
                        {' '}
                        <Box ref={desRef}>
                          {(data && data?.description) || 'Chưa có mô tả'}
                        </Box>
                      </Box>
                      {desRef?.current &&
                        numberOfLine() > 3 &&
                        data?.description && (
                          <Button
                            onClick={() =>
                              setHiddenDescription(!hiddenDescription)
                            }
                          >
                            {hiddenDescription ? 'Xem thêm' : 'Rút gọn'}
                          </Button>
                        )}
                    </Stack>
                  </Stack> */}
                </Stack>
              </Stack>
            </Stack>

            {/* review  */}
            <Stack
              className="shadow"
              sx={{
                px: { xs: theme.spacing(2), sm: theme.spacing(2) },
                py: { xs: theme.spacing(2), sm: theme.spacing(4) },
                borderRadius: theme.spacing(1),
                mt: { md: theme.spacing(1), xs: theme.spacing(1) },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  py: { xs: theme.spacing(1), md: theme.spacing(1) },
                  px: { xs: theme.spacing(1), md: theme.spacing(1) },
                  mb: 2,
                }}
              >
                Đánh giá sản phẩm
              </Typography>

              {/* rating */}
              <Stack>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                >
                  {/* ratingStar */}
                  <Box
                    display="flex"
                    alignItems="center"
                    mb={2}
                    sx={{ flexDirection: 'column', ml: 4, mr: 4 }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="body1"
                        ml={1}
                        fontWeight="bold"
                        fontSize={50}
                        lineHeight={0.8}
                      >
                        {2}
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        fontSize={25}
                        lineHeight={0.8}
                      >
                        /{5}
                      </Typography>
                    </Box>
                    <Rating name="product-rating" value={2} readOnly />
                    <Typography variant="body2">({13} đánh giá)</Typography>
                  </Box>

                  {/* progressBar */}
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', ml: 4 }}
                    alignItems="center"
                    mb={2}
                  >
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <Box
                        key={rating}
                        mr={1}
                        display="inline-flex"
                        alignItems="center"
                        sx={{ whiteSpace: 'nowrap', mb: 0.5 }}
                      >
                        <Typography variant="body2" sx={{ mr: 1 }}>
                          {rating} sao
                        </Typography>
                        <Box
                          sx={{
                            width: 250,
                            height: 10,
                            bgcolor: 'grey.300',
                            borderRadius: 5,
                          }}
                        >
                          <Box
                            sx={{
                              width: `${20}%`,
                              height: '100%',
                              bgcolor: 'primary.main',
                              borderRadius: 5,
                            }}
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          align="center"
                          sx={{ ml: 1 }}
                        >
                          {20}%
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* addReviewButton */}
                  {isAuthenticated ? (
                    <Box sx={{ ml: 20, display: 'flex', alignItems: 'center' }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<CreateIcon />}
                        sx={{ width: '300px', borderWidth: 2 }}
                        onClick={() => {
                          setOpenReviewModal(true);
                          setReviewBook({
                            id: data.id,
                            name: data.name,
                            images: data.images[0].url
                          })
                        }}
                      >
                        Viết đánh giá
                      </Button>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body1" sx={{ mx: 4, mb: 2 }}>
                        Chỉ có thành viên mới có thể viết nhận xét. Vui lòng{' '}
                        <Link
                          href="/dang-nhap"
                          underline="none"
                          color="primary"
                        >
                          đăng nhập
                        </Link>{' '}
                        hoặc{' '}
                        <Link href="/dang-ky" underline="none" color="primary">
                          đăng ký
                        </Link>
                        .
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box sx={{ width: '100%', my: 2 }}>
                  <Divider />
                </Box>
              </Stack>

              {/* user comment */}
              <Stack
                direction="column"
                spacing={{ xs: theme.spacing(2), sm: theme.spacing(1) }}
                sx={{
                  py: { xs: theme.spacing(1), md: theme.spacing(1) },
                  px: { xs: theme.spacing(1), md: theme.spacing(1) },
                }}
              >
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <ReviewItem
                      key={index}
                      rating={review.rating}
                      comment={review.comment}
                      user={review.user}
                    />
                  ))
                ) : (
                  <Typography variant="body1">
                    Không có bài đánh giá nào
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Paper>
        <Stack direction="column" sx={{ mb: theme.spacing(4) }}>
          <Typography
            className="shadow"
            variant="h3"
            sx={{
              my: theme.spacing(1),
              py: theme.spacing(1),
              px: theme.spacing(2),
              borderRadius: theme.spacing(1),
              display: 'inline-block',
              width: 'fit-content',
            }}
          >
            <FormattedMessage id="product.relatedProduct" />
          </Typography>
          <ProductSlides
            detailData={data}
            slideData={slideData}
            isSlideLoading={isSlideLoading}
            isSlideFetching={isSlideFetching}
          />
        </Stack>
        <ReviewModal
          open={openReviewModal}
          handleClose={() => {
            setOpenReviewModal(false);
          }}
          book={reviewBook}
          refetchReviews={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </Box>
    </ProductLayout>
  );
};

export default ProductDetail;
