import { Form, Header, Segment } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import SiteLayout from "../../layouts/SiteLayout";
import { toast } from "react-toastify";
import { registerUser } from "../../API/user";

const Register = () => {
  const navigate = useNavigate();

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  const onSubmit = async ({ target }) => {
    try {
      const formData = new FormData(target);

      if (formData.get("password") !== formData.get("cpassword")) {
        return toast.error("Пароли не сопадают");
      }

      await registerUser(formData.get("login"), formData.get("password"));

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error ?? "Ошибка авторизации");
    }
  };

  return (
    <SiteLayout>
      <Segment className="!mt-40 w-96">
        <Header as="h2">Регистрация</Header>
        <Form onSubmit={onSubmit}>
          <Form.Input name="login" label="Логин" required />
          <Form.Input type="password" name="password" label="Пароль" required />
          <Form.Input
            type="password"
            name="cpassword"
            label="Подтвердите пароль"
            required
          />
          <Form.Button fluid color="green" className="flex justify-center">
            Зарегистрироваться
          </Form.Button>
        </Form>
      </Segment>
    </SiteLayout>
  );
};

export default Register;
