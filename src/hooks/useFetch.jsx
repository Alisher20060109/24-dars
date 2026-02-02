import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useFetch({url , key}) {
    const getData = async () => {
    let res = await axios.get(`https://fakestoreapi.com/${url}`);
    return res;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: key,
    queryFn: getData,
  });
  return {data , isLoading, error};
}
