import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './src/routes/routes.js';

let app = express();
app.use(cors());

// Server Settings
const PORT = 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

router.get('/', (req, res, next) => {
    res.status(200).json({ message: "success" });
})

// Listen for incoming requests
app.listen(PORT, err => {
    if (err) return console.log(`Cannot Listen on PORT: ${PORT}`);
    console.log(`Server is Listening on: http://localhost:${PORT}/`);
});

// import config from './src/config/config.js';
// import OpenAI from "openai";

// const openai = new OpenAI({
//     apiKey: config.chatgptapikey
// });

// const chat = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [{"role": "user", "content": "You know what's infuriating? How relationships can start with so much promise and end up feeling like a never-ending rollercoaster of emotions. I mean, why is it that the person who once made your heart race now has the power to drive you absolutely insane? It's like a switch flips, and suddenly, every little thing they do or say becomes an irritation. And don't get me started on the miscommunication. It's like we're speaking different languages, and I'm left deciphering hieroglyphics just to figure out what they mean. It's exhausting, and I find myself questioning whether it's even worth it. But then, in a split second, they do something that brings back all those feelings, and I'm back on that crazy ride, holding on for dear life. Relationships can be the most beautiful disaster, and it's maddening how we can't seem to quit them even when they drive us up the wall. \nCan you summarize and include important points from first person perspective"}]
// })

// console.log(chat.choices[0].message);