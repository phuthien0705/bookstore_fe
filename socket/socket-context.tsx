import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { useToast } from '@/hooks/useToast';
import { toggleSnackbar } from '@/store/snackbarReducer';
import { MainContext } from '@/pages/_app';
import { getAccessToken } from '@/common/authFunction';
import useNotifications from '@/hooks/noti/useNotification';

const BASE_URL = process.env.SOCKET_URL || 'http://localhost:3000';

export const MAX_RECONNECT_SOCKET_TIMES = 3;

const defautContext = {
  socket: undefined,
  handleConnect: () => {},
  haveNoti: false,
  setHaveNoti: () => undefined,
};

export interface ISocketContext {
  socket: Socket | null | undefined;
  haveNoti: boolean;
  setHaveNoti: Dispatch<SetStateAction<boolean>>;
  handleConnect: () => void;
}

export const SocketContext = createContext<ISocketContext>(defautContext);

const SocketsProvider = ({ children }: { children: ReactNode }) => {
  const [haveNoti, setHaveNoti] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const { setBackdrop } = useContext(MainContext);
  const dispatch = useDispatch();
  const toast = useToast(dispatch, toggleSnackbar);
  const { refetch } = useNotifications();

  const handleConnect = () => {
    const socket = io(BASE_URL, {
      transports: ['polling', 'websocket'],
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: MAX_RECONNECT_SOCKET_TIMES,
      extraHeaders: {
        Authorization: `Bearer ${getAccessToken() || ''}`,
      },
    });
    setSocket(socket);
    setBackdrop(true);
    bindSocketEvent(socket);
    socket.connect();
  };

  const bindSocketEvent = (socket: Socket) => {
    if (!socket) return;

    socket.on('connect', () => {
      setBackdrop(false);
    });

    socket.on('connect_error', () => {
      setBackdrop(false);
      toast({
        message:
          'Có lỗi xảy ra khi kết nối với máy chủ, vui lòng kiểm tra lại mạng và thử tải lại trang',
        type: 'error',
      });
    });

    socket?.on('notification', () => {
      refetch();
      setHaveNoti(true);
      localStorage.setItem('haveNoti', 'true');
    });
  };

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) handleConnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SocketContext.Provider
      value={{ socket, haveNoti, setHaveNoti, handleConnect }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
