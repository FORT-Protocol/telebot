import inquirer from "inquirer";

export const send_video = async (
    token: string,
    video: string,
    chat_ids: string[],
    caption: string
) => {
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
    console.log(bot)
    console.log(video)
    console.log(caption)
    console.log(chat_ids)
}

export const mess_send_video = () => {}
