import { useState, useRef, useEffect } from "react";
import "./index.css";
import Navbar from "../Navbar";
import StarRating from "./rating";
import CommentCard from "./commentCard";
import Editor from "./editor";
import { BiUserCircle } from "react-icons/bi";
import sanityClient from "../../client";

var urlRegex = /(https?:\/\/[^\s]+)/g;

export default function Discussion() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const commentRef = useRef();
  const [commentList, setCommentList] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || commentRef === "") {
      window.alert("Enter the credentials");
    } else {
      fetch(
        `https://kh2kvctg.api.sanity.io/v2021-06-07/data/mutate/production`,
        {
          method: "post",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer skkHdZTqupKswDvAF8nPWuL5dMVPMFaKTm3VpPvCSEGFu9QQn8yJskr4mJCoBEHr08dXkIIVylHTZ98oZA5hAawMJANrd3vePdRKDMKq3ovHCFkcza7Rx6N60f9Ift3fkACBqwh5shATCH7R42oVCdRWKOA1k8CAM8p6HdNS9lCugxWwPppJ`,
          },
          body: JSON.stringify({
            mutations: [
              {
                create: {
                  name,
                  content: commentRef.current.innerText,
                  rating,
                  _type: "Comment",
                },
              },
            ],
          }),
        }
      )
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

      const commentAdd = commentList.unshift({
        name,
        content: commentRef.current.innerText,
        rating,
        _type: "Comment",
      });
      setName("");
      setImageUrl("");
      commentRef.current.innerText = "";
      setCommentList(...commentAdd, ...commentList);
    }
  };

  const NameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const CommentChangeHandler = (e) => {
    const target = e.currentTarget;
    const value = e.target.innerText;
    const length = value.length;
    if (length === 0) {
      setImageUrl();
    }

    const urlInComment = value.match(urlRegex);

    if (urlInComment) {
      setImageUrl((previous) => [urlInComment]);
    }
    // if (value.search(urlRegex) === 1) {
    //   const url = value.replace(urlRegex, function (url) {
    //     return '<a href="' + url + '">' + url + "</a>";
    //   });
    //   commentRef.current.innerHTML = url;
    // } else {
    //   setImageUrl();
    // }
    setImageUrl(value?.match(urlRegex));
    // setEndOfContenteditable();
  };

  const deleteComment = (id) => {
    fetch(`https://kh2kvctg.api.sanity.io/v2021-06-07/data/mutate/production`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer skkHdZTqupKswDvAF8nPWuL5dMVPMFaKTm3VpPvCSEGFu9QQn8yJskr4mJCoBEHr08dXkIIVylHTZ98oZA5hAawMJANrd3vePdRKDMKq3ovHCFkcza7Rx6N60f9Ift3fkACBqwh5shATCH7R42oVCdRWKOA1k8CAM8p6HdNS9lCugxWwPppJ`,
      },
      body: JSON.stringify({
        mutations: [
          {
            delete: {
              id: id,
            },
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
    let removeData = [...commentList];
    removeData.splice(id, 1);
    setCommentList(removeData);
  };
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "Comment"]{
      _id,
      name,
      content,
      rating,
      hexCode,
    } | order(_createdAt desc)`
      )
      .then((commentList) => {
        setCommentList(commentList);
      })
      .catch(console.error);
  }, []);
  return (
    <>
      <Navbar />
      <div className="discussion">
        <div className="right">
          <div className="discuss">JOB DISQUS</div>

          <form className="comment-form">
            <div className="input-group">
              <div className="comment-name">
                <div className="line"> {commentList?.length} Comments</div>
                <div className="icon-name">
                  <div className="user-icon">
                    <BiUserCircle />
                  </div>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="form-control"
                    value={name}
                    onChange={NameChangeHandler}
                  />
                </div>
              </div>
            </div>
            <div className="star-rating">
              <div className="rating-text">You rated this </div>
              <StarRating onChange={setRating} />
            </div>
            <div className="input-group">
              <div
                type="text"
                className="form-control comment"
                contentEditable="true"
                data-placeholder="Join the discussion...."
                onInput={CommentChangeHandler}
                ref={commentRef}
              />
              <div className="icon-button">
                <Editor onUrlChange={setImageUrl} commentRef={commentRef} />

                <button className="submit" onClick={handleSubmit}>
                  Comment
                </button>
              </div>
              <div className="only-image">
                {imageUrl && (
                  <img
                    src={imageUrl[0]}
                    className={`${
                      imageUrl ? "image-text-editor" : "images-text-editor"
                    }`}
                  />
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="comment-section">
        <div className="comment-box">
          {commentList &&
            commentList?.map((comments) => {
              return (
                <CommentCard
                  key={comments._id}
                  value={comments}
                  deleteComment={() => deleteComment(comments._id)}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
