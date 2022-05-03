import inquirer from 'inquirer'
import useSendPhoto from '../hooks/useSendPhoto.js'
import { useGetMe } from '../hooks/useGetMe.js'

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
    const res = await useGetMe(token!)
    if (!res) {
        return
    }
    if (confirmed || answers.confirmed) {
        await useSendPhoto(token!, photo, caption, chat_ids)
    } else {
        console.log('\nCancel this send task.')
    }
}

export default send_photo
