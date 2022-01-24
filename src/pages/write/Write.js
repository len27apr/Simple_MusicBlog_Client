import axios from "axios";
import { useState, useContext } from "react";
import { Context } from "../../context/Context";
import "./write.css";

export default function Write() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [Category, setCategory] = useState('');
  const [file, setFile] = useState('');
  const [categoryisInvalid, setCategoryIsInvalid] = useState(false);
  const { user } = useContext(Context);
  let modCategory;
  let newCategory;
  const MAIN_CATEGORIES = ['ROCK', 'PUNK ROCK', 'METAL', 'POP', 'HIP POP', 'EDM', 'TRANCE', 'COUNTRY'];
  const newPostData = new FormData();
  
  const handleSubmit = async (e) => {
    console.log('Submitting data');
    console.log('the image file is: ', file);
    e.preventDefault();
    const title1=title.toLowerCase().replace(/\s+/g, " ");;
    // console.log('the title1 is: ',title1.trim());
    const titleArray=title1.trim().split(' ');
    // console.log('the title Array is: ',titleArray);
    const newArray=titleArray.map(val=>{
      val=val.charAt(0).toUpperCase()+val.substring(1);
      return val
    })
    // console.log('The new Array is: ',newArray);
    const newTitle=newArray.join(' ');
    // console.log('the new title is: ', newTitle);
    newCategory = Category.toUpperCase();
    if (MAIN_CATEGORIES.includes(newCategory)) {
      modCategory = newCategory.charAt(0).toUpperCase() + newCategory.substring(1).toLowerCase();
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/categories`, {
        name: modCategory
      })
      setCategoryIsInvalid(false);
    }
    else {
      console.log('invalid value');
      setCategoryIsInvalid(true);
      return 0;
    }
    
    newPostData.append('title', newTitle);
    newPostData.append('desc', desc);
    newPostData.append('username', user.username);
    newPostData.append('categories', modCategory);
    newPostData.append('userId', user._id);

    if (file) {
      const fileName = Date.now() + file.name;
      // const data = new FormData();
      // data.append('name', fileName);
      // data.append('destination', modCategory);
      // data.append('file', file);
      newPostData.append("name", fileName);
      newPostData.append("destination", modCategory);
      newPostData.append("file", file);
     
    }
    console.log('creating a post successfull');
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/posts`, newPostData);
      window.location.replace('/post/' + res.data._id);
    }
    catch (error) {
      console.log("The error occured while uploading contents in Write.js is: ", error);
    }
  }
  // file && console.log('the file object is: ',URL.createObjectURL(file));
  // console.log('the file object is: ',file)
  return (
    <div className="write">
      {file && <img
        className="writeImg"
        src={URL.createObjectURL(file)}
        alt=""
      />}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={(e) => setDesc(e.target.value)}
          />
          {categoryisInvalid && <span className='invalid'>The category entered is Invalid</span>}
          <input
            className={`${"writeCategory"} ${categoryisInvalid && 'invalidInput'}`}
            placeholder="Category"
            type="text"
            autoFocus={true}
            onChange={(e) => { setCategory(e.target.value) }}
          />
          <button className="writeSubmit" type="submit">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
