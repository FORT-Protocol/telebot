import inquirer from 'inquirer'
import useSendMessage from '../hooks/useSendMessage.js'

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
    if (token === undefined) {
        token = answers.token
    }
    if (confirmed || answers.confirmed) {
        await useSendMessage(token!, text, chat_ids)
    } else {
        console.log('\nCancel this send task.')
    }
}

export default send_message
