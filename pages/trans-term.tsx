import ProductLayout from '../layout/ProductLayot/index';
import TransTermContent from '@/components/terms/transtermcontent';
import { Typography, Paper } from '@mui/material';

const TransTerm = () => {
    return (
        <ProductLayout>
            <Paper>
                <TransTermContent />
            </Paper>
        </ProductLayout>
    );
};

export default TransTerm;
