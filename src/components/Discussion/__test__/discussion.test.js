import { render, screen } from "@testing-library/react";
import { BrowserRouter, Route } from "react-router-dom";
import Discussion from '..'

const request = require("supertest");
// const discussion=require("..")


const MockComment = () => {
  return (
    <BrowserRouter>
      <Discussion />
    </BrowserRouter>
  );
};


describe("Comments",()=>{
    test("Renders correctly",()=>{
        render (<MockComment />);
        const textElement=screen.getByText("Comments");
        expect(textElement).toBeInTheDocument();
    })
})
// describe("Testing that fetching of all users data is working properly", () => {
//   it("tests /api/comments endpoints", async () => {
//     const response = await request().get(
//       "https://kh2kvctg.api.sanity.io/v2021-06-07/data/export/production?types=Comment"
//     );
//     expect(response.statusCode).toBe(200);
//     expect(typeof response.body == "object").toBe(true);
//     expect(response.body.data).toEqual(
//       expect.arrayContaining([expect.any(Object)])
//     );
//     // expect(response.body.data[0]).toEqual({
//     //   id: 2,
//     //   firstname: "Manoj",
//     //   lastname: "Shukla",
//     //   contact: "9898989898",
//     //   email: "manoj@gmail.com",
//     //   password: "$2b$10$0tVE1xA7gp55rKZNC.131u.ryva2O1SaQ04Y043TGOeurBzkrm5/S",
//     //   isadmin: 1,
//     // });
//   });
// });