import plansService from "../services/plansService.js";

const list = async (req, res, next) => {
  try {
    const items = await plansService.list();
    res.json(items);
  } catch (e) {
    next(e);
  }
};

export default { list };
