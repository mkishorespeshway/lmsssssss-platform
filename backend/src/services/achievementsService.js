import Achievement from "../models/Achievement.js";

const list = async () => {
  const items = await Achievement.find({}).lean();
  return items;
};

export default { list };
