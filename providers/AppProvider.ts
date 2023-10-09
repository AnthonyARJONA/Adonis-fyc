import { Ioc } from '@adonisjs/core/build/standalone'
import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import FileMailer from 'App/Services/FileMailer'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    this.app.container.singleton('FileMailer', (ioc: Ioc) => {
      return new FileMailer(ioc.resolveBinding('Adonis/Addons/Mail'))
    })
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
