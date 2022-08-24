import { useState, useEffect } from "react"
import axios from "axios"
import { API_URL } from "../config.js"

const ProfilePage = () => {

  const [userInfo, setUserInfo] = useState([])

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/profile`)
        console.log("user data", data)
        setUserInfo(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUserInfo()
  }, [])
  
  return (
    <>
      <h1>hello</h1>
      <div className="user-info-div">
        <div className="left-column-user-info">
          <p>Your username is:</p>
          <p>Your email is:</p>
          <p>You created this account on: </p>
        </div>
        <div className="right-column-user-info">
          <p>{userInfo.username}</p>
          <p>{userInfo.email}</p>
          <p>{userInfo.createdAt}</p>
        </div>
      </div>
      <div className="change-password">
        <form action="">
          <h3>Change Password</h3>
          <div className="change-password-text">
            <p>Enter current password</p>
            <p>Enter new password</p>
            <p>Confirm new password</p>
          </div>
          <div className="change-password-fields">
            <input type="password" name="" id="" />
            <input type="password" name="" id="" />
            <input type="password" name="" id="" />
          </div>
        </form>

      </div>


    </>
  )
}

export default ProfilePage