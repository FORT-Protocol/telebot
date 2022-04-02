import inquirer from 'inquirer'
import useSendMessage from "../hooks/useSendMessage"
import Chalk from "chalk";

export const send_message = async (
    token: string | undefined,
    text: string,
    chat_ids: string[],
    confirmed: boolean
) => {
    const questions = [
        {
            type: 'input',
            name: 'token',
            message: 'Bot Token:',
            when: !token
        },
        {
            type: 'confirm',
            name: 'confirmed',
            message: 'Is now to send message?',
            default: true,
            when: !confirmed
        },
    ]
    const q = await inquirer.prompt(questions)
    const answers = await q
    if (token === undefined) {
        token = answers.token
    }
    if (confirmed || answers.confirmed) {
        for (const index in chat_ids) {
            await useSendMessage(token!, text, chat_ids[index])
                .then(({ok, username}) => {
                    if (ok) {
                        console.log(Chalk.green(`Total:${chat_ids.length}  No.${Number(index) + 1}  ${username}`))
                    } else {
                        console.log(Chalk.red(`Total:${chat_ids.length}  No.${Number(index) + 1}  ${username}`))
                    }
                })
        }
        console.log(Chalk.green('\nMission Completed!'))
        return
    }
    
    console.log('Cancel the job!')
}

export default send_message
