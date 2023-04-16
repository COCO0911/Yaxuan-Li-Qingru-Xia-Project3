import React, { useState, useEffect } from 'react';
import {
    Link,
    useHistory, useNavigate, useLocation
} from 'react-router-dom';
import {
    Container, Typography,
    Button,
    Card,
    CardHeader,
    IconButton,
    Avatar,
    CardMedia,
    CardContent,
    CardActions,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Slide
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import ChatIcon from '@material-ui/icons/Chat';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BackupIcon from '@material-ui/icons/Backup';
import EditIcon from '@material-ui/icons/Edit';

import { articleDelete } from './../api/article'
/* 退出弹框动画 */
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function Cardbox(props) {
    const [list, setlist] = useState(props.cardData);/* 数据列表 */
    const { setMaking } = props;/* 子向父传值 */
    const navigate = useNavigate();
    const [quitOpen, setquitOpen] = useState(false);/* 确认退出弹框 */

    // let data = JSON.parse(params.data);
    // useEffect(() => {
    //     console.log(list.user_data[0]._id)
    // }, []);
    /* 文章删除 */
    const deleted = () => {
        /* 删除弹框显示 */
        setquitOpen(true)
    }
    /* 文章编辑 */
    const edit = (uid) => {
        navigate(`/EditArticle/${uid}`);
    }
    return (
        <Card style={{ margin: '30px' }}>
            <CardHeader
                avatar={
                    <Avatar style={{ cursor: 'pointer' }}
                        aria-label="recipe"
                        src="https://picsum.photos/40/40"
                        onClick={() => {
                            /* 显示用户详情信息 */
                            navigate(`/UserArticle/${list.user_data[0]._id}`);
                        }}>
                    </Avatar>
                }
                action={
                    /* 如果是作者自己发布的话，就显示对应的编辑和删除按钮 */
                    props.userdata !== '' ?
                        props.userdata._id === list.user_data[0]._id ?

                            <div>
                                <IconButton color="primary" aria-label="settings"
                                    onClick={() => {
                                        edit(list._id)
                                    }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="settings"
                                    onClick={() => { deleted(list._id) }}>
                                    <DeleteIcon />
                                </IconButton>
                            </div> : ''
                        : ''
                }
                title={`${list.user_data[0].Firstname} ${list.user_data[0].Lastname}`}
                subheader={list.datetime}
            />
            <p style={{ textAlign: 'left', 'padding': '0 30px' }}>{list.title}</p>
            <CardMedia
                style={{ width: "100%", display: 'block' }}
                image="https://picsum.photos/1440/340"
                title={`${list.user_data[0].Firstname} ${list.user_data[0].Lastname}`}
            />
            <CardContent>
                {/* {list.mainpng != '' ? <img className='mainpng' style={{ width: '100%' }} src={'/api/uploads/' + list.mainpng} alt="" /> : ''} */}
                {list.mainpng !== '' ? <img className='mainpng' style={{ width: '100%' }} src={'/uploads/' + list.mainpng} alt="" /> : ''}

                <Typography variant="body2" color="textSecondary" component="p" style={{ 'textAlign': 'left' }}>
                    {list.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing >
                <div className='btn-group' style={{ width: '100%' }}>
                    <div className='btn'>
                        <IconButton aria-label="add to favorites">
                            <ChatIcon />
                        </IconButton>
                    </div>
                    <div className='btn'>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                    </div>
                    <div className='btn'>
                        <IconButton aria-label="add to favorites">
                            <FavoriteBorderIcon />
                        </IconButton>
                    </div>
                    <div className='btn'>
                        <IconButton aria-label="share">
                            <BackupIcon />
                        </IconButton>
                    </div>
                </div>




            </CardActions>

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
                        Are you sure you want to delete this article?
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
                        /* 调用删除接口 */
                        articleDelete({ _id: list._id }).then((res) => {
                            setMaking(res)
                        }).catch((err) => {
                            setMaking(err)
                        })
                    }} color="primary">
                        sure
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>

    )
}

export default Cardbox