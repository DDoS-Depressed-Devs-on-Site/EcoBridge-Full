import React, { useState, useContext } from "react";
import "./CommunityHub.scss";
import profilePic from "../../assets/profile.png";
import profileBg from "../../assets/profilebg.png";
import UserContext from "../../scripts/Context/UserContext";
import Navbar from "../../components/Navbar-no-gymnastic/Navbar";
import OrgContext from "../../scripts/Context/OrgContext";

const CommunityHub = () => {
  const [postInput, setPostInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null); 
  const { user, setUser } = useContext(UserContext);
  const { org, setOrg } = useContext(OrgContext);
  const account = user || org;

  const handlePublishPost = () => {
    if (!postInput.trim()) return;

    const newPost = {
      id: Date.now(),
      author: user.username,
      content: postInput,
      date: new Date().toLocaleString(),
      image: image,
      video: video,
    };

    setPosts([newPost, ...posts]);
    setPostInput("");
    setImage(null);
    setVideo(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const profilePicSrc = account?.picture
  ? `data:image/png;base64,${account.picture}`
  : profilePic;

  const backgroundImageSrc = account?.cover_photo
  ? `url(data:image/png;base64,${account.cover_photo})`
  : `url(${profileBg})`;

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="community-hub">
          <aside className="user-profile">
            <div className="user-card">
              <div
                className="profile-bg"
                style={{ backgroundImage: backgroundImageSrc}}
              ></div>
              <img
                src={profilePicSrc}
                alt="profile"
                className="profile-pic"
              />
              <h2 className="user-name">{account?.username}</h2>
              <p className="bio">
                {account?.description}
              </p>

              <div className="counts">
                <div className="count-row">
                  <span className="count">Volunteer Counts: </span>
                  <span className="counts-numbers">420</span>
                </div>
                <div className="count-row">
                  <span className="count">Donation Counts: </span>
                  <span className="counts-numbers">969</span>
                </div>
              </div>
            </div>

            <nav className="menu">
              <ul>
                <li>Groups</li>
                <li>Events</li>
                <li>Random</li>
                <li>Discover More</li>
              </ul>
            </nav>
          </aside>

          <main className="main-content">
            <div className="create-post">
              <input
                type="text"
                placeholder="Start a post"
                value={postInput}
                onChange={(e) => setPostInput(e.target.value)}
              />
              <div className="actions">
                <button
                  onClick={() => document.getElementById("imageInput").click()}
                >
                  📷 Photo
                </button>
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <button
                  onClick={() => document.getElementById("videoInput").click()}
                >
                  🎥 Video
                </button>
                <input
                  id="videoInput"
                  type="file"
                  accept="video/*"
                  style={{ display: "none" }}
                  onChange={handleVideoChange} 
                />
                <button onClick={handlePublishPost}>📝 Publish Post</button>
              </div>
            </div>

            {/* User Posts */}
            {posts.map((post) => (
              <div className="post" key={post.id}>
                <div className="post-header">
                  <img src={profilePicSrc} alt="Profile" className="profile-pic" />
                  <div>
                    <h3>{post.author}</h3>
                    <p>{post.date}</p>
                  </div>
                </div>
                <div className="post-body">
                  <p>{post.content}</p>
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post Image"
                      className="post-image"
                    />
                  )}
                  {post.video && (
                    <video controls className="post-video">
                      <source src={post.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                <div className="post-footer">
                  <button>Like</button>
                  <button>Comment</button>
                  <button>Repost</button>
                  <button>Send</button>
                </div>
              </div>
            ))}
          </main>

          <aside className="connections">
            <h4 className="connectionsTitle">Connect to other Volunteers</h4>
            <ul>
              <li>
                <strong>Arigato Grande</strong>
                <br />
                <button>Connect</button>
              </li>
              <li>
                <strong>Ariyanka Grashanti</strong>
                <br />
                <button>Connect</button>
              </li>
              <li>
                <strong>Ritsard Yapsalot</strong>
                <br />
                <button>Unconnect</button>
              </li>
              <li>
                <strong>Sheti Sharon</strong>
                <br />
                <button>Connect</button>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </>
  );
};

export default CommunityHub;
