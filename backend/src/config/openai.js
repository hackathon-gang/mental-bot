import OpenAI from "openai";
import config from "./config.js";

const openai = new OpenAI({
    apiKey: config.chatgptapikey
})

export default openai;