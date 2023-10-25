import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormData = {
  username: string;
  password: string;
};

type Props = {
  login: (value: boolean) => void;
};

const LoginForm: React.FC<Props> = ({ login }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();


  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        "https://technical-task-api.icapgroupgmbh.com/api/login/",
        {
          username: data.username,
          password: data.password,
        }
      );

      if (response.status === 200) {
        login(true);
        navigate("/table");
      }
    } catch (error) {
      toast.error(`Wrong login or password. Please try again`,{
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <section className="section section-login">
      <div className="container ">
        <h2 className="title">Login page</h2>
        <div className="login-form is-flex is-justify-content-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Username"
                  {...register("username", { required: true })}
                />
                {errors.username && <p style={{ color: "red" }}>This field is required</p>}
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                {errors.password && <p style={{ color: "red" }}>This field is required</p>}
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
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
