import mongoose from "mongoose";

main().catch(err => console.log(err));
async function main () {
  await mongoose.connect(`mongodb://127.0.0.1:27017/spots`).then(() => {
    console.log('database connneted :)', process.env.DB_NAME);
  })
}

const locationSchema = new mongoose.Schema({
  type: String,
  properties: {
    Name: { type: String, required: true },
    description: String,
    gx_media_links: String
  },
  geometry: {
    coordinates: [Number]
  }
})


const LondonLocation = mongoose.model('London', locationSchema);

export default LondonLocation;