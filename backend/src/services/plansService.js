import Plan from "../models/Plan.js";

const list = async () => {
  const items = await Plan.find({}).lean();
  return items;
};

export default { list };
