import mongoose from 'mongoose';
import Event from './models/Event.js';
import dotenv from 'dotenv';

dotenv.config();

const seedEvents = [
  {
    title: 'Annual Tech Fest',
    date: new Date('2024-03-15'),
    description: 'Join us for the biggest technology festival of the year with workshops, competitions, and guest speakers.'
  },
  {
    title: 'Career Fair 2024',
    date: new Date('2024-04-10'),
    description: 'Meet top companies and explore internship and job opportunities.'
  },
  {
    title: 'Sports Week',
    date: new Date('2024-05-01'),
    description: 'Inter-college sports competition featuring cricket, football, basketball and more.'
  },
  {
    title: 'Cultural Night',
    date: new Date('2024-06-20'),
    description: 'An evening of music, dance, and cultural performances from various regions.'
  },
  {
    title: 'Workshop on AI & ML',
    date: new Date('2024-02-28'),
    description: 'Hands-on workshop on Artificial Intelligence and Machine Learning fundamentals.'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing events
    await Event.deleteMany({});
    console.log('Cleared existing events');

    // Insert seed events
    await Event.insertMany(seedEvents);
    console.log('Seed events inserted successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();