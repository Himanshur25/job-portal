import './App.css';
import Home from './components/Home';
import Jobs from './components/Jobs';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostJob from './components/PostJob';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Jobs" element={<Jobs />} />
            <Route path="/Postjob" element={<PostJob />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
