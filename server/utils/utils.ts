import {IUser} from "~/server/models/user.model";
import {H3Event} from "h3";
import {Token} from "~/server/models/token.model";
import nodemailer from "nodemailer";
import {Web3} from "web3";

const config = useRuntimeConfig()
const {ethKey, infuraKey} = config
const {ethereumNet} = config.public
const web3 = new Web3(ethereumNet);
web3.eth.getBlock().then(res => console.log(ethereumNet, 'ETH block:', res.number))

const {mailUser, mailPassword, telegramBotToken} = useRuntimeConfig()

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: mailUser,
        pass: mailPassword,
    },
});

function sendMail(mailData: any) {
    mailData.from = mailUser
    return transporter.sendMail(mailData)
}

export default {
    sendMail,
    adaptUser(user: IUser) {
        if (user) {
            user.passwordHash = ''
            user.restorePassword = ''
        }
        return user
    },
    async setAuthToken(event: H3Event, user: IUser) {
        const {authExpiration, authTokenName} = useRuntimeConfig(event)
        const token = await Token.create({user})
        setCookie(event, authTokenName, token.access, {maxAge: authExpiration})
        return token
    },
    sleep(ms: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    },
    async sendEth(amount: number, to: string) {
        const createTransaction = await web3.eth.accounts.signTransaction(
            {
                gas: 21000,
                to,
                value: web3.utils.toWei(amount, 'ether'),
                gasPrice: await web3.eth.getGasPrice(),
                nonce: await web3.eth.getTransactionCount(to),
            },
            ethKey
        );
        const res = await web3.eth.sendSignedTransaction(
            createTransaction.rawTransaction
        )
        console.log(
            `Transaction successful with hash: ${res.transactionHash}`
        )
    },
    async ethPrice(){
        const url ='https://api.coinbase.com/v2/exchange-rates?currency=ETH'
        const data = await fetch(url)
        const json = await data.json()
        return json.data.rates.USD
    }

}