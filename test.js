mongodb://heroku_6stlf8db:9nbq506svedvuspaac3ov63hll@ds113785.mlab.com:13785/heroku_6stlf8db

{
  "development": {
    "database": "projectOne",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "database": "projectOne",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "HEROKU_POSTGRESQL_ROSE_URL"
  }
}
