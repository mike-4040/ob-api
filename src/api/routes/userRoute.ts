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
  router.get(`${routeName}`, controller.getAll.bind(controller));
  router.post(`${routeName}`, controller.create.bind(controller));
  router.put(`${routeName}/:id`, controller.update.bind(controller));
  router.delete(`${routeName}/:id`, controller.delete.bind(controller));
  return router;
}
