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
        const imageUrl = res.data.secure_url;
        onUrlChange((prev) => [...prev, imageUrl]);
        commentRef.current.innerText += imageUrl;
        setSpinner(false);
      });
  }

  function textActions(textStyle) {
    let styleTag = document.createElement(textStyle);
    if (window.getSelection) {
      var rangeSelection = window.getSelection();
      if (rangeSelection.rangeCount) {
        var range = rangeSelection.getRangeAt(0).cloneRange();
        range.surroundContents(styleTag);
        rangeSelection.removeAllRanges();
        rangeSelection.addRange(range);
      }
    }
  }

  return (
    <>
      <div className="styling-buttons">
        <button type="button" className="bold" onClick={() => textActions("b")}>
          <ImBold />
        </button>
        <button
          type="button"
          className="italic"
          onClick={() => textActions("i")}
        >
          <ImItalic />
        </button>
        <button
          type="button"
          className="underline"
          onClick={() => textActions("u")}
        >
          <ImUnderline />
        </button>

        <input
          type="file"
          className="comment-image"
          accept="image/*"
          onInput={uploadImage}
          data-testid="image-upload"
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
        <button
          type="button"
          className="code"
          onClick={() => textActions("blockquote")}
        >
          <ImQuotesLeft />
        </button>
      </div>
    </>
  );
};

export default Editor;
