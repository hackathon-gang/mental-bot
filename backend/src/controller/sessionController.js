import sessionService from "../services/sessionServices.js"

const sessionController = {

    processGetSessions: async (req, res, next) => {
        let uid = req.body.userId;
        let dateTime = req.query.dateTime

        try {
            const sessions = await sessionService.getSessions(uid, dateTime);
            if (sessions) {
                console.log('sessions: ', sessions);
                const sessionData = sessions.map((session) => ({
                    sid: session.sid,
                    uid: session.uid,
                    startTime: session.start_time,
                    endTime: session.end_time
                }));
                res.status(200).json({
                    statusCode: 200,
                    ok: true,
                    message: 'Read session details successful',
                    data: sessionData,
                });
            } else {
                res.status(404).json({
                    statusCode: 404,
                    ok: true,
                    message: 'No sessions exists',
                });
            }
        } catch (error) {
            console.error('Error in getSessions: ', error);
            return next(error);
        }
    },

    processSaveSession: async (req, res, next) => {
        let uid = req.body.userId;

        try {
            const saveSessionResult = await sessionService.saveSession(uid);

            if (saveSessionResult) {
                return res.status(200).json({
                    statusCode: 200,
                    ok: true,
                    message: 'Create session successful',
                    data: saveSessionResult
                });
            } else {
                return res.status(500).json({
                    statusCode: 500,
                    ok: false,
                    message: 'Failed to create session',
                    data: saveSessionResult
                });
            }
        }
        catch (error) {
            console.error('Error in saveSession: ', error);
            return next(error);
        }
    },
}

export default sessionController;