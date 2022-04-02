import inquirer from 'inquirer'
import useSendMessage from "../hooks/useSendMessage"

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
        chat_ids.forEach((chat_id) => {
            useSendMessage(token!, text, chat_id)
                .then(({ok, username}) => {
                    console.log(`${username} send status: ${ok ? 'success' : 'error' }`)
                })
        })
        return
    }
    console.log('Cancel the job!')
}

export default send_message
