import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, Route } from "react-router-dom";
import Discussion from "..";
import CommentCard from "../commentCard";
import Editor from "../editor";
import axios from "axios";
import DiscussionForm from "../index";
import userEvent from "@testing-library/user-event";
// jest.useFakeTimers();
// jest.spyOn(console, "error").mockImplementation(() => {});
jest.mock("axios");
// jest.fn();

const MockComment = () => {
  return (
    <BrowserRouter>
      <Discussion />
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

describe("Comments", () => {
  test("Renders correctly", () => {
    render(<MockComment />);
    const textElement = screen.getByText("Comments");
    expect(textElement).toBeInTheDocument();
  });
});

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
    expect(buttonList).toHaveLength(4);
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
  test("Should be able to reset the comment", async () => {
    const { getByTestId } = render(<MockDiscussion />);
    const commentButton = getByTestId("reset-comment");
    const name = screen.getByPlaceholderText("Your name");
    const comment = screen.getByTestId("comment-test");
    userEvent.click(commentButton);
    expect(name.value).toMatch("");
    expect(comment.value).toMatch("");
  });
});
