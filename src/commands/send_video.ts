import inquirer from 'inquirer'

export const send_video = async (
    token: string | undefined,
    video: string,
    chat_ids: string[],
    caption: string | undefined
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
    console.log(token)
    console.log(video)
    console.log(caption)
    console.log(chat_ids)
}

export default send_video
