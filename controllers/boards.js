const Boards = require('../models/boards');

/**
 * Details about the stage
 * 1: TODO
 * 2: In Progress
 * 3: Completed
 */


// Create a new board
const createBoard = async (req, res, next) => {
  
    try {
        const board = await Boards.create(req.body);
        let result = {};
        result = JSON.parse(JSON.stringify(board));
        result.stage = 1;
        res.status(201).json(result);

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }

}


const updateBoard = async (req, res, next) => {
    try {
        const board = await Boards.findOne({where: {id: req.params.id}});

        board.stage = req.body.stage;
        await board.save(); 
        let result = {};
        result = JSON.parse(JSON.stringify(board));
        
        
        if(result.stage < 1 || result.stage > 3)
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid stage'
            });


        res.status(200).json(result);

    }catch(error){
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
}

// const getBoard = (req, res) => {
//     try {
//         const board = Boards.findOne({where: {id: req.params.id}})
//         if(!board) 
//             return res.status(400).json({
//                 status: 'fail',
//                 message: 'No board found'
//             });

//         res.status(200).json(board);

//     }catch(error){
//         res.status(400).json({
//             status: 'fail',
//             message: error
//         });
//     }
// }


module.exports = {
    createBoard,
    updateBoard,
    // getBoard
}

