/**
 * Author: Keon Hee Park (Gunhee Park)
 * Topic: ChatGPT API: Summarize YouTube Videos by Reading Transcripts.
 * Description: This script is a Node.js application that utilizes the OpenAI API to generate a summary of a YouTube video transcript. 
 * The process begins by fetching the transcript of a YouTube video. This transcript is then sent to the OpenAI GPT-3 model, 
 * which generates a summary that is subsequently printed to the console.
 * 
 * The GPT-3 model is prompted with the phrase "Provide summary of this video transcript: ", followed by the transcript itself.
 * The model then generates a summary of the transcript.
 * 
 * The example provided uses the YouTube video ID of BlackPink's "Playing with Fire" song. 
 * This ID can be replaced with the ID of any YouTube video to generate a summary of that video's transcript.
 * 
 * Please note that you need to have the OpenAI API key and the `youtube-browser-api` module properly set up for this script to work.
 * 
 * Completed: Sunday, May 14, 2023.
 */

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getVideoSummary(videoId) {
  // Fetch the transcript from YouTube
  const Api = await import('youtube-browser-api');
  const transcriptData = await Api.default.transcript({ videoId });

  // Concatenate all the transcript text into a single string
  const transcript = transcriptData.videoId.map(item => item.text).join(' ');
const provideSummary = "Provide summary of this video transcript: " + transcript;
  // Send the transcript to ChatGPT and get a summary
  const gptResponse = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: provideSummary,
    max_tokens: 150
  });
console.log(gptResponse.data.choices[0].text.trim());
}

// KPOP: BlackPink Playing with Fire song as an example.
// https://www.youtube.com/watch?v=9pdj4iJD08s
getVideoSummary('9pdj4iJD08s');
