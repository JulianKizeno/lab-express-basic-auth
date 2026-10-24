const test = require('node:test');
const assert = require('node:assert/strict');
const { load, response, router } = require('./helpers.cjs');
test('only the password matching the stored hash authenticates', async () => {
  const routes = router();
  load('routes/auth.routes.js', {
    express: { Router: () => routes }, '../models/user-model': { findOne: () => Promise.resolve({ password: 'stored-hash' }) },
    bcrypt: { compareSync(password, hash) { assert.equal(hash, 'stored-hash'); return password === 'correct'; } }
  });
  const login = routes.routes.find(route => route.method === 'post' && route.args[0] === '/login');
  for (const password of ['correct', 'wrong']) {
    const req = { body: { user: 'alice', password }, session: { regenerate(callback) { callback(); }, save(callback) { callback(); } } }; const res = response(); res.redirect = () => {}; res.render = () => {};
    login.args[1](req, res, error => { throw error; }); await new Promise(resolve => setImmediate(resolve));
    assert.equal(Boolean(req.session.currentUser), password === 'correct');
  }
});
