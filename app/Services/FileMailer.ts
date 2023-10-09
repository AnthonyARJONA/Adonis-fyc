import Mail from '@ioc:Adonis/Addons/Mail'

export default class FileMailer {
  constructor(private mailer: typeof Mail) {}

  public async send(sender: string, receiver: string, filename: string) {
    await this.mailer.send((message) => {
      message
        .from(sender)
        .to(receiver)
        .subject('Nouveau fichier')
        .text('Vous avez reçu un nouveau fichier ' + 'http://localhost:3333/uploads' + filename)
    })
  }
}
