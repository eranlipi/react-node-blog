import axios from "axios";
import { useState } from "react";
import useUser from "../hooks/useUser";

  const addCommentForm = ({articleName , onArticleUpdated}) => {
  const [name , setName] = useState('');
  const [commebtText , setCommentText]= useState('');
  const { user } = userUser;

  const addComment = async () => {
    const token = user && await user.getIdToken();
    const headers = token ? {authtoken: token} : {};
    const respone = await axios.post(`/api/articles/${articleName}/comments`, {
      postedBy: name,
      text: commebtText,
    },{headers,});

    const updatedArticle = response.data;
    onArticleUpdated(updatedArticle);
    setName('');
    setCommentText('');
  }

return (
  <div id="add-comment-form">
    <h3>Add A coment</h3>
    { user && <p>you are posting as {user.email}</p>}
    <label>
      <textarea 
        rows="4" 
        cols="50"
        value={commebtText}
        onChange={e => setCommentText(e.target.value)}
      ></textarea>
    </label>
    <button onClick={addComment}></button>
  </div>
)
}

export default addCommentForm;