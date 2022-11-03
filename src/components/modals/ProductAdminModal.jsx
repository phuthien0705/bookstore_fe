import { Dialog, DialogTitle } from '@mui/material';

const ProductAdminModal = ({ handleClose, open }) => {
    console.log(open);
    return (
        <Dialog onClose={() => handleClose()} open={open}>
            <DialogTitle>Edit modal </DialogTitle>
        </Dialog>
    );
};

export default ProductAdminModal;
