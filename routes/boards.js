const router = require('express').Router();
const controller = require('../controllers/boards');

router.route('/boards')
    .post(controller.createBoard)
//     .get(controller.getBoards);

router.route('/boards/:id')
    // .get(controller.getBoard)
    .put(controller.updateBoard)
//     .delete(controller.deleteBoard)

module.exports = router;
