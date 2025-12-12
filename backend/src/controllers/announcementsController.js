import announcementsService from "../services/announcementsService.js";

const list = async (req, res, next) => {
  try {
    const items = await announcementsService.list();
    res.json(items);
  } catch (e) {
    next(e);
  }
};

export default { list };
