import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  ImBold,
  ImItalic,
  ImUnderline,
  ImImage,
  ImQuotesLeft,
} from "react-icons/im";
import { SyncLoader } from "react-spinners";

const Editor = ({ onUrlChange, commentRef }) => {
  const [spinner, setSpinner] = useState(false);
  function HandleBold() {
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
    setSpinner(true);

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
        setSpinner(false);
        const imageUrl = res.data.secure_url;
        onUrlChange((prev) => [...prev, imageUrl]);
        // console.log(commentRef.current.innerHTML);
        commentRef.current.innerText += imageUrl;
        // console.log(commentRef.current.innerHTML+=imageUrl);
      });
  }

  function HandleItalic() {
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
  function HandleUnderline() {
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
  function HandleQuote() {
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
        <button type="button" className="bold" onClick={HandleBold}>
          <ImBold />
        </button>
        <button type="button" className="italic" onClick={HandleItalic}>
          <ImItalic />
        </button>
        <button type="button" className="underline" onClick={HandleUnderline}>
          <ImUnderline />
        </button>

        <input
          type="file"
          className="comment-image"
          accept="image/*"
          onInput={uploadImage}
          data-testid="images-only"
          id="image"
          style={{ display: "none" }}
        />
        {spinner && (
          <p className="image-loader">
            <SyncLoader color="#36d7b7" />
          </p>
        )}
        <label htmlFor="image">
          <ImImage />
        </label>
        <button type="button" className="code" onClick={HandleQuote}>
          <ImQuotesLeft />
        </button>
      </div>
      <div className="image-url"></div>
    </>
  );
};

export default Editor;
