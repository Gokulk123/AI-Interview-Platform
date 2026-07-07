const swaggerJSdoc = require("swagger-jsdoc");
const swaggerUiExpress = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AI Interview Platform API",
      version: "1.0.0",
      description: "Backend API documentation for AI Interview Platform",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJSdoc(options);

module.exports = {
  swaggerUiExpress,
  specs,
};
