import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { type FinancialData } from "@/types/cashflow";

const getDefaultFinancialData = (): FinancialData =>
  ({
    currentAssets: {
      prev: {},
      current: {},
    },
    fixedAssets: {
      prev: {},
      current: {},
    },
    deferredAssets: {
      prev: {},
      current: {},
    },
    currentLiabilities: {
      prev: {},
      current: {},
    },
    fixedLiabilities: {
      prev: {},
      current: {},
    },
    equity: {
      prev: {},
      current: {},
    },
    incomeStatement: {},
    appropriation: {},
  } as FinancialData);

export const useCashFlow = (userId?: string) => {
  const [financialData, setFinancialData] = useState<FinancialData>(
    getDefaultFinancialData()
  );

  const [metadata, setMetadata] = useState<{
    id?: string;
    companyName?: string;
    fiscalYear?: string;
  }>({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // データ読み込み
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const { data: statements, error: fetchError } = await supabase
          .from("cash_flow_statements")
          .select("*")
          .eq("user_id", userId);

        if (fetchError) throw fetchError;

        if (statements && statements.length > 0) {
          const statement = statements[0];
          setFinancialData(statement.financial_data);
          setMetadata({
            id: statement.id,
            companyName: statement.company_name,
            fiscalYear: statement.fiscal_year,
          });
        } else {
          const { data: newStatement, error: insertError } = await supabase
            .from("cash_flow_statements")
            .insert({
              user_id: userId,
              company_name: "",
              fiscal_year: "",
              financial_data: getDefaultFinancialData(),
            })
            .select()
            .single();

          if (insertError) throw insertError;

          setFinancialData(newStatement.financial_data);
          setMetadata({
            id: newStatement.id,
            companyName: newStatement.company_name,
            fiscalYear: newStatement.fiscal_year,
          });
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  // 各セクションの更新関数
  const updateCurrentAssets = useCallback(
    (
      updater: (
        prev: FinancialData["currentAssets"]
      ) => FinancialData["currentAssets"]
    ) => {
      setFinancialData((prev) => ({
        ...prev,
        currentAssets: updater(prev.currentAssets),
      }));
    },
    []
  );

  const updateFixedAssets = useCallback(
    (
      updater: (
        prev: FinancialData["fixedAssets"]
      ) => FinancialData["fixedAssets"]
    ) => {
      setFinancialData((prev) => ({
        ...prev,
        fixedAssets: updater(prev.fixedAssets),
      }));
    },
    []
  );

  const updateDeferredAssets = useCallback(
    (
      updater: (
        prev: FinancialData["deferredAssets"]
      ) => FinancialData["deferredAssets"]
    ) => {
      setFinancialData((prev) => ({
        ...prev,
        deferredAssets: updater(prev.deferredAssets),
      }));
    },
    []
  );

  const updateCurrentLiabilities = useCallback(
    (
      updater: (
        prev: FinancialData["currentLiabilities"]
      ) => FinancialData["currentLiabilities"]
    ) => {
      setFinancialData((prev) => ({
        ...prev,
        currentLiabilities: updater(prev.currentLiabilities),
      }));
    },
    []
  );

  const updateFixedLiabilities = useCallback(
    (
      updater: (
        prev: FinancialData["fixedLiabilities"]
      ) => FinancialData["fixedLiabilities"]
    ) => {
      setFinancialData((prev) => ({
        ...prev,
        fixedLiabilities: updater(prev.fixedLiabilities),
      }));
    },
    []
  );

  const updateEquity = useCallback(
    (updater: (prev: FinancialData["equity"]) => FinancialData["equity"]) => {
      setFinancialData((prev) => ({
        ...prev,
        equity: updater(prev.equity),
      }));
    },
    []
  );

  const updateIncomeStatement = useCallback(
    (
      updater: (
        prev: FinancialData["incomeStatement"]
      ) => FinancialData["incomeStatement"]
    ) => {
      setFinancialData((prev) => ({
        ...prev,
        incomeStatement: updater(prev.incomeStatement),
      }));
    },
    []
  );

  const updateAppropriation = useCallback(
    (
      updater: (
        prev: FinancialData["appropriation"]
      ) => FinancialData["appropriation"]
    ) => {
      setFinancialData((prev) => ({
        ...prev,
        appropriation: updater(prev.appropriation),
      }));
    },
    []
  );

  // データ保存
  const saveData = useCallback(
    async (
      updatedData: FinancialData,
      companyName?: string,
      fiscalYear?: string
    ) => {
      try {
        setIsSaving(true);
        setError(null);

        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const recordId = metadata.id;
        if (!recordId) throw new Error("Record ID not found");

        const { error: updateError } = await supabase
          .from("cash_flow_statements")
          .update({
            financial_data: updatedData,
            ...(companyName && { company_name: companyName }),
            ...(fiscalYear && { fiscal_year: fiscalYear }),
            updated_at: new Date().toISOString(),
          })
          .eq("id", recordId);

        if (updateError) throw updateError;

        setFinancialData(updatedData);
        if (companyName) setMetadata((prev) => ({ ...prev, companyName }));
        if (fiscalYear) setMetadata((prev) => ({ ...prev, fiscalYear }));

        return recordId;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setIsSaving(false);
      }
    },
    [metadata.id]
  );

  // 自動保存（デバウンス付き）
  useEffect(() => {
    if (loading) return;
    if (!metadata.id) return;

    const timeoutId = setTimeout(() => {
      saveData(financialData).catch((err) => {
        console.error("Auto-save error:", err);
      });
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [financialData, loading, metadata.id]);

  return {
    // 各セクションのデータ
    currentAssets: financialData.currentAssets,
    fixedAssets: financialData.fixedAssets,
    deferredAssets: financialData.deferredAssets,
    currentLiabilities: financialData.currentLiabilities,
    fixedLiabilities: financialData.fixedLiabilities,
    equity: financialData.equity,
    incomeStatement: financialData.incomeStatement,
    appropriation: financialData.appropriation,

    // 更新関数
    updateCurrentAssets,
    updateFixedAssets,
    updateDeferredAssets,
    updateCurrentLiabilities,
    updateFixedLiabilities,
    updateEquity,
    updateIncomeStatement,
    updateAppropriation,

    // メタデータと状態
    metadata,
    loading,
    error,
    isSaving,
    saveData,
  };
};
