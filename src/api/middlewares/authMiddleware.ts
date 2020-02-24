import { Roles } from '../../config/roles';

export const authMiddleware = (req, res, next) => {
  // Temporary added Vendor by default
  req.context = { role: Roles.Vendor };
  next();
};
