import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CommentCard from "../commentCard";
import Editor from "../editor";
import DiscussionForm from "../index";
import userEvent from "@testing-library/user-event";

jest.spyOn(window, "alert").mockImplementation(() => {});

const MockComment = () => {
  return (
    <BrowserRouter>
      <CommentCard />
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
  test("Delete button should be called one time", () => {
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
});

describe("Test the Editor Component", () => {
  test("Should check that the editor component has 4 buttons", async () => {
    render(<Editor />);
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(4);
  });
  test("Image input should accept image only", () => {
    render(<Editor />);
    const image = screen.getByTestId("image-upload");
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
    const input = screen.getByTestId("image-upload");
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
});

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
});
