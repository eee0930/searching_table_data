export const fetchDataList = async () => {
  try {
      const response = await fetch("/assets/data/data.json");
      const data = await response.json();
      return data;
  } catch(e) {
      console.log(e);
      return;
  }
}  
