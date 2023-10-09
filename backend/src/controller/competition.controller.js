const competitionServices = require('../services/competition.services')

// get all competitions
exports.processGetAllCompetitions = async (req, res, next) => {
    console.log('processGetAllCompetitions running');
    try {
        const competitionData = await competitionServices.getAllCompetitions();
        if (!competitionData || competitionData.length === 0) {
            return res.status(404).json({
                statusCode: 404,
                ok: true,
                message: 'No competitions exist',
            });
        }
        console.log('Competition data: ', competitionData);
        const competitions = competitionData.map((competition) => ({
            competition_id: competition.competition_id,
            name: competition.name
        }));
        return res.status(200).json({
            statusCode: 200,
            ok: true,
            message: 'Read competition details successful',
            data: competitions,
        });
    } catch (error) {
        console.error('Error in getAllCompetitions: ', error);
        return next(error);
    }
};