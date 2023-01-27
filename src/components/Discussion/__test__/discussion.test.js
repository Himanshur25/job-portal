import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, Route } from "react-router-dom";
import CommentCard from "../commentCard";
import Editor from "../editor";
import axios from "axios";
import DiscussionForm from "../index";
import userEvent from "@testing-library/user-event";
jest.spyOn(window, "alert").mockImplementation(() => {});
const MockComment = () => {
  const commentValue = {
    id: "syPd8qVyCPoQD7dljzzFdA",
    name: "Himanshu",
    rating: "0",
    content: "Hello",
  };
  return (
    <BrowserRouter>
      <CommentCard value={commentValue} />
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

describe("<CommentCard>", () => {
  const deleteComment = jest.fn();
  const value = {
    id: "syPd8qVyCPoQD7dljzzFdA",
    name: "Himanshu",
    rating: "0",
    content: "https://www.w3schools.com/css/img_lights.jpg\nHello",
  };
  const { queryByRole } = render(
    <CommentCard value={value} deleteComment={deleteComment} />
  );
  const button = queryByRole("delete");
  fireEvent.click(button);
  expect(deleteComment).toHaveBeenCalledTimes(1);
});

describe("Test the Editor Component", () => {
  test("render the editor with 4 buttons", async () => {
    render(<Editor />);
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(6);
  });
  test("Image input should accept image only", () => {
    render(<Editor />);
    const image = screen.getByTestId("images-only");
    userEvent.type(image, "https://www.w3schools.co");
    expect(image.value).not.toMatch(
      "https://www.w3schools.com/css/img_lights.jpg"
    );
  });
  test("upload image file only", () => {
    const file = new File(["accenture"], "accenture.jpeg", {
      type: "image/jpeg",
    });
    render(<Editor />);
    const input = screen.getByTestId("images-only");
    userEvent.upload(input, file);

    expect(input.files[0]).toStrictEqual(file);
    expect(input.files.item(0)).toStrictEqual(file);
    expect(input.files).toHaveLength(1);
  });
});
describe("Should be able to render the Discusssion PAge", () => {
  test("Should be able to reset the comment", () => {
    const { getByTestId } = render(<MockDiscussion />);
    const commentButton = getByTestId("reset-comment");
    const name = screen.getByPlaceholderText("Your name");
    userEvent.click(commentButton);
    expect(name.value).toMatch("");
  });
  // test("Should be able to show the image", async () => {
  //   render(<MockDiscussion />);
  //   const commentInput = screen.getByTestId("comment-test");
  //   await userEvent.type(
  //     commentInput,
  //     "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
  //   );
  //   const image = screen.getByTestId("image-preview");
  //   expect(image).toBeVisible();
  // });
});

describe("Should render toggle button", () => {
  test("Toggle button should work properly", () => {
    const value = {
      id: "syPd8qVyCPoQD7dljzzFdA",
      name: "Himanshu",
      rating: "3",
      content: "Hello",
    };
    const { getByTestId } = render(<CommentCard value={value} />);
    const toggleButton = getByTestId("toggle-btn");
    const comment = getByTestId("comment-only");
    expect(toggleButton).toHaveTextContent("-");
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent("+");
    expect(comment).not.toBeVisible();
  });
});

describe("Should render CommentCard Component", () => {
  test("Should render CommentCard correctly", () => {
    render(<MockComment />);
    const name = screen.getByTestId("name-only");
    const comment = screen.getByTestId("comment-only");
    const rating = screen.getByTestId("only-rating");
    expect(name).toBeInTheDocument();
    expect(comment).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
  });
});
