module.exports = app => {
  const { router, controller } = app;
  router.get('/api/user/authorize',controller.login.getSessionId)
  router.get('/api/user/sessionkey',controller.login.getSessionKey)
}