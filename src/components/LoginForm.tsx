import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField, Card, CardContent, Typography, Container, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

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
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
      toast.error(`Wrong login or password. Please try again`, {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <Container maxWidth="xs" sx={{ marginTop: 8 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            Login page
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Username"
              placeholder="Username"
              {...register("username", { required: true })}
              error={!!errors.username}
              helperText={errors.username ? "This field is required" : ""}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...register("password", { required: true })}
              error={!!errors.password}
              helperText={errors.password ? "This field is required" : ""}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button fullWidth variant="contained" type="submit" sx={{ marginTop: 2 }}>
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginForm;
