import axios from "axios";

const sessionFunctions = {
    getSessions: async (baseURL, token, datetime) => {
        try {
            const response = await axios
                .get(`${baseURL}/api/user/sessions?dateTime=${datetime}`, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
            console.log("session response: ", response);
            return response.data;
        }
        catch (error) {
            console.error("Error in getSessions: ", error);
            throw error;
        }
    },
    formatSessionDate: (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    },
    createNewSession: async (baseURL, token) => {
        try {
            const response = await axios
                .post(`${baseURL}/api/user/sessions`, {}, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
            console.log("session create response: ", response);
            return response.data;
        }
        catch (error) {
            console.error("Error in createNewSession: ", error);
            throw error;
        }
    }
};

export default sessionFunctions;