// @flow
/**
 * Authentication layer.
 */
import { Express } from 'express'
import jwt from 'express-jwt'
import secret from './secret.json'

export default function(app: Express) {
  /**
   * Add a JSON Web Token middleware which validates received tokens
   * and terminates any which are expired.
   */
  app.use(jwt({ secret }))

  return app
}
