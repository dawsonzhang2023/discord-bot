// dotenv
require("dotenv").config()

console.log( process.env.KEY_API_TOKEN_RECORDS)
console.log( process.env.CHAT_GPT_ORGID)
console.log( process.env.KEY_CHAT_GPT_ORGID)


// authorize 2   https://discord.com/oauth2/authorize?client_id=1104811428281593897&scope=bot&permissions=1


const {Client , GatewayIntentBits } =require("discord.js")
const discordClient = new Client( { intents : [
    GatewayIntentBits.Guilds ,
    GatewayIntentBits.GuildMessages ,
    GatewayIntentBits.MessageContent
] } )


const { Configuration , OpenAIApi } = require('openai')
const OpenAIConfig = new Configuration({ 
        organization: process.env.OPENAI_ORG,
        apiKey : process.env.KEY_CHAT_GPT_ORGID
 })


const openAiClient = new OpenAIApi( OpenAIConfig )


discordClient.on('messageCreate' ,  async (message)=>{
    try {
        if( message.author.bot )return
        message.reply(`echo ${message.content}`)
        let prompt =  message.content
        console.log( `received ${prompt}`)
        let gptReply = await  openAiClient.createCompletion({
            model:'davinci',
            prompt: `ChatGPT is a friendly chatbot \n\ chatGpt : hello , how are you \n\ ${prompt}`,
            temperature: 0.9,
            max_tokens : 100,
            stop:["ChatGPT"]
        })
        message.reply(`${gptReply.data.choices[0].text}`)
    } catch (error) {
        console.log(error)
    }
})


discordClient.login( process.env.KEY_API_TOKEN_RECORDS )
console.log("ChatGPT bot is Online")






 discordClient 






