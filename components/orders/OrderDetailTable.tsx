import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Typography, Paper } from '@mui/material';
import { IOrderDetailTable } from '@/interfaces/compontents/cart.interface';
import { moneyFormat } from '@/utils/moneyFormat';
import paymentMaping from '../../common/paymentMaping';

import { ImageOrderStyle } from './ImageOrderStyle';


import { Fragment, useState } from 'react';
const OrderDetailTable: React.FunctionComponent<IOrderDetailTable> = ({
  data,
}) => {
  return (
    <div>

    <TableContainer className="shadow" component={Paper} sx={{ mt: 2 }}>
      <Table   sx={{ maxWidth: 1762, marginTop: 0 }}>
        <TableBody>
        <TableRow >
              <TableCell colSpan={2} align='center'> <Typography   fontWeight="bold">
             THÔNG TIN CỬA HÀNG
                  </Typography> </TableCell>
            </TableRow>
            <TableRow >
              <TableCell width='40%'> <Typography   fontWeight="bold">
              Đơn vị bán:
                  </Typography> </TableCell>
              <TableCell align="left">  Công ty TNHH BOXO</TableCell>
            </TableRow>
            <TableRow >
              <TableCell  variant="head"> <Typography   fontWeight="bold">
              Mã số thuế:
                  </Typography> </TableCell>
              <TableCell align="left"> 089007615HAHA</TableCell>
            </TableRow>
            <TableRow >
              <TableCell  variant="head"> <Typography   fontWeight="bold">
           Chi nhánh:
                  </Typography> </TableCell>
              <TableCell align="left"> BOXO 5, khu phố 6, phường Linh Trung, Thành phố Thủ Đức, thành phố Hồ Chí Minh.</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    <TableContainer component={Paper} className='shadow' sx={{ mt: 2 }}>
      <Table  sx={{ maxWidth: 1762, marginTop: 0 }}>
        <TableBody>
        <TableRow>
              <TableCell colSpan={2} align='center'  variant="head"> <Typography fontWeight="bold">
           THÔNG TIN KHÁCH HÀNG
                  </Typography>
              </TableCell>

            </TableRow>
            <TableRow >
              <TableCell  variant="head"> <Typography   fontWeight="bold">
             Họ & Tên Khách hàng:
                  </Typography> </TableCell>
              <TableCell align="left"> {data?.user?.name}</TableCell>
            </TableRow>
            <TableRow >
              <TableCell  variant="head"> <Typography   fontWeight="bold">
             Email:
                  </Typography> </TableCell>
              <TableCell align="left"> {data?.user?.email}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    <TableContainer component={Paper} className='shadow' sx={{ mt: 2 }}>
      <Table  sx={{ maxWidth: 1800, marginTop: 0 }}>
        <TableBody>
        <TableRow>
              <TableCell colSpan={4} align='center'  variant="head"> <Typography fontWeight="bold">
           THÔNG TIN GIAO HÀNG VÀ THANH TOÁN
                  </Typography>
              </TableCell>

            </TableRow>
            <TableRow >
              <TableCell  variant="head"> <Typography   fontWeight="bold">
            Người nhận:
                  </Typography> </TableCell>
              <TableCell align="left"> {data?.shipping?.address?.name}</TableCell>
              <TableCell  variant="head"> <Typography   fontWeight="bold">
             Hình thức thanh toán:
                  </Typography> </TableCell>
              <TableCell align="left"> {paymentMaping(data?.payment?.type).content}</TableCell>
            </TableRow>
            <TableRow >
              <TableCell  variant="head"> <Typography   fontWeight="bold">
             Điện thoại:
                  </Typography> </TableCell>
              <TableCell align="left"> {data?.shipping?.address?.phone}</TableCell>
              <TableCell  variant="head"> <Typography   fontWeight="bold">
             Tổng tiền thanh toán:
                  </Typography> </TableCell>
              <TableCell align="left"> {moneyFormat(data?.totalPayment || 0)}</TableCell>
            </TableRow>
            <TableRow >
              <TableCell  variant="head"> <Typography   fontWeight="bold">
             Địa chỉ:
                  </Typography> </TableCell>
              <TableCell align="left"> {data?.shipping?.address?.description}, {data?.shipping?.address?.province}, {data?.shipping?.address?.city}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

        <TableContainer className="shadow" component={Paper} sx={{ mt: 2 }}>
          <Table sx={{ maxWidth: 1762, marginTop: 0 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography   fontWeight="bold" textAlign="center">
                    STT
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography   fontWeight="bold" textAlign="center">
                    Sản phẩm
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography   fontWeight="bold" textAlign="center">
                    Đơn giá
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography   fontWeight="bold" textAlign="center">
                    Thành tiền
                  </Typography>
                </TableCell>
              </TableRow>

            </TableHead>

            <TableBody>

              {(data?.books || []).map((item: any, _index: number) => (
                <Fragment key={`${item.id}_${_index}`}>
                  <TableRow>
                    <TableCell>
                      <Typography>{_index + 1}</Typography>
                    </TableCell>
                    <TableCell sx={{ maxWidth: '350px' }}>
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <Box sx={{ position: 'relative' }}>
                          <ImageOrderStyle
                            alt={item.name}
                            width="76"
                            height="76"
                            src={item.imageUrl}
                          />
                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              position: 'absolute',
                              color: '#808089',
                              textAlign: 'center',
                              width: 25,
                              height: 25,
                              backgroundColor: 'rgb(235, 235, 240)',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderTopLeftRadius: 10,
                              borderBottomRightRadius: 4,
                              bottom: 0,
                              right: 0,
                            }}
                          >
                            x{item?.quantity}
                          </span>
                        </Box>
                        <Typography
                          fontSize="14px"
                          textAlign="center"
                          color="black"
                        >
                          {item?.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {!item?.priceDiscount ? (
                        <Typography fontWeight="bold" textAlign="center">
                          {moneyFormat(item.price || 0)}
                        </Typography>
                      ) : (
                        <Stack>
                          <Typography fontWeight="bold" textAlign="center">
                            {moneyFormat(item.priceDiscount || 0)}
                          </Typography>
                          <Typography
                            fontWeight="lighter"
                            textAlign="center"
                            style={{ textDecorationLine: 'line-through' }}
                          >
                            {moneyFormat(item.price || 0)}
                          </Typography>
                        </Stack>
                      )}
                    </TableCell>
                    <TableCell>
                      {!item?.priceDiscount ? (
                        <Typography fontWeight="bold" textAlign="center">
                          {moneyFormat(item.price * item.quantity || 0)}
                        </Typography>
                      ) : (
                        <Stack>
                          <Typography fontWeight="bold" textAlign="center">
                            {moneyFormat(
                              item.priceDiscount * item.quantity || 0
                            )}
                          </Typography>
                        </Stack>
                      )}
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}
              <TableRow>

                <TableCell rowSpan={3} />
                <TableCell rowSpan={3} />
                <TableCell colSpan={1}>
                Phí ship:
                </TableCell>
                <TableCell  align="right">
                <Typography    fontWeight={700}
                      fontSize={'14px'}
                      color={'black'}>
                     {moneyFormat(data?.shipping?.value || 0)}
                    </Typography>
</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={1}>
                Giảm giá:
                </TableCell>
                <TableCell  align="right">
                <Typography    fontWeight={700}
                      fontSize={'14px'}
                      color={'black'}>
                      {moneyFormat(data?.discount || 0)}
                </Typography>
                </TableCell>

              </TableRow>
              <TableRow >

            <TableCell colSpan={1} width='30%'>  Tổng tiền: </TableCell>
                <TableCell  align="right">

                    <Typography
                      fontWeight={700}
                      fontSize={'14px'}
                      color={'black'}
                    >
                     {moneyFormat(data?.totalPayment || 0)}
                    </Typography>

                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

    </div>
  );
};

export default OrderDetailTable;
