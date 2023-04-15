
import {
  Link,
  useHistory, useNavigate, useLocation, useParams
} from 'react-router-dom';
import Headers from '../component/headers';
import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, TextField, Snackbar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
/* 吐司弹框提示 */
import Toast from '../component/Toast';
import { UserState, ChangeUser } from '../api/account';
import { findArticle, articleChange } from '../api/article';
import { Add } from '../api/article';
import {
  Container,
  Typography,
  Fab
} from '@material-ui/core';
function EditArticle() {
  let params = useParams();//获得地址栏参数
  const [msg, setmsg] = useState('');/* 提示的文案信息 */
  const [title, settitle] = useState('');/* 标题文字信息 */
  const [description, setdescription] = useState(``);
  const [user, setuser] = useState('');
  const [png, setpng] = useState('');/* 图片 */
  const [file, setfile] = useState('');/* 图片文件 */
  const navigate = useNavigate();
  let fileRef = useRef();
  useEffect(() => {
    console.log(params.userid)
    findArticle({ _id: params.userid }).then((res) => {
      console.log(res)
      if (res.mainpng != '') {
        // setpng('/api/uploads/' + res.mainpng)
        setpng('/uploads/' + res.mainpng)
        settitle(res.title)
        setdescription(res.description)
      }
    }).catch((err) => {
      console.log(err)
    })
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
    reader.readAsDataURL(file); // 读取完后会调用onload方法
  }
  return (
    <div id="EditUserData">
      <Headers type="EditUserData" />
      <Container style={{ marginTop: '80px' }}>
        <Typography className='mainbox' component="div" >
          <h1>Edit Article</h1>
          {title != '' && description != '' ?
            <form noValidate autoComplete="off">
              <div className="info-container">
                <div className='input'>
                  <span className='tit'>picture:</span>

                  {/* 存储图片文件 */}
                  {png == '' ?
                    <div>
                      <Fab color="primary" aria-label="add" onClick={() => {
                        fileRef.current.click();
                      }}>
                        <AddIcon />
                      </Fab>

                    </div>
                    : <img src={png} onClick={() => {
                      fileRef.current.click();
                    }} />
                  }
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

                    // // 验证姓名
                    // var filtername = /^([A-Za-z])+$/;
                    // // 验证邮箱
                    // var filteremail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\.\-])+\.)+([a-zA-Z]{2,4})+$/;
                    // // 验证密码(可以包含特殊字符)
                    // var filterpwd = /^([A-Za-z0-9_\.\’\-\s]{6,})+$/
                    if (title == '' || description == '') {
                      setmsg({
                        'message': 'pleace input data',
                      })
                    } else {
                      var formdata = new FormData();
                      formdata.append("title", title);/* 文章标题 */
                      formdata.append("description", description);/* 文章描述 */
                      formdata.append("uid", params.userid);
                      if (file != '') {
                        formdata.append("file", file);
                      }

                      /* 表单提交 */
                      articleChange(formdata).then((res) => {
                        console.log(res.message)
                        setmsg({
                          'message': 'change success',
                          'url': `/UserArticle/${user._id}`
                        })
                      }).catch((err) => {
                        setmsg({
                          'message': err.message
                        })
                      })
                    }
                  }}>Change</Button >
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
            : ''
          }


        </Typography>
      </Container>
      {/* 提示信息 */}
      {msg != '' ? <Toast msg={msg} /> : ""}
    </div>
  )
}

export default EditArticle