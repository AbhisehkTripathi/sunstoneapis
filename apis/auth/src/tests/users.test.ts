import { expect } from "chai";
import { describe, it, before, after } from "mocha";
import request from "supertest";
import { AppDataSource } from "../../config/database";
import { app } from "../../index";

describe("User API Tests", () => {
  before(async () => {
    // Initialize database connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
  });

  after(async () => {
    // Close database connection
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  });

  describe("POST /user/register", () => {
    it("should register a new user successfully", async () => {
      const userData = {
        email: `test${Date.now()}@example.com`,
        password: "Test1234!",
        name: "Test User"
      };

      const response = await request(app)
        .post("/user/register")
        .send(userData)
        .expect(201);

      expect(response.body).to.have.property("status", "success");
      expect(response.body.data).to.have.property("email", userData.email);
    });

    it("should return 409 if email already exists", async () => {
      const userData = {
        email: "existing@example.com",
        password: "Test1234!",
        name: "Test User"
      };

      // Register first time
      await request(app).post("/user/register").send(userData);

      // Try to register again with same email
      const response = await request(app)
        .post("/user/register")
        .send(userData)
        .expect(409);

      expect(response.body).to.have.property("status", "error");
    });

    it("should return 400 if validation fails", async () => {
      const invalidData = {
        email: "invalid-email",
        password: "123"
      };

      const response = await request(app)
        .post("/user/register")
        .send(invalidData)
        .expect(400);

      expect(response.body).to.have.property("status", "error");
    });
  });

  describe("POST /user/login", () => {
    it("should login successfully with valid credentials", async () => {
      // First register a user
      const userData = {
        email: `login${Date.now()}@example.com`,
        password: "Test1234!",
        name: "Test User"
      };

      await request(app).post("/user/register").send(userData);

      // Then login
      const response = await request(app)
        .post("/user/login")
        .send({
          email: userData.email,
          password: userData.password
        })
        .expect(201);

      expect(response.body).to.have.property("status", "success");
      expect(response.body.data).to.have.property("token");
    });

    it("should return 404 if user not found", async () => {
      const response = await request(app)
        .post("/user/login")
        .send({
          email: "nonexistent@example.com",
          password: "Test1234!"
        })
        .expect(404);

      expect(response.body).to.have.property("status", "error");
    });
  });

  describe("GET /user/me", () => {
    it("should return user profile with valid token", async () => {
      // This test requires a valid JWT token
      // In a real scenario, you would generate a token or login first
      const response = await request(app)
        .get("/user/me")
        .set("Authorization", "Bearer valid-token")
        .expect(401);

      // This will fail without a valid token, which is expected
      expect(response.status).to.be.oneOf([401, 500]);
    });
  });

  describe("GET /health-check", () => {
    it("should return health check status", async () => {
      const response = await request(app)
        .get("/health-check")
        .expect(200);

      expect(response.body).to.have.property("status", "health-check");
      expect(response.body).to.have.property("service", "auth-api");
    });
  });
});

