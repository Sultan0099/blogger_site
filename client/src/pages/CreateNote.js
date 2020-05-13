import React, { useState } from "react";

import Button from "@material-ui/core/Button";

import { connect } from "react-redux";

import QuillEditor from "../components/Editor/Editor";
import * as postActions from "../api/post.api";


function CreateNote(props) {
  let [editorState, setEditorState] = useState();

  const handleSubmit = () => {
    console.log("handle Submit called");
    props.createPost({ writer: props.user.user.id, title: "hello world", body: editorState })
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
    <div
      style={{
        width: "60%",
        margin: "30px auto",
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: { ...state.user }
  }
}

export default connect(mapStateToProps, postActions)(CreateNote)
