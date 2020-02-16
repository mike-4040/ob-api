// for all routes
import { UserController } from '../controllers/userController';

const routeName = '/user';

export function createUserRouter(express, controller: UserController) {
  const router = express.Router();
  router.get(`${routeName}/:id`, controller.get.bind(controller));
  router.get(`${routeName}`, controller.getAll.bind(controller));

  return router;
}
