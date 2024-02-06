import { FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { WithTranslation, withTranslation } from 'react-i18next';

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
import ChangeLanguageButton from '@/components/ChangeLanguageButton.tsx';

import { registerUser } from '@/API/userAPI';
import GenericFormData from '@/helpers/GenericFormData';
import { showErrorMessage } from '@/helpers/error';

const Register = ({ t }: WithTranslation<'common' | 'validation'>) => {
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
        return toast.error(t('rules.passwordsMismatch'));
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
          {t('registerCompleteDialog.title')}
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
            <Header> {t('registerCompleteDialog.subtitle')}</Header>
            <p>{t('registerCompleteDialog.description')}</p>
          </Container>
        </ModalContent>
      </ControllableDialog>

      <Segment className="!mt-40 w-96 h-fit">
        <div className="flex items-center justify-between">
          <Header className="!m-0" as="h2">
            {t('registerPage.title')}
          </Header>
          <ChangeLanguageButton />
        </div>
        <Form onSubmit={onSubmit}>
          <Form.Input
            name="login"
            label={t('registerPage.form.loginLabel')}
            required
          />
          <Form.Input
            type="password"
            name="password"
            label={t('registerPage.form.passwordLabel')}
            required
          />
          <Form.Input
            type="password"
            name="confirmedPassword"
            label={t('registerPage.form.confirmPasswordLabel')}
            required
          />
          <Form.Button fluid color="green" className="flex justify-center">
            {t('registerPage.form.submitButtonLabel')}
          </Form.Button>
        </Form>
      </Segment>
    </>
  );
};

export default withTranslation(['common', 'validation'])(Register);
