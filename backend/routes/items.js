import express from 'express';
import * as itemsController from '../controllers/itemsController.js';

const router = express.Router();

router.get('/', itemsController.getAllItems);
router.get('/:id', itemsController.getItemById);
router.post('/', itemsController.createItem);
router.put('/:id', itemsController.updateItem);
router.delete('/:id', itemsController.deleteItem);

export default router;
