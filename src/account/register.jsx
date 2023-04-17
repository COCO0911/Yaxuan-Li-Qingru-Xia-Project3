import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Snackbar } from '@material-ui/core';
import { UserRegister } from './../api/account';
function Register() {
  const [firstname, setfirstname] = useState('Davia');
  const [lastname, setlastname] = useState('Jam');
  const [email, setemail] = useState('yjsz002@163.com');
  const [password, setpassword] = useState('123456');
  const [surepassword, setsurepassword] = useState('123456');
  const [description, setdescription] = useState('user description');
  const [open, setOpen] = useState(false);
  const [msgtxt, setmsgtxt] = useState('');
  const [success, setsuccess] = useState(false);
  const navigate = useNavigate();
  /* register */
  const toRegister = () => {
    UserRegister({
      Firstname: firstname,
      Lastname: lastname,
      Email: email,
      password: password,
      description: description,
    })
      .then(res => {
        console.log(res);
        if (res.code == '001') {
          console.log(res.result);
          setmsgtxt(res.result);
          setOpen(true);
        } else {
          let data = { firstname, lastname, email, password };
          localStorage.setItem('token', res.token);
          setmsgtxt('Register successfully to jump to the home page');
          setOpen(true);
          setsuccess(true);
        }
      })
      .catch(err => {
        console.log(err);
        setsuccess(false);
        setmsgtxt(err.message);
        setOpen(true);
      });
  };
  const handleClose = (event, reason) => {
    setOpen(false);
    if (success == true) {
      navigate(`/home`);
    }
  };
  return (
    <div className="loginbox">
      <div className="main">
        <h1>Register</h1>
        <div className="input">
          <TextField
            label="First Name"
            style={{ margin: 8 }}
            onChange={e => {
              setfirstname(e.target.value);
            }}
            defaultValue={firstname}
            placeholder="pleace input First Name"
            fullWidth
          />
        </div>
        <div className="input">
          <TextField
            label="Last Name"
            style={{ margin: 8 }}
            defaultValue={lastname}
            onChange={e => {
              setlastname(e.target.value);
            }}
            placeholder="pleace input Last Name"
            fullWidth
          />
        </div>
        <div className="input">
          <TextField
            label="Email"
            style={{ margin: 8 }}
            defaultValue={email}
            onChange={e => {
              setemail(e.target.value);
            }}
            placeholder="pleace input Email"
            fullWidth
          />
        </div>
        <div className="input">
          <TextField
            label="password"
            style={{ margin: 8 }}
            defaultValue={password}
            onChange={e => {
              setpassword(e.target.value);
            }}
            placeholder="pleace input password"
            fullWidth
            type="password"
          />
        </div>
        <div className="input">
          <TextField
            label="confirm password"
            style={{ margin: 8 }}
            defaultValue={surepassword}
            onChange={e => {
              setsurepassword(e.target.value);
            }}
            placeholder="pleace input confirm password"
            fullWidth
            type="password"
          />
        </div>
        <div className="input">
          <TextField
            label="individual resume"
            minRows={4}
            style={{ margin: 8 }}
            defaultValue={description}
            onChange={e => {
              setdescription(e.target.value);
            }}
            placeholder="Please enter your personal profile"
            fullWidth
            type="text"
            multiline
          />
        </div>
        <p>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              var filtername = /^([A-Za-z])+$/;

              var filteremail =
                /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\.\-])+\.)+([a-zA-Z]{2,4})+$/;

              var filterpwd = /^([A-Za-z0-9_\.\’\-\s]{6,})+$/;

              if (
                firstname === '' ||
                lastname === '' ||
                email === '' ||
                password === '' ||
                surepassword === ''
              ) {
                setmsgtxt('pleace input data');
                setOpen(true);
              } else if (!filtername.test(firstname)) {
                setmsgtxt('First Name input error');
                setOpen(true);
              } else if (!filtername.test(lastname)) {
                setmsgtxt('Last Name input error');
                setOpen(true);
              } else if (!filteremail.test(email)) {
                setmsgtxt('email input error');
                setOpen(true);
              } else if (!filterpwd.test(password)) {
                setmsgtxt('Please enter a password of more than 6 characters');
                setOpen(true);
              } else if (password !== surepassword) {
                setmsgtxt(
                  'The password is inconsistent with the confirm password'
                );
                setOpen(true);
              } else if (description == '') {
                setmsgtxt('Please enter your personal profile');
                setOpen(true);
              } else {
                toRegister();
              }
            }}
          >
            register
          </Button>
        </p>
        <p>
          <Button
            onClick={() => {
              navigate(`/login`);
            }}
          >
            to Login
          </Button>
        </p>
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
        action={<div />}
      />
    </div>
  );
}

export default Register;
