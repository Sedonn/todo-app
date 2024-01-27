import { Form, Header, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FormEvent } from 'react';

import { registerUser } from '@/API/userAPI';
import GenericFormData from '@/helpers/GenericFormData';
import { showErrorMessage } from '@/helpers/error';

const Register = () => {
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { login, password, confirmedPassword } =
        new GenericFormData<TUserRegisterCredentials>(
          event.target as HTMLFormElement,
        ).toObject();

      if (password !== confirmedPassword) {
        return toast.error('Пароли не совпадают');
      }

      await registerUser({ login, password });

      navigate('/');
    } catch (error) {
      showErrorMessage(error);
    }
  };

  return (
    <Segment className="!mt-40 w-96 h-fit">
      <Header as="h2">Регистрация</Header>
      <Form onSubmit={onSubmit}>
        <Form.Input name="login" label="Логин" required />
        <Form.Input type="password" name="password" label="Пароль" required />
        <Form.Input
          type="password"
          name="confirmedPassword"
          label="Подтвердите пароль"
          required
        />
        <Form.Button fluid color="green" className="flex justify-center">
          Зарегистрироваться
        </Form.Button>
      </Form>
    </Segment>
  );
};

export default Register;
