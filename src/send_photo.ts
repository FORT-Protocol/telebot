import inquirer from "inquirer";

export const send_photo = async (
    token: string,
    photo: string,
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
    console.log(photo)
    console.log(caption)
    console.log(chat_ids)
}

export default send_photo
