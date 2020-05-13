import React, { useEffect } from "react";
import "./welcome.css";
import { connect } from "react-redux";
import * as actions from "../api/post.api";

import Navbar from "../components/Navbar";
import Post from "../components/Post";

function Welcome(props) {

  useEffect(() => {

    async function fetchingPosts() {
      await props.getAllPosts();
    }

    fetchingPosts();
  }, [])
  if (!props.user.user) return <p> loading ...</p>;
  const { posts } = props;
  console.log("welcome props", props);
  return (
    <>
      <Navbar {...props}></Navbar>
      <div className="post-container">
        {
          posts && posts.posts.map((p) => (
            <Post key={p._id} id={p._id} title={p.title} body={p.body} createdAt={p.createdAt} />
          ))
        }

      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: { ...state.user },
    posts: { ...state.post }
  };
};

export default connect(mapStateToProps, actions)(Welcome);
