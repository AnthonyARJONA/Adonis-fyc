import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'

export default class FilesController {
  public async formulaire({ view }) {
    return view.render('formulaire')
  }

  public async upload({ request, response }: HttpContextContract) {
    const file = request.file('file', {
      size: '2mb',
      extnames: ['jpg', 'png', 'gif'],
    })

    if (file) {
      if (file.isValid === false) {
        return response.badRequest('File not valid')
      }

      await file.move(Application.tmpPath('uploads'))
      return 'File uploaded successfully'
    }

    return response.badRequest('File not uploaded')
  }
}
