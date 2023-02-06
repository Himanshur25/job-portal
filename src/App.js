import './App.css';
import Home from './components/Home';
import Jobs from './components/Jobs';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostJob from './components/PostJob';
import SaveJobs from './components/SaveJobs';
import Discussion from './components/Discussion';
import ErrorPage from './components/ErrorPage';
import ApplyJobs from './components/ApplyJobs';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/apply-jobs" element={<ApplyJobs />} />
            <Route path="/saved-job" element={<SaveJobs />} />
            <Route path="/discussion" element={<Discussion />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
