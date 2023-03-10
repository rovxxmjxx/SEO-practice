import Cookies from 'js-cookie'

export const TOKEN_KEY = 'access_token'

class Token {
  public getToken(key: string): string | null {
    return Cookies.get(key) || null
  }

  public setToken(key: string, token: string, expires: number): void {
    Cookies.set(key, token, { expires })
  }

  public clearToken(key: string): void {
    Cookies.remove(key)
  }
}

export default new Token()
