import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

type FetchDetailHook<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export const useFetchDetail = <T>(apiUrl: string, params: Record<string, any>): FetchDetailHook<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    try {
      const { data } = await axios.get(apiUrl, { params });
      setData(data);
      setLoading(false);
    } catch (err: any) {
      setError('データの取得に失敗しました。');
      setLoading(false);
    }
  }, [apiUrl, params]);

  useEffect(() => {
    if (params) {
      fetchDetail();
    } else {
      setError('パラメータが指定されていません。');
      setLoading(false);
    }
  }, [fetchDetail]);

  return { data, loading, error };
};

export type SearchableDataHook<T> = {
  data: T[];
  currentPage: number;
  totalPages: number;
  onSearch: (keyword: string) => void;
  setCurrentPage: (page: number) => void;
};

export function useSearchableData<T>(
  apiUrl: string,
  searchFields: (keyof T)[],
  itemsPerPage: number = 10
): SearchableDataHook<T> {
  const [data, setData] = useState<T[]>([]);
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 検索機能
  const onSearch = (keyword: string) => {
    setCurrentPage(1); // ページ番号をリセット
    const lowerKeyword = keyword.toLowerCase();
    const filtered = data.filter(item =>
      searchFields.some(field =>
        String(item[field]).toLowerCase().includes(lowerKeyword)
      )
    );
    setFilteredData(filtered);
  };

  // データ取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<T[]>(apiUrl);
        setData(response.data);
        setFilteredData(response.data);
      } catch (err: any) {
        console.error('データ取得エラー:', err);
      }
    };

    fetchData();
  }, [apiUrl]);

  // ページ数の計算
  useEffect(() => {
    if (itemsPerPage > 0) {
      setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
    } else {
      setTotalPages(1); // 全件表示時はページ数を 1 に設定
    }
  }, [filteredData, itemsPerPage]);

  // 現在のページに表示するデータ
  const paginatedData = itemsPerPage > 0
    ? filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : filteredData;

  return {
    data: paginatedData,
    currentPage,
    totalPages,
    onSearch,
    setCurrentPage,
  };
}

