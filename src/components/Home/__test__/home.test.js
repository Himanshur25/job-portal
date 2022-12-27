import { render , screen , cleanup } from '@testing-library/react'
import Home from '..';
import { BrowserRouter, Route } from "react-router-dom";

const MockHome = ()=> {
    return <BrowserRouter>
       <Home />
     </BrowserRouter>;
}
test('should render Heading in home component',()=>{
     render(
     <MockHome />
     );
    const heading = screen.getByRole("heading",{level:3})
    expect(heading).toBeInTheDocument()
})

test('should render button in Home component',()=>{
render(<MockHome/>);
const button = screen.getByTestId("btn")
expect(button).toBeInTheDocument()
})
test("should render social media images", () => {
  render(<MockHome />);
  const images = screen.getByTestId("images");
  expect(images).toBeInTheDocument();
});