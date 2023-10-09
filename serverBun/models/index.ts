import mongoose from "mongoose";

main().catch(err => console.log(err));
async function main () {
  const HOST = process.env.DOCKER_HOST || '127.0.0.1';
  const connectionString = `mongodb://${HOST}:27017/spots`;

  console.log('connection string: ', connectionString);
  await mongoose.connect(connectionString).then(() => {
    console.log('database connneted :)');
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

export type LondonLocation = mongoose.InferSchemaType<typeof locationSchema>;
const LondonLocation = mongoose.model('London', locationSchema);

export default LondonLocation;