import {
  ComprehendClient,
  BatchDetectSentimentCommand,
  SentimentScore,
} from "@aws-sdk/client-comprehend";
import { Chance } from "chance";
import { Message } from "discord.js";
import { update } from "../util/credit";
import { generateReply } from "../discord/embed";

const chance = new Chance();

const client = new ComprehendClient({ region: "us-east-1" });

export async function comprehend(message: Message): Promise<void> {
  const data = await client.send(
    new BatchDetectSentimentCommand({
      LanguageCode: "en",
      TextList: [message.content.toLowerCase()],
    })
  );

  if (
    !data.ResultList ||
    !data.ResultList[0].SentimentScore ||
    !data.ResultList[0].Sentiment
  )
    return;

  const score = generateCredit(data.ResultList[0].Sentiment);

  await message.channel.send({
    embeds: [generateReply(score, await update(message.author, score))],
  });

  return;
}

function generateCredit(sentiment: string): number {
  switch (sentiment) {
    case "NEGATIVE":
      return Math.floor(Math.random() * (-100 - 75)) - 75;
    case "POSITIVE":
      return Math.floor(Math.random() * (100 - 75)) + 75;
    default:
      return Math.floor(Math.random() * (10 + -10)) + -20;
  }
}