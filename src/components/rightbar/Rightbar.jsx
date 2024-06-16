// components/rightbar/Rightbar.jsx
import "./rightbar.css";
import Online from "../online/Online";
import { Users } from "../../Dummydata";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser?.followings.includes(user?.id));

  useEffect(() => {
    setFollowed(currentUser?.followings.includes(user?.id));
  }, [currentUser, user?.id]);

  useEffect(() => {
    const getFriends = async () => {
      if (user?._id) {
        try {
          const friendList = await axios.get(`/users/friends/${user._id}`);
          setFriends(friendList.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getFriends();
  }, [user]);


  const handleClick = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${currentUser.token}` } // Assuming you are using JWT tokens
      };
      if (followed) {
        await axios.put(`http://localhost:8800/api/users/${user._id}/unfollow`, { userId: currentUser._id }, config);
        dispatch({ type: 'UNFOLLOW', payload: user._id });
      } else {
        await axios.put(`http://localhost:8800/api/users/${user._id}/follow`, { userId: currentUser._id }, config);
        dispatch({ type: 'FOLLOW', payload: user._id });
      }
    } catch (err) {
      console.log("Error following/unfollowing user:", err);
    }
    setFollowed(!followed);
  };

  const HomeRightbar = () => (
    <>
      <div className="birthdayContainer">
        <img className="birthdayImg" src="/assets/gift.png" alt="" />
        <span className="birthdayText"><b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.</span>
      </div>
      <img className="rightbarAd" src="/assets/ad.png" alt="" />
      <h4 className="rightbarTitle">Online Friends</h4>
      <ul className="rightbarFriendList">
        {Users.map((u) => (
          <Online key={u.id} user={u} />
        ))}
      </ul>
    </>
  );

  const ProfileRightbar = () => (
    <>
      {user?.username !== currentUser?.username && (
        <button className="rightbarFollowButton" onClick={handleClick}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <Remove /> : <Add />}
        </button>
      )}
      <h4 className="rightbarTitle">User information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{user?.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">{user?.from}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">
            {user?.relationship === 1 ? "Single" : user?.relationship === 1 ? "Married" : "Complicated"}
          </span>
        </div>
      </div>
      <h4 className="rightbarTitle">User friends</h4>
      <div className="rightbarFollowings">
        {friends.map((friend) => (
          <Link to={`/profile/${friend.username}`} style={{ textDecoration: "none" }} key={friend._id}>
            <div className="rightbarFollowing">
              <img
                src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.jpg"}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">{friend.username}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}