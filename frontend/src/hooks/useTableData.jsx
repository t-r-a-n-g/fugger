import { useEffect, useState } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
} from "recoil";

import { monthRangeWithMonthBeginning } from "@recoil/monthRange";

import categoriesAtom, { categoriesWithRowData } from "@recoil/categories";
import subcategoriesAtom, {
  subcategoriesWithRowData,
} from "@recoil/subcategories";
import datevAccountsAtom, {
  datevAccountsWithRowData,
} from "@recoil/datevAccounts";

import tableDataAtom from "@recoil/tableData";

import Api from "@services/Api";

function useTableData({ table }) {
  const monthRange = useRecoilValue(monthRangeWithMonthBeginning(table));

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const setCategories = useSetRecoilState(categoriesAtom(table));
  const setSubcategories = useSetRecoilState(subcategoriesAtom(table));
  const setDatevAccounts = useSetRecoilState(datevAccountsAtom(table));

  const [categoryRows, setCategoryRows] = useRecoilState(
    categoriesWithRowData(table)
  );
  const [subcategoryRows, setSubcategoryRows] = useRecoilState(
    subcategoriesWithRowData(table)
  );
  const [datevRows, setDatevRows] = useRecoilState(
    datevAccountsWithRowData(table)
  );

  const headers = useRecoilValue(tableDataAtom({ table, type: "headers" }));

  const resetCategoryRows = useResetRecoilState(
    tableDataAtom({ table, type: "category" })
  );
  const resetSubcategoryRows = useResetRecoilState(
    tableDataAtom({ table, type: "subcategory" })
  );
  const resetDatevRows = useResetRecoilState(
    tableDataAtom({ table, type: "datevAccount" })
  );

  useEffect(() => {
    setIsLoading(true);
  }, [monthRange]);

  // use seperate hook for clean UI updates
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const [from, to] = monthRange;

        const route = table === "budgets" ? "budgets" : null;
        const res = await Api.analysis.get({ from, to }, route);

        setCategories(res.data.categories);
        setSubcategories(res.data.subcategories);
        setDatevAccounts(res.data.datevAccounts);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    if (isLoading === true) {
      fetchTableData();

      resetCategoryRows();
      resetSubcategoryRows();
      resetDatevRows();
    }
  }, [isLoading]);

  return {
    setIsLoading,
    isLoading,
    error,
    categoryRows,
    setCategoryRows,
    subcategoryRows,
    setSubcategoryRows,
    datevRows,
    setDatevRows,
    headers,
  };
}

export default useTableData;
