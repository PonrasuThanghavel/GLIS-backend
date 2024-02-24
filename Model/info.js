const mongoose = require('mongoose');

const info = new mongoose.Schema({
  Country: { type: String, required: true },
  State: { type: String, required: true },
  District: { type: String, required: true },
  LB: String,
  Location: String,
  Size: { type: Number, required: true },
  Lat: Number,
  Long: Number,
  Address: String,
  Dist_Amenities: String,
  Econ_Indicators: String,
  Zoning: String,
  Legal_Restrictions: String,
  Env_Hazards: String,
  Nat_Amenities: String,
  Road_Access: String,
  Utils: String,
  Pop_Density: String,
  Income_Levels: String,
  Emp_Opportunities: String,
  pH: Number,
  Nutrient_Levels: String,
  Heavy_Metals: String,
  Org_Matter: String,
  Microbial_Activity: String,
  Contaminants_Presence: String,
  Soil_Standards: String,
  Soil_Thresholds: String,
  Env_Hazards_Risks: String,
  Nat_Amenities_Features: String,
  Soil_Texture: String,
  Soil_Drainage: String,
  Soil_Composition: String,
  SPT: Number,
  Soil_Bearing_Capacity: String,
  Soil_Classification: String,
  Shear_Strength: String,
  Compaction: String,
  Permeability: String
},
{
  collection: 'info'
});

const DataModel = mongoose.model('Data', info);

module.exports = DataModel;
