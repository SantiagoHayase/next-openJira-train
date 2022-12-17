import { ChangeEvent, useState, useContext } from "react";
import { Box, Button, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddCircleOutlineOutLinedIcon from "@mui/icons-material/AddCircleOutlineoutlined";
import { EntriesContext } from "../../context/entries/EntriesContext";
import { UIContext } from "../../context/ui/UIContext";

export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const [inputValue, setInputValue] = useState("");

  const [touched, setTouched] = useState(false);

  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
    setInputValue("");
    setIsAddingEntry(false);
    setTouched(false);
  };

  const cancel = () => {
    setIsAddingEntry(false), setTouched(false);
  };

  return (
    <Box sx={{ paddingX: 1 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            autoFocus
            placeholder="Nueva entrada"
            multiline
            label="Nueva entrada"
            helperText={inputValue.length <= 0 && touched && "Ingrese un valor"}
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={onTextFieldChanged}
            onBlur={() => setTouched(true)}
          />

          <Box display="flex" justifyContent="space-between">
            <Button variant="text" onClick={cancel}>
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Button
            startIcon={<AddCircleOutlineOutLinedIcon />}
            fullWidth
            variant="outlined"
            onClick={() => setIsAddingEntry(true)}
          >
            Agregar Tarea
          </Button>
        </>
      )}
    </Box>
  );
};
