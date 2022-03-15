import { ButtonInteraction, Interaction, MessageActionRow, MessageButton, MessageComponentInteraction} from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'begin combat test',

    slash: true,
    testOnly: true,

    callback: async ({ interaction: msgInt, channel }) => {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('Attack')
                    .setEmoji('⚔')
                    .setLabel('Attack')
                    .setStyle('SUCCESS')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('Items')
                    .setEmoji('👝')
                    .setLabel('Items')
                    .setStyle('PRIMARY')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('Flee')
                    .setEmoji('💨')
                    .setLabel('Flee')
                    .setStyle('DANGER')
            )
        await msgInt.reply({
            content: 'Choose your action:',
            components: [row],
            ephemeral: true,
        })


        const filter = (btnInt: Interaction) => {
            return msgInt.user.id === btnInt.user.id
        }

        const collector = channel.createMessageComponentCollector({
            filter,
            max: 1,
            time: 1000 * 15, //15 seconds to confirm choice
        })

        collector.on('collect', (i: MessageComponentInteraction) => {
            i.reply({
                content: 'You clicked a button',
                ephemeral: true
            })
        })

        collector.on('end', async (collection) => {
            collection.forEach((click) => {
                console.log(click.user.id, click.customId)
            })

            if (collection.first()?.customId === 'attack') {
                //attack opponent
            }
            else if (collection.first()?.customId === 'items') {
                //open items
            }
            else if (collection.first()?.customId === 'flee') {
                //flee
            }
            else {
                //continue waiting for input???
            }

            await msgInt.editReply({
                content:'An action has already been performed',
                components: []
            })


        })
    },
} as ICommand