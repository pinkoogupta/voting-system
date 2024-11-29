import express from 'express';
import { jwtAuthMiddleware } from '../middlewares/auth.middleware.js';
import {
    addCandidate,
    updateCandidate,
    deleteCandidate,
    voteForCandidate,
    voteCount,
    listCandidates,
} from '../controllers/candidate.controller.js';

const router = express.Router();

// Add Candidate Route
router.post('/', jwtAuthMiddleware, addCandidate);

// Update Candidate Route
router.put('/:candidateID', jwtAuthMiddleware, updateCandidate);

// Delete Candidate Route
router.delete('/:candidateID', jwtAuthMiddleware, deleteCandidate);

// Vote for Candidate Route
router.get('/vote/:candidateID', jwtAuthMiddleware, voteForCandidate);
// Get Vote Count Route
router.get('/vote/count', voteCount);

// List Candidates Route
router.get('/', listCandidates);

export default router;
