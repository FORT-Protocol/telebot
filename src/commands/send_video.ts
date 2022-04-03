import inquirer from 'inquirer'
import useSendVideo from "../hooks/useSendVideo.js";
import Chalk from "chalk";

export const send_video = async (
    token: string | undefined,
    video: string,
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
    if (!token) {
        token = answers.token
    }
    if (confirmed || answers.confirmed) {
        let success = 0
        const start = Date.now()
        console.log(`local: Start sending video...`)
        for (const index in chat_ids) {
            await useSendVideo(token!, video, caption, chat_ids[index])
                .then(({ok, username}) => {
                    if (ok) {
                        success++
                        console.log(`local: Sending video to ${username} ${((Number(index) + 1) / chat_ids.length * 100).toFixed(2)}% (${Number(index) + 1}/${chat_ids.length}), done.`)
                    } else {
                        console.log(`local: Sending video to ${username} ${((Number(index) + 1) / chat_ids.length * 100).toFixed(2)}% (${Number(index) + 1}/${chat_ids.length}), done.`)
                    }
                })
        }
        const end = Date.now()
        console.log(Chalk.green(`\nSuccessfully completed the sending task: (${success}/${chat_ids.length}), ${((end - start) / (1000 * chat_ids.length)).toFixed(2)}/s, done.`))
        return
    }
    console.log(Chalk.red('\nCancel this send task.'))
}

export default send_video
