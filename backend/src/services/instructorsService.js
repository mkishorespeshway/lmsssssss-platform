import Instructor from "../models/Instructor.js";

const list = async () => {
  const items = await Instructor.find({}).lean();
  return items;
};

export default { list };
