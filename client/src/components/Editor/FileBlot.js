import { Quill } from "react-quill";

const BlockEmbed = Quill.import("blots/block/embed");

class FileBlot extends BlockEmbed {
  static create(value) {
    const node = super.create();
    node.setAttribute("class", "file");
    const p = document.createElement("p");
    p.innerText = value.title;

    const a = document.createElement("a");
    a.setAttribute("href", value.url);
    a.innerText = "download";

    node.style.cursor = "pointer";

    node.append(p);
    node.append(a);

    return node;
  }

  static value(node) {
    const linkTag = node.querySelector("a");
    return linkTag.getAttribute("href");
  }
}

FileBlot.blotName = "file";
FileBlot.tagName = "div";
FileBlot.className = "file";
Quill.register(FileBlot);
