import IEachNotificationData from '@/interfaces/notification.interface';
import httpRequest from '@/services/httpRequest';

export const getNotification = () => {
  return httpRequest.get<IEachNotificationData[]>(`/notifications`);
};
