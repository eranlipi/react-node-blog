import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import articles from './article-content'
import NotFoundPage from "./NotFoundPage";
import axios from 'axios';
import CommentsList from '../components/comentsList'
import addCommentForm from '../components/addCommentFrom'
import useUser from "../hooks/useUser";

const  ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({upvotes:0 , comments:[] , canUpvote: false});
  const { articleId } = useParams();
  const {canUpvote} = articleInfo;
  const {user , isLoading} = useUser();

  useEffect(()=>{
    const loadArticleInfo = async () =>{
      const token = user && await user.getIdToken();
      const headers = token ? {authtoken: token} : {};
      const respone = await axios.get(`/api/articles/${headers}`,{
        headers:{authtoken:token}
      });
      const newArticleInfo =respone.data;
      setArticleInfo(newArticleInfo)
    }
    if(isLoading){
      loadArticleInfo();
    }

  }, [isLoading , user])

  const article = articles.find(article => article.name === articleId);

  const addUpvote = async () => {
    const token = user && await user.getIdToken();
    const headers = token ? {authtoken: token} : {};
    const response = await axios.put(`/api/articles/${articleId}/upvote`,null,{ headers });
    const updatedArticle = response.data;
    setArticleInfo(articleInfo);
  }

  if(!article){
    return  <NotFoundPage />
  }

  return (
    <>
      <h1>Article Page {article.title}</h1>
      <div className="upvotes-section">
        {user 
        ? <button onClick={addUpvote}>{canUpvote ? 'upvote' : 'alredy upvoted'}</button>
        : <button>Log In to upvote</button>
        
      }
        <p>this article has {articleInfo.upvotes} upvotes </p>
      </div>
      <p>
        {article.content.map((paragraph, i)=> (
          <p key={i}>{paragraph}</p>
          ))}
      </p>
      {user 
        ? <addCommentForm articleName={articleId} onArticleUpdated= {updatedArticle => articleInfo(updatedArticle)} />
        : <button>Log In to comment</button>
        }
      <CommentsList comments={articleInfo.comments} />
    </>

  );
}


export default ArticlePage;