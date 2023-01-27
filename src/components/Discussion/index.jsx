import { useState, useRef, useEffect } from "react";
import "./index.css";
import Navbar from "../Navbar";
import StarRating from "./rating";
import CommentCard from "./commentCard";
import Editor from "./editor";
import { BiUserCircle } from "react-icons/bi";
import sanityClient from "../../client";

var urlRegex = /\b(https?:\/\/[^\s]+)/g;

export default function Discussion() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const commentRef = useRef();
  const [commentList, setCommentList] = useState(null);
  const [urlList, setUrlList] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || comment.length === "") {
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

      const newComment = commentList.unshift({
        name,
        content: commentRef.current.innerText,
        rating,
        _type: "Comment",
      });
      setName("");
      setImageUrl("");
      commentRef.current.innerText = "";
      setCommentList(...newComment, ...commentList);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleCommentChange = (e) => {
    const value = e.currentTarget.innerText;
    const newLength = value?.length;
    if (newLength === 0) {
      setUrlList([]);
      setImageUrl();
      return;
    }
    if (value?.match(urlRegex)) {
      setUrlList(value?.match(urlRegex));
    } else {
      setUrlList([]);
    }
  };

  useEffect(() => {
    if (urlList?.length !== 0) {
      setImageUrl(urlList[0]);
    } else {
      setImageUrl("");
    }
  }, [urlList]);

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
                    onChange={handleNameChange}
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
                onInput={handleCommentChange}
                ref={commentRef}
              />
              <div className="icon-button">
                <Editor onUrlChange={setUrlList} commentRef={commentRef} />

                <button
                  className="submit"
                  data-testid="reset-comment"
                  onClick={handleSubmit}
                >
                  Comment
                </button>
              </div>
              <div className="only-image">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    className={`${imageUrl ? "image-text-editor" : ""}`}
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
