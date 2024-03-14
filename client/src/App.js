import axios from "axios";
import { useState, useEffect } from "react";
const App = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3000");
        console.log(response.data[0].name);
        setData(response.data[0].name);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <div>First data's name:</div>
      {isLoading && <div>Loading data...</div>}
      <div>{data}</div>
    </div>
  );
};

export default App;
