import inquirer from 'inquirer'
import useSendPhoto from "../hooks/useSendPhoto";

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
        for (const index in chat_ids) {
            await useSendPhoto(token!, photo, caption, chat_ids[index])
                .then(({ok, username}) => {
                    console.log(`Process: ${Number(index + 1)}/${chat_ids.length}, ${username}, ${ok ? 'success' : 'error' }`)
                })
        }
        console.log('Over!')
        return
    }
    console.log('Cancel this send job!')
}

export default send_photo
