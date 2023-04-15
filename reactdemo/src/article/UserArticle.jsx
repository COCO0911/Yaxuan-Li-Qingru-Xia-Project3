/*  */
import React, { useState, useEffect } from 'react';
import {
    Link,
    useHistory, useNavigate, useLocation, useParams
} from 'react-router-dom';
import Headers from '../component/headers';
import { FindUser, UserState } from './../api/account';/* 用户基本信息 */
// import { UserLogin } from './../api/account';/* 用户文章信息 */
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
    Chip
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Cardbox from './../component/cardbox';
/* 吐司弹框提示 */
import Toast from './../component/Toast';
import { articleUserData } from './../api/article';
export default function UserArticle(props) {
    let params = useParams();//获得地址栏参数
    console.log(params.userid)
    const [loginUser, setloginUser] = useState(false);/* 判断当前的用户信息是否为登录的用户 */
    const [userdata, setuserdata] = useState({
        "Email": "",
        "Firstname": "",
        "Lastname": "",
        "datetime": "",
        "description": "",
        "_id": "",
    })
    const [msg, setmsg] = useState('');/* 提示的文案信息 */
    const [list, setlist] = useState([]);/* 存储文章数据 */
    const [user, setuser] = useState('');/* 登录的用户数据局 */
    const navigate = useNavigate();
    useEffect(() => {
        FindUser({ '_id': params.userid }).then((res) => {
            setuserdata(res.data);
            /* 获取当前的登录用户信息 */
            UserState().then((resp) => {

                console.log(resp.data.data.userdata._id)
                console.log(res.data._id)
                if (resp.ret == '001') {
                    return false;
                } else {
                    /* 如果当前用户信息，和登录的用户信息相同 */
                    if (resp.data.data.userdata._id == res.data._id) {
                        setloginUser(true)
                        setuser(resp.data.data.userdata)
                    }
                }

            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })
        showList()
    }, [params.userid]);

    const showList = () => {
        /* 指定用户的文章的列表 */
        articleUserData({ '_id': params.userid }).then((res) => {
            setlist(res.reverse());
        }).catch((err) => {
            console.log(err)
        })
    }
    /* 删除文章，子传父 */
    const setMaking = (res) => {

        if (res.ret == '000') {
            setmsg(res);
            /* 获得所有文章的列表 */
            showList()
        };
    }
    return (
        <div>
            <Headers type="UserArticle" />
            <Container style={{ marginTop: '80px' }} id='mainlist'>
                <Typography component="div" style={{ backgroundColor: '#cfe8fc', minHeight: '100vh' }} >
                    <div className='topbox'>
                        <div className='mainbox fn-clear'>
                            <div className='fn-clear'>
                                <div className='fl'>
                                    <div className='head'>
                                        <img src="https://picsum.photos/120/120" alt="" />
                                    </div>

                                </div>
                                <div className='fr'>
                                    {loginUser === true ?
                                        <div>
                                            <Button
                                                className='add'
                                                variant="outlined"
                                                color="primary"
                                                aria-label="settings"
                                                startIcon={<AddCircleOutlineIcon />}
                                                onClick={() => {
                                                    navigate(`/AddArticle`);
                                                }}
                                            >
                                                publish an article
                                            </Button>
                                            <Button
                                                className='showdetail'
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<EditIcon />}
                                                onClick={() => {
                                                    navigate(`/EditUserData`);
                                                }}
                                            >
                                                status updates
                                            </Button>
                                        </div>
                                        : ''}
                                </div>
                            </div>
                            <div className='usernews'>
                                <p className='tit'>Full Name:{userdata.Firstname} {userdata.Lastname}</p>
                                <p className='desc'>Email:{userdata.Email}</p>
                                <div className='desc'>State:
                                    {userdata.state !== '' ? <Chip color="primary" label={userdata.state} />
                                        : ''
                                    }

                                </div>
                                <p className='desc'>registration date:{userdata.datetime}</p>
                                <p className='desc'>description:{userdata.description}</p>
                            </div>

                        </div>
                    </div>
                    <div className='cardList'>

                        {list.map((ele, i) => {
                            return (
                                <div key={i}>
                                    <Cardbox cardData={ele} userdata={user} setMaking={setMaking} />
                                </div>
                            )
                        })}


                    </div>
                </Typography>
            </Container>
            {msg != '' ? <Toast msg={msg} /> : ""}
        </div>
    );
}