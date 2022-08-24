import { useState, useEffect } from "react"
import axios from "axios"
import { API_URL } from "../config.js"

const ProfilePage = () => {

  const [userInfo, setUserInfo] = useState([])

  const [userPasswords, setUserPasswords] = useState({
    currentPassword: "", 
    newPassword: "", 
    newPasswordConfirm: ""
  })

  const [formError, setFormError] = useState("")

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

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    try {
      
    } catch (error) {
      console.log("pw change error", error)
    }
  }

  const handleChange = () => {
    
  }
  
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
        <form onSubmit={handleFormSubmit}>
          <h3>Change Password</h3>
          <div className="change-password-text">
            <p>Enter current password</p>
            <p>Enter new password</p>
            <p>Confirm new password</p>
          </div>
          <div className="change-password-fields">
            <input type="password" name="currentPassword" placeholder="Your current password" onChange={handleChange} />
            <input type="password" name="newPassword" placeholder="Your new password" onChange={handleChange} />
            <input type="password" name="newPasswordConfirm" placeholder="Confirm new password" onChange={handleChange} />
          </div>
          <input type="submit" value="Change Password" />
        </form>
      </div>
    </>
  )
}

export default ProfilePage