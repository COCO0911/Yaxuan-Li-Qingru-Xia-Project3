/*  */
import React, { useState, useEffect } from 'react';
import {
    Link,
    useHistory, useNavigate, useLocation, useParams
} from 'react-router-dom';
import Headers from '../component/headers';
import { FindUser, UserState } from './../api/account';/* user info */
// import { UserLogin } from './../api/account';/* user article info */
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
import Toast from './../component/Toast';
import { articleUserData } from './../api/article';
export default function UserArticle(props) {
    let params = useParams();
    console.log(params.userid)
    const [loginUser, setloginUser] = useState(false);
    const [userdata, setuserdata] = useState({
        "Email": "",
        "Firstname": "",
        "Lastname": "",
        "datetime": "",
        "description": "",
        "_id": "",
    })
    const [msg, setmsg] = useState('');
    const [list, setlist] = useState([]);/* save data */
    const [user, setuser] = useState('');/* login data */
    const navigate = useNavigate();
    useEffect(() => {
        FindUser({ '_id': params.userid }).then((res) => {
            setuserdata(res.data);
            /* get cur user info */
            UserState().then((resp) => {

                console.log(resp.data.data.userdata._id)
                console.log(res.data._id)
                if (resp.ret == '001') {
                    return false;
                } else {
                    /* if user match */
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
        articleUserData({ '_id': params.userid }).then((res) => {
            setlist(res.reverse());
        }).catch((err) => {
            console.log(err)
        })
    }
    const setMaking = (res) => {

        if (res.ret == '000') {
            setmsg(res);
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