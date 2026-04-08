const mongoose = require('mongoose');
const { Schema } = mongoose;

const AuthorSchema = new Schema({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  role: { type: String, required: true },
  time: { type: String, required: true }
}, { _id: false });

const CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  authorName: { type: String, required: true },
  authorAvatar: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const PostSchema = new Schema({
  type: { type: String, enum: ["job", "worker"], required: true },
  author: { type: AuthorSchema, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
  location: { type: String, required: true },
  budget: { type: String },
  rate: { type: String },
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: { type: [CommentSchema], default: [] }
}, { timestamps: true });

const PostModel = mongoose.model("Post", PostSchema);

async function test() {
  await mongoose.connect('mongodb://127.0.0.1:27017/workers-jobs');
  console.log("Connected");
  try {
    const post = await PostModel.findOne();
    if (!post) return console.log("No post found");
    
    // Simulate like
    console.log("Found post:", post._id);
    console.log("Old likedBy:", post.likedBy);
    post.likedBy.push(new mongoose.Types.ObjectId());
    await post.save();
    console.log("Save successful!");
  } catch (e) {
    console.error("Save failed:", e);
  }
  process.exit(0);
}

test();
