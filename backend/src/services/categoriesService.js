import Category from "../models/Category.js";

const list = async () => {
  const items = await Category.find({}).lean();
  return items;
};

export default { list };
