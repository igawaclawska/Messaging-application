import Button from '../components/Button'
import '../styles.css'

export const Login = () => {
  return (
    <div className="formCotainer">
        <div className="formWrapper">
            <span className="logo">I T U  C H A T</span>
            <h2 className="title">Login</h2>
            <form action="">
                <label htmlFor="email" className=""> E-mail</label>
                <input type="email" className="inputEmail" placeholder="example@itu.dk"></input>
                <label> Password</label>
                <input type="password" className="inputPassword" placeholder="Enter a password"></input>                      
                <Button className="primaryBtn" text='Login'></Button>
            </form>
            <span className="loginLink">Don't have an account yet? <a href="#">Create an account</a></span>
        </div>
    </div>
  )
}
export default Login;