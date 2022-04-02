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
        for (const index in chat_ids) {
           await useSendMessage(token!, text, chat_ids[index])
                .then(({ok, username}) => {
                    console.log(`Process: ${Number(index + 1)}/${chat_ids.length}, ${username}, ${ok ? 'success' : 'error' }`)
                })
        }
        console.log('Over!')
        return
    }
    
    console.log('Cancel the job!')
}

export default send_message
