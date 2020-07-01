const locators = {
  SIGNIN: {
    EMAIL: '[data-cy=email]',
    PASSWORD: '[data-cy=password]',
    BTN_LOGIN: '[data-cy=btn-entrar]',
    BTN_FORGOT_PASSWORD: '[data-cy=link-to-forget-password]',
    BTN_CREATE_ACCOUNT: '[data-cy=link-to-signup]',
  },
  SIGNUP: {
    NAME: '[data-cy=name]',
    EMAIL: '[data-cy=email]',
    PASSWORD: '[data-cy=password]',
    BTN_CREATE: '[data-cy=btn-cadastrar]',
    BTN_RETURN_FROM_HOME: '[data-cy=link-to-home]',
  },
  TOAST: {
    TOAST_CONTAINER: '[data-cy=toast-container]',
    FN_TOAST_MSG: title => `[data-cy=${title}]`,
    CLOSE_TOAST_CONTAINER: '[data-cy=remove-toast-container]',
  },
  DASHBOARD: {
    LOGO: '[data-cy=logo-gobarber]',
  },
}

export default locators
