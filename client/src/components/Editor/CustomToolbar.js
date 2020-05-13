import React from "react";

import CameraAltIcon from "@material-ui/icons/CameraAlt";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import AttachmentIcon from "@material-ui/icons/Attachment";

const CustomToolbar = () => (
  <div className="toolbar">
    <div id="toolbar">
      <select
        className="ql-header"
        defaultValue={""}
        onChange={(e) => e.persist()}
      >
        <option value="1" />
        <option value="2" />
        <option value="" />
      </select>
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
      <button className="ql-insertImage">
        <CameraAltIcon />
      </button>
      <button className="ql-insertVideo">
        <VideoCallIcon />
      </button>
      <button className="ql-insertFile">
        <AttachmentIcon />
      </button>
      <button className="ql-link" />
      <button className="ql-code-block" />
      <button className="ql-video" />
      <button className="ql-blockquote" />
      <button className="ql-clean" />
    </div>
  </div>
);

export default CustomToolbar;
