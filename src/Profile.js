import React, { useEffect, useState } from "react";
import Post from "./Post";
import "./Profile.scss";
import { addFollower, addFollowing, getProfileById, getTweetsById } from "./api";
import { useParams } from "react-router-dom";
import { getUserInformation } from "./utils";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [information, setInformation] = useState();

  const {user_id: localUserId} = getUserInformation();

  const { user_id } = useParams();

  const fetchMyTweets = async () => {
    const response = await getTweetsById(user_id);
    const responseData = await response.json();
    setPosts(responseData);
  };

  const fetchMyInfo = async () => {
    const response = await getProfileById(user_id);
    const responseData = await response.json();
    setInformation(responseData[0]);
  };

  const handleFollowOnClick = async () => {
    await addFollowing(localUserId, user_id)
    await addFollower(localUserId, user_id)
    await fetchMyInfo();
  }

  useEffect(() => {
    fetchMyInfo();
    fetchMyTweets();
  }, []);
  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-header-title">Profile</div>
      </div>
      <div className="profile-information">
        <div className="profile-information-left">
          <div>email: {information?.email}</div>
          <div>username: {information?.username}</div>
        </div>
        <div className="profile-information-right">
          <div>followers: {information?.followers.length}</div>
          <div>following: {information?.following.length}</div>
        </div>
        {localUserId !== user_id && (<div>
          <button
            className="home-create-tweet-button-post"
            onClick={() => handleFollowOnClick()}
          >
            {information?.following.includes(user_id) ? 'Unfollow' : 'Follow'}
          </button>
        </div>)}
      </div>
      {posts &&
        posts?.map((d, i) => (
          <Post
            key={i}
            userId={d.user_id}
            name={d.email}
            username={d.username}
            message={d.paragraph}
            date={d.date}
          />
        ))}
    </div>
  );
};

export default Profile;
