import OpenAI from "openai";
import config from "./config.js";

const openai = new OpenAI({
    apiKey: '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'
})

export default openai;