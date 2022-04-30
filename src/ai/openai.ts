import OpenAI, { Completion } from "openai-api";
import { Message } from "discord.js";
import { generateCredits, update } from "../util/credit";
import { generateReply } from "../discord/embed";
import config from "../../config.json";

const openAi = new OpenAI(config.key);

export async function classifySentiment(
  message: Message,
  good: boolean
): Promise<void> {
  //TODO this is from the example on the OpenAI website
  const sentiment: Completion = await openAi.complete({
    engine: "curie",
    prompt: `This is a tweet sentiment classifier\nTweet: \"I loved the new Batman movie!\"\nSentiment: Positive\n###\nTweet: \"I hate it when my phone battery dies\"\nSentiment: Negative\n###\nTweet: \"My day has been 👍\"\nSentiment: Positive\n###\nTweet: \"This is the link to the article\"\nSentiment: Neutral\n###\nTweet: ${message.content}\"\nSentiment:`,
    maxTokens: 60,
    temperature: 0.3,
    topP: 1.0,
    frequencyPenalty: 0.0,
    presencePenalty: 0.0,
    stop: "###",
  });

  const score: number = generateCredits(
    sentiment.data.choices[0].text.toLowerCase().replace(/\s+/g, ""),
    good
  );

  console.log(score);

  await message.channel.send({
    embeds: [generateReply(score, await update(message.author, score))],
  });
}

// function generateScore(sentiment: string): number {
//   switch (sentiment) {
//     case "positive":
//       return Math.floor(Math.random() * (100 - 75)) + 75;
//     case "negative":
//       return Math.floor(Math.random() * (-100 - 75)) - 75;
//     default:
//       return Math.floor(Math.random() * (10 + -10)) + -20;
//   }
// }
