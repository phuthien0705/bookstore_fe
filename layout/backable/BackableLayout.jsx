import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import ProductLayout from '../ProductLayot';

const BackableLayout = ({ children }) => {
    const router = useRouter();

    return (
        <ProductLayout>
            <div>{children}</div>
        </ProductLayout>
    );
};

export default BackableLayout;
