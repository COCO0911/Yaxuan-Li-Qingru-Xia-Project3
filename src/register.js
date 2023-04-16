import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

function Register() {
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [surepassword, setsurepassword] = useState("");
    const navigate = useNavigate();
    return (
        <div id="content">
            <div id="mainbox">
                First Name <input type="text" className="firstname" value={firstname} onChange={(e) => {
                    setfirstname(e.target.value)
                }}></input><br></br>
                Last Name <input type="text" className="lastname" value={lastname} onChange={(e) => {
                    setlastname(e.target.value)
                }}></input><br></br>
                Email < input type="text" className="email" value={email} onChange={(e) => {
                    setemail(e.target.value)
                }}></input><br></br>
                password < input type="text" name="" id="" value={password} onChange={(e) => {
                    setpassword(e.target.value)
                }}></input><br></br>
                confirm password <input type="text" value={surepassword} onChange={(e) => {
                    setsurepassword(e.target.value)
                }}></input><br></br>
                <button onClick={() => {
                    // 验证姓名
                    var filtername = /^([A-Za-z])+$/;
                    // 验证邮箱
                    var filteremail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\.\-])+\.)+([a-zA-Z]{2,4})+$/;
                    // 验证密码(可以包含特殊字符)
                    var filterpwd = /^([A-Za-z0-9_\.\’\-\s]{8,})+$/

                    if (firstname === '' || lastname === '' || email === '' || password === '' || surepassword === '') {
                        alert('pleace input data')
                    } else if (!filtername.test(firstname)) {
                        alert('First Name input error')
                    } else if (!filtername.test(lastname)) {
                        alert('Last Name input error')
                    } else if (!filteremail.test(email)) {
                        alert('email input error')
                    } else if (!filterpwd.test(password)) {
                        alert('password input error')
                    } else if (password !== surepassword) {
                        alert('The password is inconsistent with the confirm password')
                    } else {
                        let data = { firstname, lastname, email, password }
                        navigate(`/file/${JSON.stringify(data)}`);
                    }
                }}>register</button>

            </div>
        </div>

    )
}

export default Register