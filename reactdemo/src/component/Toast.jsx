/*  */
import React, { useState, useEffect } from 'react';
import './toast.css';
import {
    useNavigate
} from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
/* 吐司弹框提示 */
export default function Toast(props) {
    const [msg, setmsg] = useState(props.msg);
    console.log(props.msg)
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    /* 关闭弹框 */
    const handleClose = () => {
        setOpen(false);
        if (msg.url != undefined) {
            navigate(msg.url);
        };
    }
    useEffect(() => {
        setOpen(true);
    }, []);

    return (
        <div>
            <Snackbar
                key={new Date().getTime()}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message={msg.message}
                action={
                    <div />
                }
            />
        </div>
    );
}