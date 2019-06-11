import { WebAuth } from 'auth0-js'

const PRODUCTION_HOSTNAME = 'https://app.graphqleditor.com/'

export const redirectUri = PRODUCTION_HOSTNAME

export const auth = new WebAuth({
  audience: 'https://graphqleditor.com/',
  clientID: 'yKOZj61N2Bih0AsOIn8qpI1tm9d7TBKM',
  domain: 'auth.graphqleditor.com',
  responseType: 'id_token',
  redirectUri,
  scope: 'openid profile',
})
