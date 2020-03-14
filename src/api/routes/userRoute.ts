import { UserController } from '../controllers/userController';

const routeName = '/user';

/**
 * Factory that creates user router
 * @param express
 * @param controller
 */
export function createUserRouter(express, controller: UserController) {
  const router = express.Router();
  router.get(`${routeName}/:id`, controller.get.bind(controller));
  router.post(`${routeName}`, controller.getByName.bind(controller));
  router.get(`${routeName}`, controller.getAll.bind(controller));
  router.post(`${routeName}`, controller.create.bind(controller));

  return router;
}
