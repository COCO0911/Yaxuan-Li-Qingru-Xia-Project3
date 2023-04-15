import React, { useEffect, useState } from 'react';
import {
    Link,
    useHistory, useNavigate
} from 'react-router-dom';
import './../App.css';
import { Box, Button, TextField, Snackbar } from '@material-ui/core';
import { UserLogin } from './../api/account';
function Login() {
    const [email, setemail] = useState("yjsz002@163.com");
    const [password, setpassword] = useState("123456");
    const [msgtxt, setmsgtxt] = useState('');/* 提示的文字信息 */
    const [success, setsuccess] = useState(false);/* 判断是否登录成功，登录成功后跳转页面 */
    const [open, setOpen] = useState(false);/* 弹窗提示显示还是隐藏 */
    const navigate = useNavigate();
    /* 弹框关闭 */
    const handleClose = (event, reason) => {
        setOpen(false);
        /* 如果表单验证成功，就跳转页面 */
        if (success == true) {
            navigate(`/home`);
        }
    };
    /* 用户登录 */
    const toLogin = () => {
        /* 调用接口 */
        UserLogin({
            Email: email,
            password: password,
        }).then((res) => {
            console.log(res)
            if (res.code == '001') {
                console.log(res.result)
                setmsgtxt(res.result)
                setOpen(true);
            } else {
                localStorage.setItem('token', res.token);
                setmsgtxt(res.result)
                setOpen(true);
                setsuccess(true);
            }

        }).catch((err) => {
            console.log(err)
            setsuccess(false);
            setmsgtxt(err.message)
            setOpen(true);
        })
    }
    return (
        <div className='loginbox'>
            <div className="main">
                <h1>Login</h1>
                <div className="info-container">
                    <div className="info-input">
                        <div className="input">
                            <TextField
                                label="Email"
                                style={{ margin: 8 }}
                                defaultValue={email}
                                onChange={(e) => {
                                    setemail(e.target.value)
                                }}
                                placeholder="pleace input Email"
                                fullWidth
                            />
                        </div>
                        <div className="input">
                            <TextField
                                label="Password"
                                style={{ margin: 8 }}
                                defaultValue={password}
                                onChange={(e) => {
                                    setpassword(e.target.value)
                                }}
                                placeholder="pleace input password"
                                type="password"
                                fullWidth
                            />
                        </div>
                        <p className='txt fn-clear'><Link className='fr' to='/Register'>to register?</Link></p>
                        <p>
                            <Button variant="contained" color="primary" onClick={() => {
                                if (email === '' || password === '') {
                                    setmsgtxt('pleace input data')
                                    setOpen(true);
                                } else {
                                    toLogin()
                                }
                            }}>
                                Login
                            </Button>
                            <br />
                            <br />
                            <Button variant="contained" color="secondary" onClick={() => {
                                navigate(`/home`);
                            }}>
                                Go Home
                            </Button>

                        </p>
                    </div>
                </div>
            </div>
            <Snackbar
                key={new Date().getTime()}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={1000}
                onClose={handleClose}
                message={msgtxt}
                action={
                    <div />
                }
            />
        </div>
    );
}

export default Login;