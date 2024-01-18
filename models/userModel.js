import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: String,
    default: "my city",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: String,
  avatarPublicId: String,
});
// userSchema.methods.showMe = function () {
//   let obj = this.toObject();
//   delete obj.lastName;
//   console.log(obj);
//   return obj;
// };
const User = mongoose.model("User", userSchema);

export default User;
