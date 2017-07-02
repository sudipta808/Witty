export const Settings = {
  "ACCESS_TOKEN": "",
  "APP_NAME": "Witty App",
  "CLIENT_SECRECT": "com.home.wittyapp",
  "DEBUG": true,
  "CACHE_EXPIRY_IN_MILLISECONDS": 30 * 60 * 1000,
  "API_CONNECTION_TIMEOUT": 15 * 1000,
  "REQUEST_METHODS": {
    0: 'GET',
    1: 'POST',
    2: 'PUT',
    3: 'DELETE',
    4: 'HEAD'
  },
  "SERVER": {
    "ENVIRONMENTS": {
      0: "development",
      1: "release",
      2: "staging",
      3: "production"
    },
    "DEFAULT_ENVIRONMENT": 'release'
  },
  "LOCAL": {
    "PATH": "assets/stub",
    "FORMAT": "json",
    "HEADER": {
      "Content-Type": "application/json"
    }
  },
  "API_HEADER": {
    'Cache-Control': 'no-cache,no-store,max-age=0',
    'Content-type': 'application/json'
  }
};
