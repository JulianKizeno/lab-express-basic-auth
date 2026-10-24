const test = require('node:test');
const assert = require('node:assert/strict');
const { load, response, router } = require('./helpers.cjs');
const routes = router();
const noop = () => {};
load("routes/auth.routes.js", {
  express: { Router: () => routes },
  passport: { authenticate: () => noop },
  bcrypt: {}, '../models/user.model': {}, '../models/user-model': {}, '../models/User.model': {},
  '../configs/nodemailer.config': {}, 'connect-ensure-login': { ensureLoggedIn: () => noop, ensureLoggedOut: () => noop }
});
const guard = routes.routes.find(route => route.method === 'use' && Array.isArray(route.args[0])).args[1];
test('structured usernames and passwords are rejected before database/authentication', () => {
  for (const body of [
    { user: { $ne: null }, password: 'correct' },
    { user: ['alice'], password: 'correct' },
    { user: 'alice', password: { $gt: '' } },
    { user: 'alice', password: 'é'.repeat(37) },
    { user: 'a'.repeat(129), password: 'correct' }, null
  ]) {
    const res = response(); let continued = false;
    guard({ method: 'POST', body }, res, () => { continued = true; });
    assert.equal(res.code, 400); assert.equal(continued, false);
  }
});
test('valid credentials and form-page GET requests continue', () => {
  for (const req of [{ method: 'POST', body: { user: 'alice', password: 'correct' } }, { method: 'GET' }]) {
    let continued = false; guard(req, response(), () => { continued = true; }); assert.equal(continued, true);
  }
});
