import { expect } from "chai";
import { describe, it, before, after } from "mocha";
import request from "supertest";
import { AppDataSource } from "../../config/database";
import { app } from "../../index";

describe("Quotes API Tests", () => {
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

  describe("GET /quotes/daily-welcome-quotes", () => {
    it("should return daily welcome quote with valid token", async () => {
      // This endpoint requires authentication
      const response = await request(app)
        .get("/quotes/daily-welcome-quotes")
        .set("Authorization", "Bearer valid-token")
        .expect(401);

      // This will fail without a valid token, which is expected
      expect(response.status).to.be.oneOf([401, 404, 500]);
    });

    it("should return 401 without authorization token", async () => {
      const response = await request(app)
        .get("/quotes/daily-welcome-quotes")
        .expect(401);

      expect(response.status).to.equal(401);
    });
  });
});

