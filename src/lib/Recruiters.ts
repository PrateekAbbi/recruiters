import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // ✅ Ensures uniqueness
  sentAt: { type: Date, default: Date.now },
});

const Recruiter =
  mongoose.models.Recruiter || mongoose.model("Recruiter", recruiterSchema);

export default Recruiter;
