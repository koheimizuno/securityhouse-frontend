export type PostType = {
  id: number
  title: string
  content: string
  hashtag: string
  attachments: string
  notification: boolean
  category_id: number
  category_name: string
  publication: boolean
  name: string
  user_id: number
  user_name: string
  affiliation_name: string
  thumbnail: string
  type_id: number
  nice_flag: boolean
  like_count: number
  bookmark_flag: boolean
  comment_count: number
  created_at: string
}

export type PostType_Type = {
  id: number
  title: string
}
