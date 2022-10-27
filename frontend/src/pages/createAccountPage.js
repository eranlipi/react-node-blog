import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { getAuth , createUserWithEmailAndPassword } from "firebase/auth";

const CreateAccountPage = () => {
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [confirmPassword, setConfirmPassword]= useState('');
  const [error, setError]= useState('');

  const navigate = useNavigate();

const CreateAccount = async () => {
  try {
    if (password !== confirmPassword ){
      setError('Password and confirm password do not match');
      return;
    }
    await createUserWithEmailAndPassword(getAuth() ,email , password );
    navigate('/article');
  } catch(e){
    setError(e.message);
  }
}

  return(
    <>
    <h1>Creact account</h1>
    <div>
      {error && <p className="error">{error}</p>}
      <input 
        placeholder="your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input 
        placeholder="your password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
      />
      <input 
        placeholder="re enter your password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        type="password"
      />
      <button onClick={CreateAccount}>Log In</button>
      <Link to="/login">do you have an account? Log in</Link>
    </div>
    </>
  );
}



export default CreateAccountPage;