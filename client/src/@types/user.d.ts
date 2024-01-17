type TUserCredentials = {
  login: string;
  password: string;
};

type TUserRegisterCredentials = TUserCredentials & {
  confirmedPassword;
};
