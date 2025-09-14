'use strict';

exports.config = {
  app_name: [process.env.NEW_RELIC_APP_NAME || "sunstone-mind-auth"],
  license_key: process.env.NEW_RELIC_LICENSE_KEY || "eu01xxb0e09f800a85645982434db022FFFFNRAL",
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
