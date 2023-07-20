import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    match: [/^[a-zA-Z0-9]+$/, "Username is invalid"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  avatar: String,
});

const User = models.User || model("User", UserSchema);

export default User;
