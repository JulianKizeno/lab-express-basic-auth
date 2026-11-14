Set SESSION_SECRET to a unique random value of at least 32 characters before starting. Production requires HTTPS for Secure cookies. Configure trust proxy only for your trusted reverse proxy. Use a persistent session store for multi-process production deployments.

Integration: run `node test/integration.js` with a local MongoDB server on 127.0.0.1:27017 (for the basic auth lab, run from starter-code). Tests create and delete their own temporary database; mail delivery is stubbed.

MONGODB_URI overrides the normal connection URI. The upgraded runtime dependencies were validated on Node.js 24. Dart Sass compiles local styles at startup; restart the dev server after changing SCSS.
