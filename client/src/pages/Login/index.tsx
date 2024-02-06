import { FormEvent, useContext } from 'react';
import { Form, Header, Segment } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import { WithTranslation, withTranslation } from 'react-i18next';

import ChangeLanguageButton from '@/components/ChangeLanguageButton.tsx';

import { UserStoreContext } from '@/App';
import { showErrorMessage } from '@/helpers/error';
import { loginUser } from '@/API/userAPI';
import GenericFormData from '@/helpers/GenericFormData';

const Login = ({ t }: WithTranslation<'common'>) => {
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
    <Segment className="!mt-40 w-96 h-fit">
      <div className="flex items-center justify-between">
        <Header className="!m-0" as="h2">
          {t('loginPage.title')}
        </Header>
        <ChangeLanguageButton />
      </div>
      <Form onSubmit={onSubmit}>
        <Form.Input
          name="login"
          label={t('loginPage.form.loginLabel')}
          required
        />
        <Form.Input
          name="password"
          label={t('loginPage.form.passwordLabel')}
          type="password"
          required
        />
        <Form.Button fluid color="blue">
          {t('loginPage.form.submitButtonLabel')}
        </Form.Button>
      </Form>
      <p className="mt-2 text-center">
        {t('loginPage.registerMessage.text')} -{' '}
        <Link to="/register">
          <b>{t('loginPage.registerMessage.link')}</b>
        </Link>
      </p>
    </Segment>
  );
};

export default withTranslation('common')(Login);
