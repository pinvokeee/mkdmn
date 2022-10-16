import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { IUseDirecotryHandleStore } from "../../hooks/useDirecotryHandleStore";
import { IEditContext } from "../../hooks/useEditContext";
import { FileSystemDirectoryHandleEx, showDirectoryPicker } from "../../js/FileAccessTS/fileAccess";

export interface IAppToolBarProps
{
  context : IEditContext,
  // useDirecotryHandleStore : IUseDirecotryHandleStore,
  // useTemplatesStore : IUseTemplatesStore,
}

export const AppToolBar = (props : IAppToolBarProps) =>
{
    // const d = async () =>
    // {
    //   const handle : FileSystemDirectoryHandle  = await props.useDirecotryHandleStore.showDirectoryPicker();
    //   // props.useTemplatesStore.loadFromDirectory(handle);
    // }

    // const getDirectoryHandle = () : FileSystemDirectoryHandle | null =>
    // {
    //   return props.useDirecotryHandleStore.handle;
    // }

    // const getDirectroyName = () : string =>
    // {
    //   const handle = props.useDirecotryHandleStore?.handle;
    //   if (handle == null) return "";
    //   return handle.name;
    // }

    const openSourceFile = async () =>
    {
      const opt = {
        types: [
          {
            description: 'MarkdownSourceFile',
            accept: {
              'TextFile/*': ['.md', '.text']
            }
          },
        ],
      };

      const f : FileSystemDirectoryHandleEx = await showDirectoryPicker();

      for await (const [key, value] of f.entries())
      {
        console.log(key, value);
      }
    }

    const saveSourceFile = async () =>
    {
      props.context.saveFile();
      // props.context.onSelectFile(f);
    }


    const exportHtmlFile = async () =>
    {
      props.context.exportHtmlFile();
      // props.context.saveFile();
      // props.context.onSelectFile(f);
    }

    return (
        <AppBar position="relative" elevation={0}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton> */}
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>DOC</Typography> */}
          <Button onClick={ openSourceFile } color="inherit">{"ソース(*.md)を開く"}</Button>
          <Button onClick={ saveSourceFile } color="inherit">{"上書き保存"}</Button>
          <Button onClick={ exportHtmlFile } color="inherit">{"HTML形式でエクスポート"}</Button>
          {/* <Button onClick={ d } color="inherit">{getDirectroyName()}</Button> */}
        </Toolbar>
      </AppBar>
    );
}