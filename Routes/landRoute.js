const express = require("express");
const router = express.Router();
const Land = require("../Model/agri");



router.get('/fetch', async (req, res) => {
    try {
      const land= await Land.find({});
      res.json(land);
    } catch (error) {
      console.error(':', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
router.post('/add', async (req, res) => {
    try {
        const { ownerName,  phoneNumber, contact, address, landSize, soilType, cropCultivated, agriculturalLoan, latitude, longitude, cropPrice } = req.body;
    
        const newLand = new Land({ ownerName, phoneNumber, contact, address, landSize, soilType, cropCultivated, agriculturalLoan, latitude, longitude, cropPrice });
  
        await newLand.save(); 
        const response = {
            message: 'Land details saved successfully'
        };
        res.status(200).json(response);
    } catch (error) {
        console.error('Error saving land details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

    router.delete('/delete/:name', async (req, res) => {
        try {
            const { name } = req.params;
            // Find the document by name and delete it
            const deletedLand = await Land.findOneAndDelete({ ownerName: name });
            if (!deletedLand) {
                return res.status(404).json({ error: 'Land not found' });
            }
            res.status(200).json({ message: 'Land details deleted successfully', deletedLand });
        } catch (error) {
            console.error('Error deleting land details:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    


module.exports = router;
