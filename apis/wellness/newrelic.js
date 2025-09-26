'use strict';

exports.config = {
  app_name: [process.env.NEW_RELIC_APP_NAME || "sunstone-mind-wellness"],
  license_key: process.env.NEW_RELIC_LICENSE_KEY || "eu01xx454ef4a214a02e6106d502a7d2FFFFNRAL",
  logging: {
    level: process.env.NEW_RELIC_LOG_LEVEL || "info",
  },
  distributed_tracing: {
    enabled: true,
  },
  allow_all_headers: true,
  attributes: {
    exclude: [
      "request.headers.cookie",
      "request.headers.authorization",
      "request.headers.proxyAuthorization",
      "request.headers.setCookie*",
      "request.headers.x*",
      "response.headers.cookie",
      "response.headers.authorization",
      "response.headers.proxyAuthorization",
      "response.headers.setCookie*",
      "response.headers.x*"
    ],
  },
};
