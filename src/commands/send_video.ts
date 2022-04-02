import inquirer from 'inquirer'
import useSendVideo from "../hooks/useSendVideo";

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
    if (!token){
        token = answers.token
    }
    if (confirmed || answers.confirmed) {
        chat_ids.forEach((chat_id)=> {
            useSendVideo(token!, video, caption, chat_id)
                .then(({ok, username}) => {
                    console.log(`${username} send status: ${ok ? 'success' : 'error' }`)
                })
        })
        return
    }
    console.log('Cancel this send job!')
}

export default send_video
