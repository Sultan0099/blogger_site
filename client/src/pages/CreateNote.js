import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';

import { connect } from "react-redux";


import QuillEditor from "../components/Editor/Editor";
import SimpleNavbar from "../components/SimpleNavbar"
import * as postActions from "../api/post.api";





function CreateNote(props) {
  const [editorState, setEditorState] = useState();
  const [open, setOpen] = React.useState(false);


  const handleSubmit = async () => {
    console.log("handle Submit called");
    const res = await props.createPost({ writer: props.user.user.id, title: "hello world", body: editorState })
    console.log("postCreated", res)
    setOpen(true);
    setTimeout(() => props.history.push("/"), 2000)
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onEditorStateChange = (d) => {
    console.log("editor state change", d)
    setEditorState(d)
  }

  const onEditorFilesChange = () => {
    console.log("editor files change")
  }

  console.log("writer", props.user)

  return (

    <>
      <SimpleNavbar path="/" />
      <div
        style={{
          width: "60%",
          margin: "100px auto",
          borderRadius: "40px",
        }}
      >
        <QuillEditor
          onEditorFilesChange={onEditorFilesChange}
          onEditorStateChange={onEditorStateChange}
        />
        <Button
          type="button"
          variant="outlined"
          color="primary"
          size="large"
          onClick={handleSubmit}
        >
          {" "}
        Submit{" "}
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message="Post has created Successfully " variant="success" />


      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: { ...state.user }
  }
}

export default connect(mapStateToProps, postActions)(CreateNote)
