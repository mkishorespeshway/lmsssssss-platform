import achievementsService from "../services/achievementsService.js";

const list = async (req, res, next) => {
  try {
    const items = await achievementsService.list();
    res.json(items);
  } catch (e) {
    next(e);
  }
};

export default { list };
