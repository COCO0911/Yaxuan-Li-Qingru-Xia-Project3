import React, { useState, useEffect } from 'react';
import Headers from '../component/headers';
import {
  Container,
  Typography,
  Button,
  Card,
  CardHeader,
  IconButton,
  Avatar,
  CardMedia,
  CardContent,
  CardActions,
} from '@material-ui/core';

import { articleList } from './../api/article';
import { UserState } from '../api/account';
import Cardbox from './../component/cardbox';
import Toast from './../component/Toast';
export default function Home(props) {
  const [loginUser, setloginUser] = useState(false);
  const [list, setlist] = useState([]);
  const [user, setuser] = useState('');
  const [msg, setmsg] = useState('');
  useEffect(() => {
    showList();
    UserState()
      .then(res => {
        if (res.ret == '001') {
        } else {
          // console.log(res.data.data.userdata)
          setuser(res.data.data.userdata);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const showList = () => {
    articleList()
      .then(res => {
        console.log(res);

        setlist(res.reverse());
      })
      .catch(err => {
        console.log(err);
      });
  };
  const setMaking = res => {
    if (res.ret == '000') {
      setmsg(res);

      showList();
    }
  };
  return (
    <div id="home">
      <Headers type="home" />
      <Container style={{ marginTop: '80px' }} id="mainlist">
        <Typography
          component="div"
          style={{ backgroundColor: '#cfe8fc', minHeight: '100vh' }}
        >
          {/* <div className='topbox'>
                        <div className='mainbox fn-clear'>
                            <div className='fn-clear'>
                                <div className='fl'>
                                    <div className='head'>
                                        <img src="https://picsum.photos/120/120" alt="" />
                                    </div>

                                </div>
                                <div className='fr'>
                                    {loginUser == true ?
                                        <Button className='showdetail' variant="contained" color="secondary" href="/home">
                                            Show Detail
                                        </Button>
                                        : ''}

                                </div>
                            </div>
                            <div className='usernews'>
                                <p className='tit'>Full Name:123</p>
                                <p className='desc'>Email:</p>
                                <p className='desc'>registration date:</p>
                                <p className='desc'>description:</p>
                            </div>
                        </div>
                    </div> */}
          <div className="cardList">
            {list.map((ele, i) => {
              return (
                <div key={i}>
                  <Cardbox
                    cardData={ele}
                    userdata={user}
                    setMaking={setMaking}
                  />
                </div>
              );
            })}
          </div>
        </Typography>
      </Container>
      {msg != '' ? <Toast msg={msg} /> : ''}
    </div>
  );
}
