import { Quill } from "react-quill";

const BlockEmbed = Quill.import("blots/block/embed");

class VideoBlot extends BlockEmbed {
  static create(value) {
    if (value && value.src) {
      const node = super.create();
      node.style.width = "100%";

      const videoTag = document.createElement("video");
      videoTag.setAttribute("src", value.src);
      videoTag.setAttribute("title", value.title);
      videoTag.setAttribute("width", "100%");
      videoTag.setAttribute("controls", "");

      node.append(videoTag);
      return node;
    }
  }

  static value(node) {
    node.onPlay = () => console.log("i played");
    if (node.getAttribute("title")) {
      return {
        src: node.getAttribute("src"),
        title: node.getAttribute("title"),
      };
    } else {
      return node.getAttribute("src");
    }
    // return { src: node.getAttribute('src'), alt: node.getAttribute('title') };
  }
}

VideoBlot.blotName = "video";
VideoBlot.tagName = "div";
Quill.register(VideoBlot);
