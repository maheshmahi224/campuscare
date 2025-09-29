import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Canteen', 'Hostel', 'Transport', 'Other'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending'
  },
  rollNumber: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Complaint', complaintSchema);