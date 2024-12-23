import request from "supertest";
import app from "../app";

describe("GET / api", () => {
  it("should respond with  json", async () => {
    const response = await request(app).get("/api/shorten/:gid");
    expect(response.status).toBe(200);

    // Check the content type
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
    
    expect(response.body).toHaveProperty("msg");
  });
});
