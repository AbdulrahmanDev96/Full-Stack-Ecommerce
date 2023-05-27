import {Search} from "@mui/icons-material";
import {alpha, Box, debounce, InputBase} from "@mui/material";
import theme from "../../theme/theme";
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {setProductParams} from "../../../features/catalog/catalogSlice";
import {useAppSelector, useAppDispatch} from "../../store/configureStore";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SearchForm({open, setOpen}: Props) {
  const {productParams} = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const dispatch = useAppDispatch();

  const debouncedSearch = debounce((event: any) => {
    dispatch(setProductParams({searchTerm: event.target.value}));
  }, 1000);

  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: (theme) => theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {backgroundColor: alpha(theme.palette.common.white, 0.25)},
        mr: 2,
        ml: 3,
      }}>
      <Box
        sx={{
          p: 2,
          height: "100%",
          position: "absolute",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Search />
      </Box>
      <Box component="form">
        <InputBase
          placeholder="Search..."
          sx={{
            color: "inherit",
            "& .MuiInputBase-input": {
              p: theme.spacing(1, 1, 1, 0),
              width: "25ch",
              pl: `calc(1em + ${theme.spacing(4)})`,
            },
          }}
          inputRef={searchRef}
          value={searchTerm || ""}
          onChange={(event: any) => {
            setSearchTerm(event.target.value);
            debouncedSearch(event);
          }}
        />
      </Box>
    </Box>
  );
}
