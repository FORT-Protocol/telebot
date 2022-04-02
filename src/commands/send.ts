import inquirer from "inquirer";

export const send = async (token: string | undefined, confirmed: boolean) => {
    const questions = [
        {
            type: 'input',
            name: 'token',
            message: 'Bot Token:',
            when: !token
        },
        {
            type: 'list',
            name: 'method',
            message: 'Which to choose to send?',
            choices: ['Message', 'Video', 'Photo'],
            default: 0
        },
        {
            type: 'editor',
            name: 'text',
            message: 'Input the text to send:',
            when: (answers: any) => {
               return answers.method === 'Message'
            }
        },
        {
            type: 'input',
            name: 'video',
            message: 'Input the video uri:',
            when: (answers: any) => {
                return answers.method === 'Video'
            }
        },
        {
            type: 'input',
            name: 'photo',
            message: 'Input the photo uri:',
            when: (answers: any) => {
                return answers.method === 'Photo'
            }
        },
        {
            type: 'confirm',
            name: 'hasCaption',
            message: 'Add caption?',
            default: true,
            when: (answers: any) => {
                return answers.method === 'Photo' || answers.method === 'Video'
            }
        },
        {
            type: 'editor',
            name: 'caption',
            message: 'Input the caption:',
            when: (answers: any) => {
                return (answers.method === 'Photo' || answers.method === 'Video') && answers.hasCaption
            }
        },
        {
            type: 'editor',
            name: 'chat_ids',
            message: 'Input the chat_ids:'
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
        console.log(`token:${token}`)
        switch (answers.method) {
            case 'Message':
                console.log('text:', answers.text)
                console.log('chat_ids:', answers.chat_ids)
                break
            case 'Video':
                console.log('video:', answers.video)
                if (answers.caption) {
                    console.log('caption', answers.caption)
                }
                console.log('chat_ids:', answers.chat_ids)
                break
            case 'Photo':
                console.log('photo:', answers.photo)
                if (answers.caption) {
                    console.log('caption', answers.caption)
                }
                console.log('chat_ids:', answers.chat_ids)
                break
            default:
                console.log('Error method!')
        }
        return
    }
    console.log('Cancel the job!')
}

export default send
