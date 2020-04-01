import { AuthController } from '../controllers/authController';

/**
 * Factory that creates user router
 * @param express
 * @param controller
 */
export function createAuthRouter(express, controller: AuthController) {
  const router = express.Router();
  // test get token
  router.post('/token', controller.token.bind(controller));
  // login
  router.post('/login', controller.login.bind(controller));

  return router;
}
