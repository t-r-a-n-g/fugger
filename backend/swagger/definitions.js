module.exports = {
  ErrorInternal: {
    $errors: {
      $server: "err-internal",
    },
  },

  ErrorNoToken: {
    $errors: {
      $auth: "err-auth-no-token",
    },
  },

  ErrorInvalidUser: {
    $errors: {
      $auth: "err-auth-invalid-user",
    },
  },

  ErrorForbidden: {
    $errors: {
      $auth: "err-auth-forbidden",
    },
  },

  ErrorNotFound: {
    $errors: {
      $resource: "err-not-found",
    },
  },
};
