const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const busStationsRoutes = require('./Routes/Inforoutes.js');
const topRevenueRoutes = require('./Routes/toprevRoutes.js');
const floodRiskRoutes = require('./Routes/floodriskRoutes.js');
const enviSafetyRoutes = require('./Routes/enviRoutes.js');
const geocodeRoutes = require('./Routes/geocodesRoutes.js');
const app = express();
const port = 4000;

app.use(cors());
mongoose.connect('mongodb://127.0.0.1/GLIS', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Error connecting to MongoDB:', error));

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

// Define API endpoints

app.use('/api/bus-stations', busStationsRoutes);
app.use('/api/top-revenue', topRevenueRoutes);
app.use('/api/flood-risk', floodRiskRoutes);
app.use('/api/envi-safety', enviSafetyRoutes);
app.use('/api/geocode', geocodeRoutes);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
