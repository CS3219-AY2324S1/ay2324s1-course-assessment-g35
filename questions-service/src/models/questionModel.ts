import mongoose, { Schema, Document, Model } from "mongoose";

interface IQuestion extends Document {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  tags: Array<string>[];
}

const questionSchema = new Schema<IQuestion & Document>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  difficulty: {
    type: String,
    required: true,
    // enum: ["easy", "medium", "hard"],
  },
  tags: {
    type: [String],
    required: true,
  },
});

const Question: Model<IQuestion> = mongoose.model("questionAssignment", questionSchema); // first arg is collection name (questionassignments), atlas will create if collection not present
export { Question, IQuestion };
