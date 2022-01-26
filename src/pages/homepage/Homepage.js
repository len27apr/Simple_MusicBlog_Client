// import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PageNumbers } from "../../components/pageNumbers/pageNumber";
import { MiniCategories } from "../../components/miniCategories/miniCategories";

export default function Homepage() {

  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const searchValue = search.split('=')[0].substr(1);
  // console.log('\n\nsearch value is: ', searchValue);
  const [PagesData, setPagesData] = useState({
    firstValue: 1,
    secondValue: 2,
    thirdValue: 3,
    fourthValue: 4,
    hasPrev: false,
    hasNext: false,
    currentPage: 1,
    lastPage: 5
  })

  // const midPagesData=useMemo(()=>{
  //   return {value:midPages,setMidPages}
  // },[midPages])


  const fetchAllPosts = async (page, nextValue, previousValue) => {

    console.log('page number: ', page, ' is selected');
    let response;
    if (searchValue === 'cat') {
      // console.log('search value in fetchAllPosts is: ',searchValue);
      response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts${search}&currentPage=${page}`);
    }
    else if (searchValue === 'username') {
      // console.log('search value in fetchAllPosts is: ',searchValue);
      response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts${search}&currentPage=${page}`);
    }
    else {
      // console.log('No search value selected ');
      response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts?currentPage=${page}`);
    }
    setPosts(response.data.posts);
    setPagesData(prevState => {
      if (nextValue) {
        return {
          ...prevState,
          currentPage: Number(response.data.currentPage),
          lastPage: Number(response.data.lastPage),
          hasNext: true,
          hasPrev: false
        }
      }
      else if (previousValue) {
        return {
          ...prevState,
          currentPage: Number(response.data.currentPage),
          lastPage: Number(response.data.lastPage),
          hasPrev: true,
          hasNext: false,
        }
      }
      else {
        return {
          ...prevState,
          currentPage: Number(response.data.currentPage),
          lastPage: Number(response.data.lastPage),
          hasPrev: false,
          hasNext: false,
        }
      }
    })
  }


  useEffect(() => {
    const fetchPosts = async () => {
      let response;
      // console.log('use Effect called in homepage.js');
      // if (searchValue === 'cat') {
      //   response = await axios.get(`/posts${search}&currentPage=${selectedPage}`);
      // }
      // if (searchValue === 'username') {
      //   response = await axios.get(`/posts${search}&currentPage=${selectedPage}`);
      // }
      // response = await axios.get(`/posts?currentPage=${page}`);
      if (search) {
        response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts` + search);
      }
      else {
        response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts`);
      }
      setPosts(response.data.posts);
      setPagesData(prevState => {
        return {
          ...prevState,
          currentPage: Number(response.data.currentPage),
          lastPage: Number(response.data.lastPage),
          hasPrev: false,
          hasNext: false,
          firstValue: 1,
          secondValue: 2,
          thirdValue: 3,
          fourthValue: 4,
        }
      })
    }
    fetchPosts();
  }, [search]);
  
  
  return (
    <>
      <Header />
      <MiniCategories />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
      <PageNumbers
        lastPage={PagesData.lastPage}
        currentValue={PagesData.currentPage}
        hasNextValue={PagesData.hasNext}
        hasPrevValue={PagesData.hasPrev}
        setPagesData={setPagesData}
        fetchAllPosts={fetchAllPosts}
        firstPage={PagesData.firstValue}
        secondPage={PagesData.secondValue}
        thirdPage={PagesData.thirdValue}
        fourthPage={PagesData.fourthValue}
      />
    </>
  );
}
