import moment from 'moment';
import 'moment/locale/vi';

export function parseShortTime(time) {
    moment.locale('vi');
    return moment(new Date(time)).format('DD/MM/YYYY');
}
