import { FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  Container,
  Form,
  Header,
  Icon,
  ModalContent,
  ModalHeader,
  Segment,
} from 'semantic-ui-react';

import ControllableDialog, {
  ControllableDialogRefAttributes,
} from '@/components/ControllableDialog';

import { registerUser } from '@/API/userAPI';
import GenericFormData from '@/helpers/GenericFormData';
import { showErrorMessage } from '@/helpers/error';

const Register = () => {
  const navigate = useNavigate();

  const dialogRef = useRef<ControllableDialogRefAttributes>(null);

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
      dialogRef.current?.open();
    } catch (error) {
      showErrorMessage(error);
    }
  };

  const onClose = () => {
    dialogRef.current?.close();
    navigate('/');
  };

  return (
    <>
      <ControllableDialog ref={dialogRef} onClose={onClose}>
        <ModalHeader className="!flex items-center justify-between">
          Регистрация завершена!
          <Icon
            className="cursor-pointer"
            name="close"
            color="black"
            size="large"
            onClick={onClose}
          />
        </ModalHeader>
        <ModalContent className="!flex items-center">
          <Icon name="check" color="green" size="massive" />
          <Container text>
            <Header>Аккаунт успешно создан!</Header>
            <p>
              После закрытия этого окна вы будете автоматически перенаправлены
              на страницу авторизации.
            </p>
          </Container>
        </ModalContent>
      </ControllableDialog>

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
    </>
  );
};

export default Register;
