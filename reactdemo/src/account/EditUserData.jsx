
import Headers from '../component/headers';
import {
  Link,
  useHistory, useNavigate, useParams
} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Snackbar, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
/* 吐司弹框提示 */
import Toast from './../component/Toast';
import { UserState, ChangeUser } from '../api/account';
import {
  Container,
  Typography
} from '@material-ui/core';

function EditUserData() {
  let params = useParams();//获得地址栏参数
  const [msg, setmsg] = useState('');/* 提示的文案信息 */
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [description, setdescription] = useState("");
  const [user, setuser] = useState('');
  const [state, setstate] = useState('');
  const navigate = useNavigate();
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
        let result = res.data.data.userdata;
        console.log(result)
        setuser(result)
        setfirstname(result.Firstname)
        setlastname(result.Lastname)
        setemail(result.Email)
        setpassword(result.password)
        setdescription(result.description)
        setstate(result.state)
      }

    }).catch((err) => {
      console.log(err)
    })
  }, []);

  /* 注册 */
  const toRegister = () => {
    console.log('asdasd')
    /* 调用接口 */
    ChangeUser({
      _id: user._id,
      Firstname: firstname,
      Lastname: lastname,
      Email: email,
      password: password,
      description: description,
      state: state,
    }).then((res) => {
      console.log(res)
      if (res.ret == '000') {
        localStorage.removeItem('token');
        setmsg({
          'message': "The modification was successful, please log in again",
          'url': `/login`
        })
      }
    }).catch((err) => {
      console.log(err)
    })
    // UserRegister({
    //   Firstname: firstname,
    //   Lastname: lastname,
    //   Email: email,
    //   password: password,
    //   description: description,
    // }).then((res) => {
    //   console.log(res)


    // }).catch((err) => {
    //   console.log(err)
    // })
  }
  return (
    <div id="EditUserData">
      <Headers type="EditUserData" />
      <Container style={{ marginTop: '80px' }}>
        {user != '' ?
          <Typography className='mainbox' component="div" >
            <h1>Edit User Data</h1>
            <form noValidate autoComplete="off">
              <div className="info-container">
                <div className='input'>
                  <TextField
                    label="First Name"
                    style={{ margin: 8 }}
                    onChange={(e) => {
                      setfirstname(e.target.value)
                    }}
                    defaultValue={firstname}
                    placeholder="pleace input First Name"
                    fullWidth
                  />
                </div>
                <div className='input'>
                  <TextField
                    label="Last Name"
                    style={{ margin: 8 }}
                    defaultValue={lastname}
                    onChange={(e) => {
                      setlastname(e.target.value)
                    }}
                    placeholder="pleace input Last Name"
                    fullWidth
                  />
                </div>
                <FormControl style={{ width: '100%', 'margin': '0 10px' }}>
                  <InputLabel id="state">state</InputLabel>
                  <Select
                    labelId="state"
                    id="demo-simple-select"
                    value={state}
                    onChange={(e) => {
                      setstate(e.target.value)
                    }}
                  >
                    <MenuItem value="busy">busy</MenuItem>
                    <MenuItem value="For lunch">For lunch</MenuItem>
                    <MenuItem value="sleep">sleep</MenuItem>
                  </Select>
                </FormControl>
                <div className='input'>
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
                <div className='input'>
                  <TextField
                    label="password"
                    style={{ margin: 8 }}
                    defaultValue={password}
                    onChange={(e) => {
                      setpassword(e.target.value)
                    }}
                    placeholder="pleace input password"
                    fullWidth
                  />
                </div>
                <div className='input'>
                  <TextField
                    label="individual resume"
                    minRows={4}
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

                    // 验证姓名
                    var filtername = /^([A-Za-z])+$/;
                    // 验证邮箱
                    var filteremail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\.\-])+\.)+([a-zA-Z]{2,4})+$/;
                    // 验证密码(可以包含特殊字符)
                    var filterpwd = /^([A-Za-z0-9_\.\’\-\s]{6,})+$/

                    if (firstname === '' || lastname === ''
                      || email === '' || password === ''
                      || description === ''
                      || state === ''
                    ) {
                      setmsg({
                        'message': 'pleace input data',
                      })
                    } else if (!filtername.test(firstname)) {
                      setmsg({
                        'message': 'First Name input error',
                      })
                    } else if (!filtername.test(lastname)) {
                      setmsg({
                        'message': 'Last Name input error',
                      })
                    } else if (!filteremail.test(email)) {
                      setmsg({
                        'message': 'email input error',
                      })
                    } else if (!filterpwd.test(password)) {
                      setmsg({
                        'message': 'Please enter a password of more than 6 characters',
                      })
                    } else if (description == '') {
                      setmsg({
                        'message': 'Please enter your personal profile',
                      })
                    } else {
                      toRegister();
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

          </Typography>
          : ''}
      </Container>
      {/* 提示信息 */}
      {msg != '' ? <Toast msg={msg} /> : ""}
    </div>
  )
}

export default EditUserData