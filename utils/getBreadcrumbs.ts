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
          return { label: '新規登録', href: 'register', validSlug: true }
        case 'login':
          return { label: 'ログイン', href: 'login', validSlug: true }
        case 'profile':
          return { label: 'アカウント設定', href: 'profile', validSlug: false }
        case 'chatroom':
          return { label: 'トークルーム', href: 'chatroom', validSlug: false }
        case 'sh-room':
          return {
            label: 'SH会トークルーム',
            href: 'sh-room',
            validSlug: true
          }
        case 'work-room':
          return {
            label: '仕事トークルーム',
            href: 'work-room',
            validSlug: true
          }
        case 'exchange-room':
          return {
            label: '交流トークルーム',
            href: 'exchange-room',
            validSlug: true
          }
        case 'boss-room':
          return {
            label: '社長室トークルーム',
            href: 'boss-room',
            validSlug: true
          }
        case 'post':
          return {
            label: '投稿',
            href: 'post',
            validSlug: false
          }
        case 'create':
          return {
            label: '作成',
            href: 'create',
            validSlug: true
          }
        default:
          break
      }
      return item
    })
  return result
}
