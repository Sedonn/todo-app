import { FormEvent, useContext } from 'react';
import { Form, Header, Segment } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { UserStoreContext } from '@/App';
import { loginUser } from '@/API/user';
import GenericFormData from '@/helpers/GenericFormData';

const Login = () => {
  const userStore = useContext(UserStoreContext);
  const navigate = useNavigate();

  const onSubmit = async ({ target }: FormEvent<HTMLFormElement>) => {
    try {
      const { login, password } = new GenericFormData<TUserCredentials>(
        target as HTMLFormElement,
      ).toObject();

      const token = await loginUser(login, password);

      new FormData();

      userStore.save(token, login);

      navigate('/todo');
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error ?? 'Ошибка авторизации');
    }
  };

  return (
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
        Нет аккаунта -{' '}
        <Link to="/register">
          <b>зарегистрироваться</b>
        </Link>
      </p>
    </Segment>
  );
};

export default Login;
