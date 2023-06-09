import { EProcessPayment } from '@/constants/processPayment';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentsIcon from '@mui/icons-material/Payments';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { IconBrandPaypal } from '@tabler/icons';

import CheckBoxIcon from '@mui/icons-material/CheckBox';

const paymentMapping = (
  title: string
): { content: string; color: string; icon: React.ReactNode | null } => {
  switch (title) {
    case EProcessPayment.CASH_ON_DELIVERY:
      return {
        content: 'Tiền mặt',
        color: 'green',
        icon: <PaymentsIcon sx={{ color: 'green' }} />,
      };
    case EProcessPayment.ONLINE_BANKING:
      return {
        content: 'Chuyển khoản online',
        color: 'blue',
        icon: <AccountBalanceIcon sx={{ color: 'blue' }} />,
      };
    case EProcessPayment.CREDIT_CARD:
      return {
        content: 'Thẻ Credit',
        color: 'rgb(237, 95, 30)',
        icon: <CreditCardIcon sx={{ color: 'rgb(237, 95, 30)' }} />,
      };
    case EProcessPayment.PAYPAL:
      return {
        content: 'Tài khoản Paypal',
        color: '#40a1bf',
        icon: <IconBrandPaypal  color={'#40a1bf'}  />,
      };
    default:

      return {
        content: 'Chưa xác định',
        color: 'error',
        icon: null,
      };
  }
};
export default paymentMapping;
