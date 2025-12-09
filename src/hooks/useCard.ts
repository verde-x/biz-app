import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { type Card } from "@/types/card";

export const useCard = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCards = useCallback(async () => {
    if (!userId) {
      setCards([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    try {
      const { data, error: supabaseError } = await supabase
        .from("cards")
        .select("*")
        .eq("user_id", userId);

      if (supabaseError) {
        console.log("Error fetching cards:", supabaseError);
        setCards([]);
        setError(supabaseError);
        return;
      }

      setCards(data);
      setError(null);
    } catch (err) {
      setCards([]);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const refetch = () => {
    fetchCards();
  };

  const addCard = useCallback(
    async (
      cardData: Omit<Card, "id" | "user_id" | "created_at" | "updated_at">
    ) => {
      if (!userId) {
        const error = new Error("User not authenticated");
        setError(error);
        return { success: false, error };
      }

      try {
        const { data, error: supabaseError } = await supabase
          .from("cards")
          .insert([
            {
              ...cardData,
              user_id: userId,
            },
          ])
          .select()
          .single();

        if (supabaseError) {
          console.log("Error adding card:", supabaseError);
          setError(supabaseError);
          return { success: false, error: supabaseError };
        }

        await fetchCards();
        return { success: true, data };
      } catch (err) {
        const error = err as Error;
        setError(error);
        return { success: false, error };
      }
    },
    [userId, fetchCards]
  );

  const updateCard = useCallback(
    async (
      cardId: string,
      cardData: Partial<
        Omit<Card, "id" | "user_id" | "created_at" | "updated_at">
      >
    ) => {
      if (!userId) {
        const error = new Error("User not authenticated");
        setError(error);
        return { success: false, error };
      }

      try {
        const { data, error: supabaseError } = await supabase
          .from("cards")
          .update(cardData)
          .eq("id", cardId)
          .eq("user_id", userId)
          .select()
          .single();

        if (supabaseError) {
          console.error("Error updating card:", supabaseError);
          setError(supabaseError);
          return { success: false, error: supabaseError };
        }

        await fetchCards();
        return { success: true, data };
      } catch (err) {
        const error = err as Error;
        setError(error);
        return { success: false, error };
      }
    },
    [userId, fetchCards]
  );

  const deleteCard = useCallback(
    async (cardId: string) => {
      if (!userId) {
        const error = new Error("User not authenticated");
        setError(error);
        return { success: false, error };
      }

      try {
        const { error: supabaseError } = await supabase
          .from("cards")
          .delete()
          .eq("id", cardId)
          .eq("user_id", userId);

        if (supabaseError) {
          console.error("Error deleting card:", supabaseError);
          setError(supabaseError);
          return { success: false, error: supabaseError };
        }

        await fetchCards();
        return { success: true };
      } catch (err) {
        const error = err as Error;
        setError(error);
        return { success: false, error };
      }
    },
    [userId, fetchCards]
  );

  return { cards, loading, error, refetch, addCard, updateCard, deleteCard };
};
