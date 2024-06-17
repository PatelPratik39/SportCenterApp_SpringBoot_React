

import { Button, MenuItem, Menu, Fade } from '@mui/material';
import { Link } from 'react-router-dom';
import { logout } from '../../feature/account/accountSlice';
import { useAppDispatch, useAppSelector } from '../store/ConfigureStores';
import { useState } from 'react';


const SignedInMenu = () => {

    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.account);
    const [anchorElement, setAnchorElement] = useState(null);
    const open = Boolean(anchorElement);


    const handleClick = (event: any) => {
        setAnchorElement(event.currentTarget);
    };
    // close
    const handleClose = () => {
        setAnchorElement(null);
    }


    return (
        <>
            <Button
                onClick={handleClick}
                color='inherit'
                sx={{ typography: 'h6' }}
            >
                Hi 👋🏻 , {user?.username}
            </Button>
            <Menu anchorEl={anchorElement} open={open} onClose={handleClose} TransitionComponent={Fade}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem component={Link} to="/orders">My Orders</MenuItem>
                <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
            </Menu>
        </>
    )
}

export default SignedInMenu