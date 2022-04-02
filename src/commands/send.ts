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
            message: 'input the caption:',
            when: (answers: any) => {
                return (answers.method === 'Photo' || answers.method === 'Video') && answers.hasCaption
            }
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
                break
            case 'Video':
                console.log('video:', answers.video)
                console.log('caption', answers.caption)
                break
            case 'Photo':
                console.log('photo:', answers.photo)
                console.log('caption', answers.caption)
                break
            default:
                console.log('Error method!')
        }
        return
    }
    console.log('Cancel the job!')
}

export default send
