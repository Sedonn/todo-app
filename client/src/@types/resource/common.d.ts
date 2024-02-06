/** Define the strict config for all common namespace language files. */
type TCommonResource = {
  loginPage: {
    title: string;
    form: {
      loginLabel: string;
      passwordLabel: string;
      submitButtonLabel: string;
    };
    registerMessage: {
      text: string;
      link: string;
    };
  };

  registerPage: {
    title: string;
    form: {
      loginLabel: string;
      passwordLabel: string;
      confirmPasswordLabel: string;
      submitButtonLabel: string;
    };
  };
  registerCompleteDialog: {
    title: string;
    subtitle: string;
    description: string;
  };

  taskPage: {
    title: string;
    menu: {
      sort: {
        createDate: string;
        completeDate: string;
      };
      filter: {
        onlyCompleted: string;
        onlyUncompleted: string;
      };
    };
    taskList: {
      empty: string;
      card: {
        completed: string;
      };
    };
  };
  taskEditDialog: {
    title: {
      create: string;
      update: string;
    };
    form: {
      submitButtonLabel: string;
    };
    snackbar: {
      taskCreated: string;
      taskUpdated: string;
    };
  };
};
