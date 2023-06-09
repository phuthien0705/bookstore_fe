import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { EOrderStatus } from '@/interfaces/compontents/order.interface';

const statusMaping = (
  title: string
): { content: string; color: string; icon: React.ReactNode | null } => {
  switch (title) {
    case EOrderStatus.PENDING:
      return {
        content: 'Đang xử lý',
        color: '#FFB302',
        icon: <PendingActionsIcon sx={{ color: 'white' }} />,
      };
    case EOrderStatus.PAID:
      return {
        content: 'Đã thanh toán',
        color: '#FCE83A',
        icon: <CreditScoreIcon sx={{ color: 'white' }} />,
      };
    case EOrderStatus.SHIPPED:
      return {
        content: 'Đã lấy hàng, chuẩn bị giao',
        color: '#2DCCFF',
        icon: <ContentPasteGoIcon sx={{ color: 'white' }} />,
      };
    case EOrderStatus.DELIVERED:
      return {
        content: 'Giao thành công',
        color: '#56F000',
        icon: <DoneIcon sx={{ color: 'white' }} />,
      };
    case EOrderStatus.CANCELED:
      return {
        content: 'Đã Hủy',
        color: '#A4ABB6',
        icon: <ClearIcon sx={{ color: 'white'  }} />,
      };
    default:
      return {

        content: 'Chưa xác định',
        color: 'error',
        icon: null,
      };
  }
};
export default statusMaping;
