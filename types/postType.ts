export type PostType = {
  id: number
  title: string
  content: string
  hashtag: string
  attachments: string
  notification: string
  category_id: string
  category_name: string
  publication: string
  name: string
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
  group_id: string
}
