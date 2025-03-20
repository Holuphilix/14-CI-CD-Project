const request = require("supertest");
const express = require("express");

const app = express();
app.get("/", (req, res) => {
    res.json({ message: "CI/CD Deployment Success!" });
});

describe("API Tests", () => {
    it("should return a success message", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe("CI/CD Deployment Success!");
    });
});

