import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CommentCard from "../commentCard";
import Editor from "../editor";
import DiscussionForm from "../index";
import userEvent from "@testing-library/user-event";

jest.spyOn(window, "alert").mockImplementation(() => {});

const MockComment = ({ deleteComment }) => {
  const commentValue = {
    _id: "syPd8qVyCPoQD7dljzzFdA",
    name: "Himanshu",
    rating: "0",
    content: "https://www.w3schools.com/css/img_lights.jpg\nHello",
  };
  return (
    <BrowserRouter>
      <CommentCard value={commentValue} deleteComment={deleteComment} />
    </BrowserRouter>
  );
};
const MockDiscussion = () => {
  return (
    <BrowserRouter>
      <DiscussionForm />
    </BrowserRouter>
  );
};

describe("Test the CommentCard component", () => {
  test("Should render CommentCard correctly", () => {
    render(<MockComment />);
    const name = screen.getByTestId("names");
    const comment = screen.getByTestId("comments");
    const rating = screen.getByTestId("ratings");
    expect(name).toBeInTheDocument();
    expect(comment).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
  });
  test("Toggle button should work properly", () => {
    const { getByTestId } = render(<MockComment />);
    const toggleButton = getByTestId("toggle-btn");
    const comment = getByTestId("comments");
    expect(toggleButton).toHaveTextContent("-");
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent("+");
    expect(comment).not.toBeVisible();
  });
  test("Delete button should be called one time", () => {
    const deleteComment = jest.fn();
    const { queryByRole } = render(
      <MockComment deleteComment={deleteComment} />
    );
    const deleteButton = queryByRole("delete");
    fireEvent.click(deleteButton);
    expect(deleteComment).toHaveBeenCalledTimes(1);
  });
});

describe("Test the Editor Component", () => {
  test("Should check that the editor component has 4 Text style buttons", () => {
    render(<Editor />);
    const buttonList = screen.getAllByRole("button");
    expect(buttonList).toHaveLength(4);
  });
  test("upload image file only", () => {
    const file = new File(["accenture"], "accenture.jpeg", {
      type: "image/jpeg",
    });
    render(<Editor />);
    const input = screen.getByTestId("image-upload");
    userEvent.upload(input, file);

    expect(input.files[0]).toStrictEqual(file);
    expect(input.files.item(0)).toStrictEqual(file);
    expect(input.files).toHaveLength(1);
  });
});
describe("Should be able to render the Discusssion Page", () => {
  test("Should be able to reset the comment", () => {
    const { getByTestId } = render(<MockDiscussion />);
    const commentButton = getByTestId("reset-comment");
    const name = screen.getByPlaceholderText("Your name");
    const comment = screen.getByTestId("comment-section-test");
    userEvent.click(commentButton);
    expect(name.value).toMatch("");
    expect(comment).toHaveTextContent("");
  });
  test("Image should be previewed after entering url", async () => {
    render(<MockDiscussion />);
    const commentSection = screen.getByTestId("comment-section-test");
    commentSection.textContent =
      "https://letsenhance.io/static/b8eda2f8914d307d52f725199fb0c5e6/62e7b/MainBefore.jpg";
    const imagePreview = await screen.findByTestId("image-preview");
    expect(imagePreview).toBeVisible();
  });
});
