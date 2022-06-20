import React, { useState, useEffect } from "react";

import API from "@services/Api";
import AnTable from "./Table/AnTable";

function Analysis() {
  const [isLoading, setIsLoading] = useState(true);
  const [financeData, setFinanceData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await API.get("analysis", {
        from: "Jun/2022",
        to: "Jun/2022",
      });
      setFinanceData(res.data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (financeData === null) setIsLoading(true);
    else setIsLoading(false);
  }, [financeData]);

  if (isLoading) return "Loading data...";

  return <AnTable data={financeData} />;
}

export default Analysis;
