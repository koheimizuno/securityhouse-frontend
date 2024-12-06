type Column = {
  key: string
  label: string
}

type Action = {
  label: string
  onClick: (row: any) => void
}

export type TableProps = {
  columns: Column[]
  data: any[]
  actions?: Action[]
  baseUrl: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}