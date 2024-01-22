import { FormEvent, useContext } from 'react';
import { Form, Header, Segment } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';

import { UserStoreContext } from '@/App';
import { showErrorMessage } from '@/helpers/error';
import { loginUser } from '@/API/userAPI';
import GenericFormData from '@/helpers/GenericFormData';

const Login = () => {
  const userStore = useContext(UserStoreContext);
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const userCredentials = new GenericFormData<TUserCredentials>(
        event.target as HTMLFormElement,
      ).toObject();

      const token = await loginUser(userCredentials);

      userStore.save(token, userCredentials.login);

      navigate('/task');
    } catch (error) {
      showErrorMessage(error);
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
