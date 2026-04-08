const mongoose = require('mongoose');

async function fixDB() {
  await mongoose.connect('mongodb://127.0.0.1:27017/workers-jobs');
  const collection = mongoose.connection.collection('posts');
  
  const res1 = await collection.updateMany(
    {}, // Fix all posts
    { $set: { comments: [], likedBy: [] }, $unset: { likes: "" } }
  );
  
  console.log("Database cleared legacy fields:", res1.modifiedCount);
  process.exit(0);
}

fixDB();
