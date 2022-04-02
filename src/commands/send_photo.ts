import inquirer from 'inquirer'
import useSendPhoto from "../hooks/useSendPhoto";
import Chalk from "chalk";

export const send_photo = async (
    token: string | undefined,
    photo: string,
    chat_ids: string[],
    caption: string | undefined,
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
    if (!token){
        token = answers.token
    }
    if (confirmed || answers.confirmed) {
        let success = 0
        for (const index in chat_ids) {
            await useSendPhoto(token!, photo, caption, chat_ids[index])
                .then(({ok, username}) => {
                    if (ok) {
                        success++
                        console.log(Chalk.green(`Sending photo to ${username}... ${Number(index) + 1}/${chat_ids.length} (${((Number(index) + 1) / chat_ids.length * 100).toFixed(2)}%)`))
                    } else {
                        console.log(Chalk.dim(`Sending photo to ${username}... ${Number(index) + 1}/${chat_ids.length} (${((Number(index) + 1) / chat_ids.length * 100).toFixed(2)}%)`))
                    }
                })
        }
        console.log(`Mission Completed! Total: ${chat_ids.length} Success: ${success}`)
        return
    }
    console.log(Chalk.red('Cancel this send job!'))
}

export default send_photo
