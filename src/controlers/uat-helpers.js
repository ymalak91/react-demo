export async function checkAPIStatus(url) {
  let status = 0;
  try {
    const response = await fetch(url);
    status = response.status;
    return status;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}