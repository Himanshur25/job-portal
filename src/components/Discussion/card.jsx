import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineReply } from "react-icons/md";
import parse from "html-react-parser";
import Reply from "./reply";
import sanityClient from "../../client";
import imageUrlBuilder from "@sanity/image-url";

const Card = ({ value, onDelete }) => {
  const { id, name, comment, rating, image, imageUrl } = value;
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [reply, setReply] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [isToggle, setIsToggle] = useState(true);
  const [replyBox, setReplyBox] = useState(false);

  // console.log(value);

  function addReply(name, comment) {
    setReply([...reply, { name, comment }]);
    setIsOpen(!isOpen);
    setCount(count + 1);
  }

  const onDeleteReply = (index) => {
    let deleteList = [...reply];
    deleteList.splice(index, 1);
    setReply(deleteList);
    setCount(count - 1);
  };

  const builder = imageUrlBuilder(sanityClient);

  function urlFor(source) {
    return builder.image(source);
  }

  return (
    <>
      <div className="comment-boxes" key={value.id}>
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
                {parse(value.content)}
              </div>
              <img
                src={`${value.content}`}
                className={`${
                  image ? "image-text-editor" : "images-text-editor"
                }`}
                style={{ width: "150px" }}
              />

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
                    {replyBox ? "Hide Reply" : "Show Reply"} ({count})
                  </div>
                </button>
                <button className="delete" onClick={onDelete}>
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
                      {/* <div
                        className="add-icon"
                        onClick={() => setIsToggle(!isToggle)}
                      >
                        {isToggle ? "-" : "+"}
                      </div> */}
                    </div>
                    {isToggle && (
                      <div>
                        <div className="comment">{parse(`${comment}`)}</div>
                        <div className="buttons">
                          {/* <button
                            type="button"
                            className="reply"
                            onClick={() => setIsOpen(!isOpen)}
                          >
                            <MdOutlineReply />
                          </button> */}
                          {/* <button className="edit-button" onClick={onEdit}>
                  Edit
                </button> */}
                          <button className="delete" onClick={onDeleteReply}>
                            <AiFillDelete />
                          </button>
                        </div>
                      </div>
                    )}
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

export default Card;
