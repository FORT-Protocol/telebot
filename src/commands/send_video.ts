import inquirer from 'inquirer'
import useSendVideo from '../hooks/useSendVideo.js'

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
            when: !token,
        },
        {
            type: 'confirm',
            name: 'confirmed',
            message: 'Is now to send message?',
            default: true,
            when: !confirmed,
        },
    ]
    const q = await inquirer.prompt(questions)
    const answers = await q
    if (!token) {
        token = answers.token
    }
    if (confirmed || answers.confirmed) {
        await useSendVideo(token!, video, caption, chat_ids)
    } else {
        console.log('\nCancel this send task.')
    }
}

export default send_video
