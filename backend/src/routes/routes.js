const bodyParser = require('body-parser');
const path = require('path');

const competitionController = require('../controller/competition.controller');

module.exports = (app, router) => {
    router.get('/api/competitions', competitionController.processGetAllCompetitions);
}