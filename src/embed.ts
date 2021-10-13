import { UserModel } from "./types";
import { MessageEmbed } from "discord.js";
import {
  creditsGained,
  creditsGainedMore,
  creditsLost,
  creditsInNegative,
  positiveAttachments,
  negativeAttachments,
} from "./phrases";

export function generateReply(score: number, current: number): MessageEmbed {
  let phrase: string =
    creditsGained[Math.floor(Math.random() * creditsGained.length)];

  if (current > 1000 && score > 0 && Math.floor(Math.random() * 2) === 1)
    phrase =
      creditsGainedMore[Math.floor(Math.random() * creditsGainedMore.length)];
  if (score < 0 && current > 0)
    phrase = creditsLost[Math.floor(Math.random() * creditsLost.length)];
  if (score < 0 && current < 0)
    phrase =
      creditsInNegative[Math.floor(Math.random() * creditsInNegative.length)];

  const embed = new MessageEmbed()
    .setTitle(
      score > 0
        ? ":flag_cn: Great job comrade :flag_cn:"
        : ":rage::flag_cn: Bad work comrade :rage::face_with_symbols_over_mouth:"
    )
    .setDescription(phrase.replace("_", score.toString()))
    .setColor(score > 0 ? "GREEN" : "DARK_RED")
    .setFooter(`Total Social Credits: ${current}`);

  if (Math.floor(Math.random() * 10) === 5)
    embed.setImage(
      score > 0
        ? positiveAttachments[
            Math.floor(Math.random() * positiveAttachments.length)
          ]
        : negativeAttachments[
            Math.floor(Math.random() * negativeAttachments.length)
          ]
    );

  return embed;
}

export function generateCredit(
  username: string,
  credits: number | null,
  author: boolean
): MessageEmbed {
  if (!credits || !username)
    return new MessageEmbed()
      .setTitle(`Error`)
      .setColor("DARK_RED")
      .setFooter(
        author
          ? `You are not part of the great republic.`
          : `This citizen is not part of the great republic.`
      );

  return new MessageEmbed()
    .setFooter(
      `${
        author
          ? `You have ${credits} credits.`
          : `Your fellow comrade, ${username} has ${credits} credits.`
      }`
    )
    .setColor("RANDOM");
}

export function generateLeaderboard(
  scores: UserModel[],
  currentPage: number
): MessageEmbed {
  const embed = new MessageEmbed()
    .setTitle("Social Credit Leaderboard")
    .setFooter(`Page: ${currentPage}`)
    .setColor("RANDOM");

  // for (let i = 0; i < 9; i++) {
  //   if (!scores[i]) break;
  //   embed.addField(`<@${scores[i]._id}>`, scores[i].credit.toString());
  // }
  scores.forEach((s) => embed.addField(s.username, s.credit.toString()));

  return embed;
}