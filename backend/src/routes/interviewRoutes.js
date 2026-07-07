const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const interviewController = require("../controllers/interviewController");

/**
 * @swagger
 * /api/interviews:
 *   post:
 *     summary: Create a new interview
 *     tags: [Interviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jobRole
 *               - experience
 *               - difficulty
 *             properties:
 *               jobRole:
 *                 type: string
 *                 example: React Developer
 *               experience:
 *                 type: integer
 *                 example: 2
 *               difficulty:
 *                 type: string
 *                 example: Medium
 *     responses:
 *       201:
 *         description: Interview created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, interviewController.createInterview);
/**
 * @swagger
 * /api/interviews:
 *   get:
 *     summary: Get all interviews of logged-in user
 *     tags: [Interviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of interviews
 */
router.get("/", authMiddleware, interviewController.getUserInterviews);

/**
 * @swagger
 * /api/interviews/{id}/generate:
 *   post:
 *     summary: Generate interview questions using AI
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 3
 *     responses:
 *       201:
 *         description: Questions generated successfully
 */
router.post(
  "/:id/generate",
  authMiddleware,
  interviewController.generateInterviewQuestions,
);

/**
 * @swagger
 * /api/interviews/{id}:
 *   get:
 *     summary: Get interview details
 *     tags: [Interviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 3
 *     responses:
 *       200:
 *         description: Interview details
 *       404:
 *         description: Interview not found
 */
router.get("/:id", authMiddleware, interviewController.getInterviewDetails);

module.exports = router;
