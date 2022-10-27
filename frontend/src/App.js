import {Routes , Route , BrowserRouter } from 'react-router-dom';
import NavBar from './navBar';
import HomePage from './pages/HomePage';
import ArticleListPage from './pages/ArticlesListPage';
import ArticlePage from './pages/ArticlePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/loginPage';
import CreateAccountPage from './pages/createAccountPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <NavBar />
          <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/articles" element={<ArticleListPage/>} />
              <Route path="/articles/:articleId" element={<ArticlePage />} />
              <Route path="/about" element={<AboutPage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/create-account" element={<CreateAccountPage/>}/>
              <Route path="*" element={<NotFoundPage/>}/>
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
