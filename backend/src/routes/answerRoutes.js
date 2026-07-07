const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const answerController = require("../controllers/answerController");

/**
 * @swagger
 * /api/questions/{id}/answer:
 *   post:
 *     summary: Submit answer and evaluate using AI
 *     tags: [Answers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 7
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userAnswer:
 *                 type: string
 *                 example: useEffect is used for handling side effects.
 *     responses:
 *       201:
 *         description: Answer evaluated successfully
 */

router.post("/:id/answer", authMiddleware, answerController.submitAnswer);

module.exports = router;
