import themes from 'themes';
import config from 'config';
import NavigationScroll from 'layout/NavigationScroll';
import Routes from 'routes';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

function App() {
    const customization = { fontFamily: config?.fontFamily, borderRadius: config?.borderRadius };

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;
