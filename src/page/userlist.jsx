import React, { useState, useEffect } from 'react';
import Headers from '../component/headers';
import { Find, UserState } from './../api/account';
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
import {
  Link,
  useHistory,
  useNavigate,
  useLocation,
  useParams,
} from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Cardbox from './../component/cardbox';
import { articleList } from './../api/article';
import SearchIcon from '@material-ui/icons/Search';
export default function UserList(props) {
  let params = useParams();
  const [list, setlist] = useState([]);
  const [copylist, setcopylist] = useState([]);
  const [searchtxt, setsearchtxt] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    Find()
      .then(res => {
        console.log(res);
        setlist(res);
        setcopylist(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const search = () => {
    console.log(searchtxt);
    let result = list.filter(ele => {
      let name = ele.Firstname + ele.Lastname;
      if (name.replace(/ /g, '').toLowerCase().indexOf(searchtxt) != -1) {
        return ele;
      }
    });
    console.log(result);
    setcopylist(result);
  };
  return (
    <div>
      <Headers type="UserArticle" />
      <Container style={{ marginTop: '80px' }} id="userList">
        <div className="searchline btn-group">
          <div className="btn">
            <input
              type="text"
              placeholder="pleace input username"
              defaultValue={searchtxt}
              onChange={e => {
                console.log(e.target.value);
                setsearchtxt(e.target.value.replace(/ /g, '').toLowerCase());
              }}
            />
          </div>
          <IconButton
            aria-label="add to favorites"
            onClick={() => {
              search();
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>
        <Typography
          component="div"
          style={{ backgroundColor: '#cfe8fc', height: '100vh' }}
        >
          {copylist.map((ele, i) => {
            return (
              <div className="topbox" key={i}>
                <div className="mainbox fn-clear">
                  <div className="fn-clear">
                    <div className="fl">
                      <div className="head">
                        <img src="https://picsum.photos/120/120" alt="" />
                      </div>
                    </div>
                    <div className="fr">
                      <Button
                        className="add"
                        variant="outlined"
                        color="primary"
                        aria-label="settings"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={() => {
                          navigate(`/UserArticle/${ele._id}`);
                        }}
                      >
                        Show Detail
                      </Button>
                    </div>
                  </div>
                  <div className="usernews">
                    <p className="tit">
                      Full Name:{ele.Firstname} {ele.Lastname}
                    </p>
                    <p className="desc">Email:{ele.Email}</p>
                    <p className="desc">registration date:{ele.datetime}</p>
                    <p className="desc">description:{ele.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Typography>
      </Container>
    </div>
  );
}
