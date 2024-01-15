import { Form, Header, Segment } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";

import SiteLayout from "../../layouts/SiteLayout";
import { loginUser } from "../../API/user";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  const onSubmit = async ({ target }) => {
    try {
      const formData = new FormData(target);
      const token = await loginUser(
        formData.get("login"),
        formData.get("password")
      );

      localStorage.setItem("token", token);

      navigate("/todo");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error ?? "Ошибка авторизации");
    }
  };

  return (
    <SiteLayout>
      <Segment className="!mt-40 w-96">
        <Header as="h2">Вход</Header>
        <Form onSubmit={onSubmit}>
          <Form.Input name="login" label="Логин" required />
          <Form.Input name="password" label="Пароль" type="password" required />
          <Form.Button fluid color="blue">
            Войти
          </Form.Button>
        </Form>
        <p className="mt-2 text-center">
          Нет аккаунта -{" "}
          <Link to="/register">
            <b>зарегистрироваться</b>
          </Link>
        </p>
      </Segment>
    </SiteLayout>
  );
};

export default Login;
