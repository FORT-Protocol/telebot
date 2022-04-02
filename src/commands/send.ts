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
            type: 'input',
            name: 'caption',
            message: 'Add caption:',
            when: (answers: any) => {
                return answers.method === 'Photo' || answers.method === 'Video'
            }
        },
        {
            type: 'confirm',
            name: 'confirm',
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
    if (confirmed || answers.confirm) {
        console.log(`token:${token}`)
        console.log(`method:${answers.method}`)
        return
    }
    console.log('Cancel the job!')
}

export default send
