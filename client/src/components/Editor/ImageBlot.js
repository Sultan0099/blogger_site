import { Quill } from "react-quill";

const BlockEmbed = Quill.import("blots/block/embed");

/*
  SECTION Image Blot start  
*/

class ImageBlot extends BlockEmbed {
  static create(value) {
    let node = super.create();

    node.style.width = "100%";
    node.setAttribute("contenteditable", false);
    // node.style.backgroundColor = "blue";
    node.style.margin = "0px auto";

    let imageTag = document.createElement("img");

    imageTag.setAttribute("src", value.src);
    imageTag.setAttribute("alt", value.alt);
    imageTag.style.width = "100%";
    imageTag.style.margin = "0px auto !important";
    node.append(imageTag);

    return node;
  }

  static value(node) {
    return {
      alt: node.getAttribute("alt"),
      src: node.getAttribute("src"),
    };
  }
}

ImageBlot.blotName = "image";
ImageBlot.tagName = "div";

Quill.register(ImageBlot);
/*
    Image Blot end
  */
