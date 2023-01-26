import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import parse from "html-react-parser";
import Reply from "./reply";
import { SyncLoader } from "react-spinners";


var urlRegex = /\b(https?:\/\/[^\s]+)/g;

const CommentCard = ({ value, deleteComment,spinner }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reply, setReply] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [replyBox, setReplyBox] = useState(false);

  function addReply(name, comment) {
    setReply([...reply, { name, comment }]);
    setIsOpen(!isOpen);
  }

  const deleteReply = (index) => {
    let deleteList = [...reply];
    deleteList.splice(index, 1);
    setReply(deleteList);
  };

  const imageUrl = value?.content?.match(urlRegex); //it matches/check and match our content with the urlregex and store in imageurl
  //The match() method retrieves the result of matching a string against a regular expression.
  return (
    <>
      {spinner && (
        <p className="image-loader">
          <SyncLoader color="#36d7b7" />
        </p>
      )}
      <div className="comment-boxes" key={value._id}>
        <div className="review">
          <div className="top-area">
            <div className="comment-left">
              <div className="name"> {value.name}</div>
              <div className="rating">{value.rating}⭐️</div>
            </div>
            <div className="add-icon" onClick={() => setToggle(!toggle)}>
              {toggle ? "-" : "+"}
            </div>
          </div>
          {toggle && (
            <div>
              <div className="comment">
                {parse(value.content.replace(urlRegex, ""))}
              </div>
              {imageUrl && (
                <img
                  src={imageUrl}
                  className={`${imageUrl ? "image-text-editor" : ""}`}
                  style={{ width: "150px" }}
                />
              )}

              <div className="buttons">
                <button
                  type="button"
                  className="reply"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <div className="reply-btn">Reply</div>
                </button>
                <button className="reply-count">
                  <div
                    className="view-reply"
                    onClick={() => setReplyBox(!replyBox)}
                  >
                    {replyBox ? "Hide Reply" : "Show Reply"} ({reply.length})
                  </div>
                </button>
                <button
                  role="delete"
                  className="delete"
                  onClick={deleteComment}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {isOpen && <Reply onAdd={addReply} />}
      {reply?.map(({ id, name, comment }) => {
        return (
          <>
            {replyBox && (
              <div className="reply-section">
                <div className="comment-boxes" key={id}>
                  <div className="review">
                    <div className="top-area">
                      <div className="name"> {name}</div>
                    </div>
                    {/* {isToggle && ( */}
                    <div>
                      <div className="comment">{parse(`${comment}`)}</div>
                      <div className="buttons">
                        <button className="delete" onClick={deleteReply}>
                          <AiFillDelete />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        );
      })}
    </>
  );
};

export default CommentCard;
