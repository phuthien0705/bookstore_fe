import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material';
import { ReactQueryDevtools } from 'react-query/devtools';
import config from './../config.js';
import { Router, useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect } from 'react';
import themes from './../themes';
import { store } from './../store';
import { Provider } from 'react-redux';
import '../styles/globals.css';
import initRequest from '../services/initRequest';
import LoadingScreen from '../components/loading/LoadingScreen.jsx';

initRequest();

function MyApp({ Component, pageProps }) {
    const customization = { fontFamily: config?.fontFamily, borderRadius: config?.borderRadius };

    const router = useRouter();
    const getLayout = Component.getLayout || ((page) => page);
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        cacheTime: Infinity,
                        refetchOnWindowFocus: false,
                        staleTime: Infinity
                    }
                }
            })
    );
    const [loading, setLoading] = useState(false); //show loading when navigating/loading components
    useEffect(() => {
        Router.events.on('routeChangeStart', () => setLoading(true));
        Router.events.on('routeChangeComplete', () => setLoading(false));
        Router.events.on('routeChangeError', () => setLoading(false));
        return () => {
            Router.events.off('routeChangeStart', () => setLoading(true));
            Router.events.off('routeChangeComplete', () => setLoading(false));
            Router.events.off('routeChangeError', () => setLoading(false));
        };
    }, []);
    return (
        <>
            <Head>
                <title>Bảo thư shop</title>
                <meta
                    name="description"
                    content={`Đặt mua sách trực tuyến giá rẻ, giao hàng tận nơi trên toàn quốc, đổi trả miễn phí trong vòng 7 ngày, giao hành nhanh trong nội thành TPHCM`}
                />
                <meta
                    property="og:description"
                    content={`Đặt mua sách trực tuyến giá rẻ, giao hàng tận nơi trên toàn quốc, đổi trả miễn phí trong vòng 7 ngày, giao hành nhanh trong nội thành TPHCM`}
                />
            </Head>

            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider theme={themes(customization)}>
                        {loading ? <LoadingScreen /> : <>{getLayout(<Component {...pageProps} />)}</>}
                        <ReactQueryDevtools initialIsOpen={false} />
                    </ThemeProvider>
                </QueryClientProvider>
            </Provider>
        </>
    );
}
export default MyApp;
