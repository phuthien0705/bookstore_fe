import { Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        '& .MuiPaper-root': { maxWidth: '320px', borderRadius: '14px' }
    }
});

const ConfirmModal = ({ open, handleClose, handleConfirm }) => {
    const classes = useStyles();

    return (
        <Dialog
            className={classes.root}
            open={open}
            onClose={() => handleClose()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle sx={{ color: 'rgb(239,68,68)', fontSize: '16px', paddingBottom: 1 }} id="alert-dialog-title">
                {'Thay đổi chưa lưu'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ color: 'rgba(0,0,0,0.6)', fontSize: '16px' }} id="alert-dialog-description">
                    Thay đổi của bạn chưa được lưu. Bạn vẫn muốn thoát mà không lưu?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button sx={{ color: 'rgb(239,68,68)', fontSize: '16px' }} onClick={() => handleConfirm()}>
                    Thoát
                </Button>
                <Button sx={{ color: 'black', fontSize: '16px', marginLeft: '0 !important' }} onClick={() => handleClose()}>
                    Ở lại
                </Button>
            </DialogActions>
        </Dialog>
    );
};
ConfirmModal.propTypes = {
    handleClose: PropTypes.func,
    open: PropTypes.bool,
    handleConfirm: PropTypes.func
};
export default ConfirmModal;
