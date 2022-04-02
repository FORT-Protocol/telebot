import inquirer from 'inquirer'

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
    if (!token){
        token = answers.token
    }
    if (confirmed || answers.confirmed) {
        console.log('token:', token)
        console.log('text:', text)
        console.log('chat_ids:', chat_ids)
        return
    }
    console.log('Cancel the job!')
}

export default send_message
