import React, { useState } from "react";
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github.css';

import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./editor.css";
import axios from "axios";


import CustomToolbar from "./CustomToolbar";
import "./ImageBlot";
import "./VideoBlot";
import "./FileBlot";

var FontAttributor = Quill.import("attributors/class/font");
FontAttributor.whitelist = [
  "sofia",
  "slabo",
  "roboto",
  "inconsolata",
  "ubuntu",
  "Jost",
];
Quill.register(FontAttributor, true);

/*
 SECTION:  Clipboard  start 
*/

const QuillClipboard = Quill.import("modules/clipboard");

// class Clipboard extends QuillClipboard {
//   getMetaTagElements = (stringValue) => {
//     const el = document.createElement("div");
//     el.innerHTML = stringValue;
//     console.log(el);
//     return el.getElementsByTagName("meta");
//   };

//   async onPaste(e) {
//     let clipboardData = e.clipboardData;
//     let pastedData = await clipboardData.getData("Text");

//     const urlMatches = pastedData.match(/\b(http|https)?:\/\/\S+/gi) || [];
//     if (urlMatches.length > 0) {
//       e.preventDefault();
//       urlMatches.forEach(link => {
//         axios.get(link)
//           .then(payload => {
//             // let title, image, url, description;
//             let title, image, url;
//             for (let node of this.getMetaTagElements(payload)) {
//               if (node.getAttribute("property") === "og:title") {
//                 title = node.getAttribute("content");
//               }
//               if (node.getAttribute("property") === "og:image") {
//                 image = node.getAttribute("content");
//               }
//               if (node.getAttribute("property") === "og:url") {
//                 url = node.getAttribute("content");
//               }
//               // if (node.getAttribute("property") === "og:description") {
//               //     description = node.getAttribute("content");
//               // }
//             }

//             const rendered = `<a href=${url} target="_blank"><div><img src=${image} alt=${title} width="20%"/><span>${title}</span></div></a>`;

//             let range = this.quill.getSelection();
//             let position = range ? range.index : 0;
//             this.quill.pasteHTML(position, rendered, 'silent');
//             this.quill.setSelection(position + rendered.length);
//           })
//           .catch(error => console.error(error));
//       });

//     } else {
//       super.onPaste(e);
//     }
//   }


// }

// Quill.register("modules/clipboard", Clipboard, true);

/*
  Clipboard end  
*/

class QuillEditor extends React.Component {
  constructor(props) {
    super(props);
    this.quillRef = null;
    this.reactQuillRef = null;
    this.state = { editorHtml: "" };
    this.imageRef = React.createRef();
    this.videoRef = React.createRef();
    this.fileRef = React.createRef();
  }

  componentDidMount() {
    this.attachQuillRefs();
  }

  componentDidUpdate() {
    this.attachQuillRefs();
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== "function") return;
    this.quillRef = this.reactQuillRef.getEditor();
  };

  //  SECTION DEFINED METHODS

  uploadFiles = async (data) => {
    const opt = {
      headers: {
        "content-type": "multipart/form-data",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    };

    return await axios.post("/api/post/uploadFiles", data, {
      ...opt,
    });
  };

  handleChange = (html) => {
    this.setState({ editorHtml: html }, () => {
      this.props.onEditorStateChange(this.state.editorHtml)
    });

  };

  imageHandler = () => {
    this.imageRef.current.click();
  };

  videoHandler = () => {
    this.videoRef.current.click();
  };

  fileHandler = () => {
    this.fileRef.current.click();
  };

  insertImage = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (
      e.currentTarget &&
      e.currentTarget.files &&
      e.currentTarget.files.length > 0
    ) {
      const value = e.currentTarget.files[0];
      console.log(value);
      let formData = new FormData();
      formData.append("file", value);

      // posting file from AXIOS
      const res = await this.uploadFiles(formData);
      if (res) {
        const quill = this.reactQuillRef.getEditor();

        quill.focus();

        let range = quill.getSelection();
        let position = range.index;
        quill.insertEmbed(position, "image", {
          src: res.data.data.url,
          alt: res.data.data.name,
        });

        quill.setSelection(position + 1);
      }
      this.imageRef.current.value = null;
    }
  };

  insertVideo = async (e) => {
    console.log(e.currentTarget.files[0]);
    e.stopPropagation();
    e.preventDefault();
    if (
      e.currentTarget &&
      e.currentTarget.files &&
      e.currentTarget.files.length > 0
    ) {
      const value = e.currentTarget.files[0];
      console.log(value);
      let formData = new FormData();
      formData.append("file", value);

      // posting file from AXIOS
      const res = await this.uploadFiles(formData);
      if (res) {
        const quill = this.reactQuillRef.getEditor();
        console.log(res);
        quill.focus();

        let range = quill.getSelection();
        let position = range.index;
        quill.insertEmbed(position, "video", {
          src: res.data.data.url,
          title: res.data.data.name,
        });

        quill.setSelection(position + 1);
      }



      this.videoRef.current.value = null;
    }
  };

  insertFile = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(e.currentTarget.files[0]);
    if (
      e.currentTarget &&
      e.currentTarget.files &&
      e.currentTarget.files.length > 0
    ) {
      const value = e.currentTarget.files[0];
      console.log(value);
      let formData = new FormData();
      formData.append("file", value);

      // posting file from AXIOS
      const res = await this.uploadFiles(formData);

      if (res) {

        const quill = this.reactQuillRef.getEditor();
        console.log(res);
        quill.focus();

        let range = quill.getSelection();
        let position = range.index;
        quill.insertEmbed(position, "file", {
          url: res.data.data.url,
          title: res.data.data.name,
        });

        quill.setSelection(position + 1);

      }

      this.fileRef.current.value = null;
    }
  };

  render() {
    return (
      <div className="text-editor">
        <CustomToolbar />
        <ReactQuill
          ref={(el) => {
            this.reactQuillRef = el;
          }}
          placeholder="Start Writing"
          theme={"snow"}
          onChange={this.handleChange}
          modules={this.modules}
          formats={this.formats}
          value={this.state.editorHtml}
        />
        <input
          type="file"
          accept="image/*"
          ref={this.imageRef}
          style={{ display: "none" }}
          onChange={this.insertImage}
        />
        <input
          type="file"
          accept="video/*"
          ref={this.videoRef}
          style={{ display: "none" }}
          onChange={this.insertVideo}
        />
        <input
          type="file"
          accept="*"
          ref={this.fileRef}
          style={{ display: "none" }}
          onChange={this.insertFile}
        />
      </div>
    );
  }
  modules = {
    // syntax: true,
    toolbar: {
      container: "#toolbar",
      handlers: {
        insertImage: this.imageHandler,
        insertVideo: this.videoHandler,
        insertFile: this.fileHandler,
      },
    },
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "image",
    "video",
    "file",
    "link",
    "code-block",
    "video",
    "blockquote",
    "clean",
  ];
}

console.log("handler", QuillEditor.imageHandler);

export default QuillEditor;
