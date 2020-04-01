import { Roles } from '../../config/roles';
import { AuthService } from '../../infrastructure/service/authService';

export const createAuthMiddleware = (authService: AuthService) => (req, res, next) => {
  // Temporary added Vendor by default
  const token = req.headers.Authorization;

  if (!token) {
    res.status(401);
    return res.end();
  }

  // check expiration
  if (authService.verifyExpiration(token)) {
    res.status(403);
    return res.end();
  }

  req.context = { role: Roles.Vendor };
  return next();
};
