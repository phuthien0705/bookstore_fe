import { useState } from 'react';
import { IconButton, MenuItem, Menu, Stack, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';

const MenuActionAdmin = ({ id, deleteCallback, editCallback }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <IconButton
                id={`action-button-${id}`}
                aria-controls={open ? `action-menu-${id}` : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id={`action-menu-${id}`}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': `action-button-${id}`
                }}
            >
                <MenuItem
                    onClick={() => {
                        deleteCallback();
                        handleClose();
                    }}
                >
                    <Stack direction="row" spacing={1} alignItems="center">
                        <DeleteIcon fontSize="inherit" />
                        <Typography>Xóa</Typography>
                    </Stack>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        editCallback();
                        handleClose();
                    }}
                >
                    <Stack direction="row" spacing={1} alignItems="center">
                        <EditIcon fontSize="inherit" />
                        <Typography>Chỉnh sửa</Typography>
                    </Stack>
                </MenuItem>
            </Menu>
        </div>
    );
};

MenuActionAdmin.propTypes = {
    id: PropTypes.number.isRequired,
    deleteCallback: PropTypes.func,
    editCallback: PropTypes.func
};

export default MenuActionAdmin;
