// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });



// module.exports = async (req, res) => {

//   const chatCompletion = await openai.chat.completions.create({
//     messages: [{ role: "user", content: "Say this is a test" }],
//     model: "gpt-3.5-turbo",
//   });

//   res.status(200).send(chatCompletion.choices[0].message);
// };


const Tesseract = require('tesseract.js');

module.exports = async (req, res) => {
    try {
        if (!req.body.image) {
            return res.status(400).send({ error: 'Image data is required' });
        }

        // The image can be sent as a base64 string or a URL
        const image = req.body.image;

        const result = await Tesseract.recognize(image, 'eng');
        res.status(200).send({ text: result.data.text.trim() });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to process image' });
    }
};
