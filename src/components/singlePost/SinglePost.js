import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useLocation } from 'react-router-dom'
import "./singlePost.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

export default function SinglePost() {
  // let PF = 'http://localhost:8000/';
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [post, setPost] = useState({});
  const { user, token } = useContext(Context);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [updateMode, setupdateMode] = useState(false);
  const [file, setFile] = useState("");

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts/` + path);
      setPost(res.data);
    }
    getPost();
  }, [path])


  //Delete a post
  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/posts/` + path, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }, {
        data:
          { username: user.username }
      });
      window.location.replace('/');
    }
    catch (error) {
      console.log('The error occured while deleting a single post is: ', error);
    }
  }
  let destinationImagePath;
  let fileName;
  if (file) {
    destinationImagePath = post.photo.split('/');
    destinationImagePath.pop();
    fileName = Date.now() + file.name;
    destinationImagePath.push(fileName);
    destinationImagePath=destinationImagePath.join('/');
    console.log('the destination path is: ', destinationImagePath)
  }
  else{
    destinationImagePath=null;
    fileName=null;
  }

  console.log('the post.photo path is: ',post.photo);




  //Update a post
  const handleUpdate = async () => {
    console.log('updating the posts');
    const destinationImage = post.photo.split('/')[1];
    try {
      const userData = {
        username: user.username,
        title: title ? title : post.title,
        desc: desc ? desc : post.desc
      }
      let res;
      // let destinationImagePath;
      if (file) {
        const data = new FormData();
        data.append('username', userData.username);
        data.append('title', userData.title);
        data.append('desc', userData.desc);
        data.append('name', fileName);
        data.append('destination', destinationImage)
        data.append('photo',destinationImagePath)
        data.append('file', file);
        res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/posts/` + post._id, data, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
      }
      else {
        res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/posts/` + post._id, userData, {
          headers: {
            Authorization: 'Bearer' + token
          }
        })
      }
      console.log('the data after updation of posts is: ', res.data);
      setupdateMode(false);
      setPost(res.data);
    }
    catch (error) {
      console.log('The error occured while updating a post is: ', error);
    }
  }

  //Cancel Update
  const CancelUpdate = () => {
    setupdateMode(false);
    setFile(null);
  }

  return (

    <div className="singlePost">
      <div className="singlePostWrapper">
        {updateMode ?
          <>
            {file && <img
              className="writeImg2"
              src={URL.createObjectURL(file)}
              alt=""
            />}
            <div className="writeFormGroup2">
              <label htmlFor="fileInput">
                <i className="writeIcon fas fa-plus"></i>
              </label>
              <input id="fileInput" type="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
            </div>
          </>
          : post.photo && <img
            className="singlePostImg"
            src={process.env.REACT_APP_BACKEND_IMAGE_URL + post.photo}
            alt=""
          />}
        {
          updateMode ? (<input type='text' value={title} className='singlePostTitleInput' autoFocus onChange={(e) => setTitle(e.target.value)}
            placeholder={post.title} />
          ) : (
            <h1 className="singlePostTitle">
              {post.title}
              {post.username === user?.username && (
                <div className="singlePostEdit">
                  <i className="singlePostIcon far fa-edit" onClick={(e) => setupdateMode(true)}></i>
                  <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                </div>
              )}
            </h1>)}
        <div className="singlePostInfo">
          <span className='singlePostAuthor'>
            Author:
            <Link to={`/?username=${post.username}`} className='link'>
              <b> {post.username} </b>
            </Link>
          </span>
          <span>Genre: {post.categories}</span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode ?
          <>
            <textarea className='singlePostDescInput' value={desc} onChange={(e) => setDesc(e.target.value)}
              placeholder={post.desc} /> <br />
            <button className='singlePostButton' onClick={handleUpdate}>Update</button>
            <button className='singlePostButton singleCancelButton' onClick={CancelUpdate}>Cancel</button>
          </> :
          <p className="singlePostDesc" style={{ "whiteSpace": "pre-line" }}>
            {post.desc}
          </p>
        }
      </div>
    </div>
  );
}
