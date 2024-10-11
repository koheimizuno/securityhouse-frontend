export const getBreadcrumbs = (pathname: string) => {
  let result: any[] = pathname.split('/')
  result = result
    .filter(item => item !== '')
    .map(item => {
      if (item === 'profile') {
        return { label: 'アカウント設定', href: 'profile' }
      }
      switch (item) {
        case 'register':
          return { label: '新規登録', href: 'register', validPage: true }
        case 'login':
          return { label: 'ログイン', href: 'login', validPage: true }
        case 'profile':
          return { label: 'アカウント設定', href: 'profile', validPage: false }
        case 'chatroom':
          return { label: 'トークルーム', href: 'chatroom', validPage: false }
        case 'sh-club':
          return {
            label: 'SH会トークルーム',
            href: 'sh-club',
            validPage: true
          }
        default:
          break
      }
      return item
    })
  return result
}
