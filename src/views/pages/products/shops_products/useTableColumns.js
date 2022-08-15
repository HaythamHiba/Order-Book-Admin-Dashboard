import { useMemo } from "react";

import useCommonTableColumns from "../common/useTableColumns";

const useTableColumns = () => {

  const additionalColumns = useMemo(
    () => [
    
    ],
    []
  );

  return useCommonTableColumns({  additionalColumns });
};

export default useTableColumns;
