/*  */
import React, { useState, useEffect } from 'react';
import {
    Link,
    useHistory, useNavigate, useLocation
} from 'react-router-dom';
/* 吐司弹框提示 */
import Toast from './Toast';
import { UserState } from '../api/account';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    makeStyles,
    IconButton,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Slide
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        marginLeft: 10,
    },
}));
/* 退出弹框动画 */
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Headers(props) {
    const classes = useStyles();
    const [msg, setmsg] = useState('');/* 提示的文案信息 */
    /* 获取用户状态是否登录 */
    const [token, settoken] = useState('');
    const navigate = useNavigate();
    const location = useLocation();/* 获取路径参数信息（防止信息不再获取） */
    const [anchorEl, setAnchorEl] = useState(null);/* 下拉菜单 */
    const open = Boolean(anchorEl);/* 下拉菜单显示隐藏 */
    const [user, setuser] = useState('');
    const [quitOpen, setquitOpen] = useState(false);/* 确认退出弹框 */
    useEffect(() => {
        settoken(localStorage.getItem('token') == null ? '' : localStorage.getItem('token'))
        if (localStorage.getItem('token') != null) {
            UserState().then((res) => {
                if (res.ret == '001') {
                    setmsg({
                        'message': res.message,
                        'url': '/login'
                    })
                } else {
                    setuser(res.data.data.userdata)
                }

            }).catch((err) => {
                console.log(err)
            })
        }

    }, [location]);
    /* 下拉菜单显示隐藏 */
    const handleMenu = (event) => {
        /* 获取对应的dom元素 */
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        /* 关闭弹框 */
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" color="primary">
                <Toolbar >
                    <Typography variant="h6" noWrap>
                        Twitter
                    </Typography>
                    <div className={classes.title}>
                        <Button variant="contained" color="primary" disableElevation
                            onClick={() => {
                                navigate(`/home`);
                            }}
                        >
                            Home
                        </Button>
                        <Button variant="contained" color="primary" disableElevation
                            onClick={() => {
                                navigate(`/UserList`);
                            }}
                        >
                            User List
                        </Button>
                    </div>

                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <div className='fr'>
                        {user == '' ?
                            /* 如果没登录 */
                            <div>
                                <Button className='fl' variant="outlined" color="inherit" style={{ margin: '0 10px' }} onClick={() => {
                                    navigate(`/login`);
                                }}>
                                    Login
                                </Button>

                                <Button className='fl' color="inherit" onClick={() => {
                                    navigate(`/register`);
                                }}>
                                    Register
                                </Button>
                            </div>
                            :
                            /* 如果登录了 */
                            <div>
                                <Link style={{color:'#fff'}} to={`/UserArticle/${user._id}`}>{user.Firstname} {user.Lastname}</Link>
                                
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={() => {
                                        /* 显示用户详情信息 */
                                        navigate(`/UserArticle/${user._id}`);
                                        setAnchorEl(null);
                                    }}>My account</MenuItem>
                                    <MenuItem onClick={() => {
                                        /* 确认退出弹框 */
                                        setquitOpen(true);
                                        setAnchorEl(null);
                                    }}>quit</MenuItem>
                                </Menu>
                            </div>}
                    </div>
                </Toolbar>
            </AppBar>
            {msg != '' ? <Toast msg={msg} /> : ""}
            {/* 确认弹框 */}
            <Dialog
                open={quitOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => {
                    setquitOpen(false)
                }}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Tips"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to quit?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setquitOpen(false)
                    }} color="primary">
                        cancel
                    </Button>
                    <Button onClick={() => {
                        setquitOpen(false)
                        localStorage.removeItem('token');
                        setmsg({
                            'message': 'quit success',
                            'url': '/login'
                        })
                    }} color="primary">
                        sure
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}