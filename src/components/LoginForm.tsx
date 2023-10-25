import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  login: (value:boolean)=> void;
}
const LoginForm: React.FC<Props> = ({ login }) => {
  const navigate = useNavigate();
  const [userName, setUsername] = useState<string>("");
  const [passWord, setPassword] = useState<string>("");
  const [error, setError] = useState<string>('');
  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://technical-task-api.icapgroupgmbh.com/api/login/', {
        username: userName,
        password: passWord
      });

      if (response.status === 200) {
        login(true);
        navigate("/table");
        setPassword('');
        setUsername('');

      } else {
      setError('Wrong login')
      }
    } catch (error) {
      setError('Wrong login')
      console.log('error') 
    }
  };
 
  

  // const validateForm = () => {
  //   if (!username || !password) {
  //     alert("Please fill in all fields");
  //     return false;
  //   }
  //   return true;
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (validateForm()) {
  //     navigate("/main");
  //   }
  // };

  return (
    <section className="section section-login">
      <div className="container">
        <h2 className="title">Login</h2>
        <div className="login-form is-flex is-justify-content-center">
          <form onSubmit={handleLogin}>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  value={passWord}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-primary" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
          {error.length > 0 && <p>Wrong login or password</p>}
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
