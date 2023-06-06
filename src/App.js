import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';
import ArticlesListPage from './pages/ArticlesListPage';
import NavBar from './NavBar';
import NotFoundPage from './pages/NoteFoundPage';
import LoginPage from './pages/LoginPage';
import CreateAccoutnPage from './pages/CreateAccountPage';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <NavBar/>
      <div class="grid gap-4 grid-col3" id="page-body">
        <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/about" element={ <AboutPage/>}/>
        <Route path="/articles" element={<ArticlesListPage/>}/>
        <Route path="/articles/:articleId" element={<ArticlePage/>}/>
        <Route path="/create-account" element={<CreateAccoutnPage/>}/>
        <Route path="/log-in" element={<LoginPage/>}/>
        <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}
export default App;