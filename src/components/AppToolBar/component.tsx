import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { IUseDirecotryHandleStore } from "../../hooks/useDirecotryHandleStore";

interface Props
{
  useDirecotryHandleStore : IUseDirecotryHandleStore,
  // useTemplatesStore : IUseTemplatesStore,
}

export const AppToolBar = (props : Props) =>
{
    const d = async () =>
    {
      const handle : FileSystemDirectoryHandle  = await props.useDirecotryHandleStore.showDirectoryPicker();
      // props.useTemplatesStore.loadFromDirectory(handle);
    }

    const getDirectoryHandle = () : FileSystemDirectoryHandle | null =>
    {
      return props.useDirecotryHandleStore.handle;
    }

    const getDirectroyName = () : string =>
    {
      const handle = props.useDirecotryHandleStore?.handle;
      if (handle == null) return "";
      return handle.name;
    }

    return (
        <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          <Button onClick={ d } color="inherit">{getDirectroyName()}</Button>
        </Toolbar>
      </AppBar>
    );
}