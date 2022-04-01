import inquirer from "inquirer"

export const send_message = async (token: string, text: string, chat_ids: string[]) => {
    const questions = [
        {
            type: "input",
            message: "Input bot token",
            name: "token",
            default: ""
        }
    ]
    let bot = token
    if (!token) {
        const q = await inquirer.prompt(questions)
        const answers = await q
        bot = answers.token
    }
    console.log('token:', bot)
    console.log('text:', text)
    console.log('chat_ids:', chat_ids)
}

export const mess_send_message = () => {
}
