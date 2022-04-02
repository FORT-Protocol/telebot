import inquirer from "inquirer";

export const send = async (token: string | undefined) => {
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
    console.log('easy send mode')
}

export default send
