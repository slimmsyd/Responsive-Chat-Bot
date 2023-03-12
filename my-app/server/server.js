const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors")
require("dotenv").config();


const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.PRIVATE_KEY
});
const openai = new OpenAIApi(configuration);


const app = express();
app.use(cors())
app.use(bodyParser.json())

const PORT = 5069;


app.post("/", async(req, res) => {
    const {message} = req.body
    console.log(message)
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",  
        messages:[
            {"role": "system", "content": "You are a helpful assistant that translates English into Japanese."},
            {"role": "user", "content": "Translate this into Japanese"},
            {"role": "assistant", "content": "これを日本語に翻訳してください"},
            {"role": "user", "content": `Translate this following English text into Japanese: ${message}`}
        ]

    });
    console.log(completion.data.choices[0].message.content)

    res.json(
        {
            message: completion.data.choices[0].message.content

        }
    )

})

const chatGPT = async(prompt) => { 

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",  
        messages:[
            {"role": "system", "content": "You are a helpful assistant that translates English into Japanese."},
            {"role": "user", "content": "Translate this into Japanese"},
            {"role": "assistant", "content": "これを日本語に翻訳してください"},
            {"role": "user", "content": `Translate this following English text into Japanese: ${prompt}`}
        ]
        
})

console.log(completion.data.choices[0].message.content)


}


app.listen(PORT, async function()
{ 
    console.log(`App is listening on http://localhost:${PORT}`)


})

