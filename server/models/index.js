import mongoose from "mongoose";

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/spots');
  console.log('database connneted :)');
}

const locationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  crs: {
    type: String,
    properties: {
      name: String
    }
  },
  features: [{
    type: String,
    properties: {
      Name: { type: String, required: true },
      description: String,
      gx_media_links: String,
      required: true
    },
    geometry: {
      type: String,
      coordinates: [Number]
    }
  }]
})

const LondonLocation = mongoose.model('London', locationSchema);

export default LondonLocation;