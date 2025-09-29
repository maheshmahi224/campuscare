import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import Complaint from '../models/Complaint.js';

const router = express.Router();

// Create complaint (Student)
router.post('/', protect, async (req, res) => {
  try {
    const complaint = new Complaint({
      ...req.body,
      rollNumber: req.user.rollNumber
    });

    const createdComplaint = await complaint.save();
    res.status(201).json(createdComplaint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get student's complaints
router.get('/my-complaints', protect, async (req, res) => {
  try {
    const complaints = await Complaint.find({ rollNumber: req.user.rollNumber })
      .sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all complaints (Admin)
router.get('/', protect, admin, async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update complaint status (Admin)
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    
    if (complaint) {
      complaint.status = req.body.status;
      const updatedComplaint = await complaint.save();
      res.json(updatedComplaint);
    } else {
      res.status(404).json({ message: 'Complaint not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get complaint stats (Admin)
router.get('/stats', protect, admin, async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: 'Pending' });
    const resolved = await Complaint.countDocuments({ status: 'Resolved' });
    const inProgress = await Complaint.countDocuments({ status: 'In Progress' });

    res.json({ total, pending, resolved, inProgress });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
