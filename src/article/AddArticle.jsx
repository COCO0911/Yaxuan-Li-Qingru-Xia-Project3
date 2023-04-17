
import {
  Link,
  useHistory, useNavigate, useLocation, useParams
} from 'react-router-dom';
import Headers from '../component/headers';
import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, TextField, Snackbar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Toast from '../component/Toast';
import { UserState, ChangeUser } from '../api/account';
import { Add } from '../api/article';
import {
  Container,
  Typography,
  Fab
} from '@material-ui/core';
function AddArticle() {
  let params = useParams();
  const [msg, setmsg] = useState('');
  const [title, settitle] = useState('');
  const [description, setdescription] = useState(``);
  const [user, setuser] = useState('');
  const [png, setpng] = useState('');/* pgn */
  const [file, setfile] = useState('');/* photo file */
  const navigate = useNavigate();
  let fileRef = useRef();
  useEffect(() => {
    // if (localStorage.getItem('token') != null) {

    // }
    UserState().then((res) => {
      if (res.ret == '001') {
        setmsg({
          'message': res.message,
          'url': '/login'
        })
      } else {
        setuser(res.data.data.userdata)
        console.log(res.data.data.userdata)
      }

    }).catch((err) => {
      console.log(err)
    })
  }, []);

  function getImgBase64Data(file, callback) {
    var reader = new FileReader();
    reader.onload = function (e) {
      callback(e.target.result);
    };
    reader.readAsDataURL(file); 
  }
  return (
    <div id="EditUserData">
      <Headers type="EditUserData" />
      <Container style={{ marginTop: '80px' }}>
        {user != '' ?
          <Typography className='mainbox' component="div" >
            <h1>Add Article</h1>
            <form noValidate autoComplete="off">
              <div className="info-container">
                <div className='input'>
                  <span className='tit'>picture:</span>

                  {/* save png file */}
                  {png == '' ?
                    <div>
                      <Fab color="primary" aria-label="add" onClick={() => {
                        fileRef.current.click();
                      }}>
                        <AddIcon />
                      </Fab>
                      <input ref={fileRef} type="file" hidden className='file' onChange={(e) => {

                        if (e.target.files[0]) {
                          getImgBase64Data(e.target.files[0], function (result) {

                            setpng(result)
                            setfile(e.target.files[0])
                            // $('.showUploadImgBox').html(`<img src="${result}" />`)
                          });
                        }
                      }} />
                    </div>
                    : <img src={png} onClick={() => {
                      fileRef.current.click();
                    }} />
                  }

                </div>
                <div className='input'>
                  <TextField
                    label="article title"
                    style={{ margin: 8 }}
                    onChange={(e) => {
                      settitle(e.target.value)
                    }}
                    defaultValue={title}
                    placeholder="pleace input article title"
                    fullWidth
                  />
                </div>
                <div className='input'>
                  <TextField
                    label="descriptipon"
                    minRows={10}
                    style={{ margin: 8 }}
                    defaultValue={description}
                    onChange={(e) => {
                      setdescription(e.target.value)
                    }}
                    placeholder="Please enter your personal profile"
                    fullWidth
                    type='text'
                    multiline
                  />
                </div>
                <p>
                  <Button variant="contained" color="primary" onClick={() => {

                    // var filtername = /^([A-Za-z])+$/;
                    // var filteremail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\.\-])+\.)+([a-zA-Z]{2,4})+$/;
                    // var filterpwd = /^([A-Za-z0-9_\.\’\-\s]{6,})+$/
                    if (title == '' || description == '') {
                      setmsg({
                        'message': 'pleace input data',
                      })
                    } else {
                      var formdata = new FormData();
                      formdata.append("title", title);/*add title */
                      formdata.append("description", description);/*add description */
                      formdata.append("uid", user._id);
                      formdata.append("file", file);
                      Add(formdata).then((res) => {
                        setmsg({
                          'message': res.message,
                          'url': `/UserArticle/${user._id}`
                        })
                      }).catch((err) => {
                        setmsg({
                          'message': err.message
                        })
                      })
                    }
                  }}>Create</Button >
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  <Button variant="contained" color="secondary"
                    onClick={() => {
                      navigate(`/UserArticle/${user._id}`);
                    }}
                  >
                    Back
                  </Button>
                </p>
              </div>
            </form>

          </Typography>
          : ''}
      </Container>
      {/* alert */}
      {msg != '' ? <Toast msg={msg} /> : ""}
    </div>
  )
}

export default AddArticle