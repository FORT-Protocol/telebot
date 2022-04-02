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
            type: 'confirm',
            name: 'confirm',
            message: 'Is now to send message?',
            default: true,
            when: !confirmed
        },
    ]
    console.log(confirmed)
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
