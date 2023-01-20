import React, { useEffect } from "react";
import { useState } from "react";
import {
  ImBold,
  ImItalic,
  ImUnderline,
  ImImage,
  ImQuotesLeft,
} from "react-icons/im";

import axios from "axios";

const Comment = ({ onUrlChange, imageUrl, commentRef }) => {
  const [file, setFile] = useState();
  function onHandleBold() {
    let bold = document.createElement("b");
    if (window.getSelection) {
      var sel = window.getSelection();
      if (sel.rangeCount) {
        var range = sel.getRangeAt(0).cloneRange();
        range.surroundContents(bold);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }

  function uploadImage(event) {
    const fileToUpload = event.target.files[0];

    var formData = new FormData();
    formData.append("file", fileToUpload);
    formData.append("api_key", "316255361857537");
    formData.append("upload_preset", "i74l2yd4");

    axios
      .post(
        "https://api.cloudinary.com/v1_1/ddmtjxz7e/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        const url = res.data.secure_url;
        onUrlChange(url);
        commentRef.current.innerHTML+= url
      });
  }

  function onHandleItalic() {
    const italic = document.createElement("i");
    if (window.getSelection) {
      var sel = window.getSelection();
      if (sel.rangeCount) {
        var range = sel.getRangeAt(0).cloneRange();
        range.surroundContents(italic);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }
  function onHandleUnderline() {
    const underline = document.createElement("u");
    if (window.getSelection) {
      var sel = window.getSelection();
      if (sel.rangeCount) {
        var range = sel.getRangeAt(0).cloneRange();
        range.surroundContents(underline);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }
  function onHandleQuote() {
    const quaotaion = document.createElement("blockquote");
    if (window.getSelection) {
      var sel = window.getSelection();
      if (sel.rangeCount) {
        var range = sel.getRangeAt(0).cloneRange();
        range.surroundContents(quaotaion);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }

  return (
    <>
      <div className="styling-buttons">
        <button type="button" className="bold" onClick={onHandleBold}>
          <ImBold />
        </button>
        <button type="button" className="italic" onClick={onHandleItalic}>
          <ImItalic />
        </button>
        <button type="button" className="underline" onClick={onHandleUnderline}>
          <ImUnderline />
        </button>
        <input
          type="file"
          className="comment-image"
          accept="image/*"
          onInput={uploadImage}
          id="image"
          style={{ display: "none" }}
        />
        <label htmlFor="image">
          <ImImage />
        </label>
        <button type="button" className="code" onClick={onHandleQuote}>
          <ImQuotesLeft />
        </button>
      </div>
      <div className="image-url">
        <img src={imageUrl} className={`${imageUrl ? "image-text-editor" : ""}`} style={{width: "100px"}}/>
      </div>
    </>
  );
};

export default Comment;
