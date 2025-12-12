import Announcement from "../models/Announcement.js";

const list = async () => {
  const items = await Announcement.find({}).sort({ publishedAt: -1 }).lean();
  return items;
};

export default { list };
