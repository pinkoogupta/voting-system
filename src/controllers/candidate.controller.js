import {User} from '../models/user.model.js';
import Candidate from '../models/candidate.model.js';
import {generateToken} from '../middlewares/auth.middleware.js'


// Utility function to check if a user has admin role
const checkAdminRole = async (userID) => {
    try {
        const user = await User.findById(userID);
        return user?.role === 'admin';
    } catch (err) {
        return false;
    }
};

// POST: Add a candidate
export const addCandidate = async (req, res) => {
    try {
        if (!(await checkAdminRole(req.user.id))) {
            return res.status(403).json({ message: 'User does not have admin role' });
        }

        const data = req.body;
        const newCandidate = new Candidate(data);
        const response = await newCandidate.save();
        console.log('Candidate data saved');
        res.status(200).json({ response });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// PUT: Update a candidate
export const updateCandidate = async (req, res) => {
    try {
        if (!(await checkAdminRole(req.user.id))) {
            return res.status(403).json({ message: 'User does not have admin role' });
        }

        const { candidateID } = req.params;
        const updatedCandidateData = req.body;

        const response = await Candidate.findByIdAndUpdate(candidateID, updatedCandidateData, {
            new: true,
            runValidators: true,
        });

        if (!response) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        console.log('Candidate data updated');
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// DELETE: Delete a candidate
export const deleteCandidate = async (req, res) => {
    try {
        if (!(await checkAdminRole(req.user.id))) {
            return res.status(403).json({ message: 'User does not have admin role' });
        }

        const { candidateID } = req.params;

        const response = await Candidate.findByIdAndDelete(candidateID);

        if (!response) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        console.log('Candidate deleted');
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// GET: Vote for a candidate
export const voteForCandidate = async (req, res) => {
    const { candidateID } = req.params;
    const userId = req.user.id;

    try {
        const candidate = await Candidate.findById(candidateID);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.role === 'admin') {
            return res.status(403).json({ message: 'Admin is not allowed to vote' });
        }
        if (user.isVoted) {
            return res.status(400).json({ message: 'You have already voted' });
        }

        candidate.votes.push({ user: userId });
        candidate.voteCount++;
        await candidate.save();

        user.isVoted = true;
        await user.save();

        return res.status(200).json({ message: 'Vote recorded successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// GET: Count votes
export const voteCount = async (req, res) => {
    try {
        const candidates = await Candidate.find().sort({ voteCount: -1 });

        const voteRecord = candidates.map((data) => ({
            party: data.party,
            count: data.voteCount,
        }));

        res.status(200).json(voteRecord);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// GET: List all candidates (name and party)
export const listCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find({}, 'name party -_id');
        res.status(200).json(candidates);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
