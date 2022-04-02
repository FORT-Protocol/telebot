import inquirer from 'inquirer'

export const send_message = async (
    token: string | undefined,
    text: string,
    chat_ids: string[]
) => {
    const questions = [
        {
            type: 'input',
            message: 'bot token:',
            name: 'token',
            when: !token
        },
    ]
    const q = await inquirer.prompt(questions)
    const answers = await q
    if (!token){
        token = answers.token
    }
    console.log('token:', token)
    console.log('text:', text)
    console.log('chat_ids:', chat_ids)
}

export default send_message
