import { fetchData } from '../models/api';

export const getData = async (setData, setError, setLoading) => {
  setLoading(true);
  try {
    const data = await fetchData();
    setData(data);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};