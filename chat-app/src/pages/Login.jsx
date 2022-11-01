import Button from '../components/Button'
import { useNavigate } from "react-router-dom";
import InputField from '../components/InputField'
import '../styles.css'

export const Login = () => {
  let navigate = useNavigate();
  const toMain = () => {
    let path = `/home`;
    navigate(path);
  }
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">I T U  C H A T</span>
        <h2 className="title">Login</h2>
        <form action="">
          <InputField className='inputEmail' id='email' label='e-mail' placeholder='example@itu.dk' type='email'></InputField>
          <InputField className='inputPassword' id='password' label='password' placeholder='Enter a password' type='password'></InputField>
          <Button className="primaryBtn" text='Login' onClick={toMain}></Button>
        </form>
        <span className="loginLink">Don't have an account yet? <a href="/Register">Create an account</a></span>
      </div>
    </div>
  )
}
export default Login;