import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'
import crypto from 'crypto'
export default class FilesController {
  public async formulaire({ view }) {
    return view.render('formulaire')
  }

  public async upload({ request, response }: HttpContextContract) {
    const sender = request.input('sender')
    const receiver = request.input('receiver')
    const file = request.file('file', {
      size: '2mb',
      extnames: ['jpg', 'png', 'gif'],
    })

    if (!file) {
      return response.badRequest('File not uploaded')
    }
    if (file.isValid === false) {
      return response.badRequest('File not valid')
    }
    if (!sender && !receiver) {
      return response.badRequest('Sender or receiver not valid')
    }

    if (
      !sender.match(/^[a-z0-9._-]+@[a-z0-9._-]{2,}.[a-z]{2,4}$/i) ||
      !receiver.match(/^[a-z0-9._-]+@[a-z0-9._-]{2,}.[a-z]{2,4}$/i)
    ) {
      return response.badRequest('Sender or receiver is not valid')
    }

    await file.move(Application.publicPath('uploads'), {
      name: crypto.randomUUID() + '.' + file.extname,
    })

    await Database.table('files').insert({
      filename: file.fileName,
      sender,
      receiver,
    })

    return 'File uploaded successfully'
  }
}
