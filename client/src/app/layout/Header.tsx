import {AppBar, Switch, Toolbar} from "@mui/material";
import {Typography} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import FlareIcon from "@mui/icons-material/Flare";

interface Props {
  darkMood: boolean;
  handleThemeChange: () => void;
}

export default function Header({darkMood, handleThemeChange}: Props) {
  return (
    <AppBar position="static" sx={{mb: 4}}>
      <Toolbar>
        <Typography variant="h6">E-Store</Typography>
        <Switch
          color="info"
          checkedIcon={<Brightness4Icon />}
          checked={darkMood}
          onChange={handleThemeChange}
          icon={<FlareIcon />}
        />
      </Toolbar>
    </AppBar>
  );
}
