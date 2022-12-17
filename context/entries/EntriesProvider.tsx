import { useReducer, useEffect } from "react";

import { entriesApi } from "../../apis";
import { Entry } from "../../interfaces";

import { EntriesContext, entriesReducer } from "./";
import { useSnackbar } from "notistack";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>("/entries", { description });
    dispatch({ type: "[Entry] - Add-Entry", payload: data });
  };

  const deleteEntry = async ({ _id }: Entry) => {
    await entriesApi.delete<Entry>(`/entries/${_id}`);

    const { data } = await entriesApi.get<Entry[]>("/entries");

    dispatch({ type: "[Entry] - Refresh-Data", payload: data });

    enqueueSnackbar("Entrada borrada", {
      variant: "error",
      autoHideDuration: 1500,
      anchorOrigin: { vertical: "top", horizontal: "right" },
    });
  };

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnackbar = false
  ) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description: description,
        status: status,
      });
      dispatch({ type: "[Entry] - Entry-Updated", payload: data });

      if (showSnackbar) {
        enqueueSnackbar("Entrada actualizada", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    dispatch({ type: "[Entry] - Refresh-Data", payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
        deleteEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
