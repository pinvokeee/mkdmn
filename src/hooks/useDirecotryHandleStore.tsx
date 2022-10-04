import { useState } from "react";
import { showSelectDirectoryPicker } from "../js/fileAccessJSHelper";

/**
 * ディレクトリ取得・管理するinterface
 */
export interface IUseDirecotryHandleStore
{
    /**
     * 取得したディレクトリハンドル(NULL許容型)
     */
    handle : FileSystemDirectoryHandle | null,

    /**
     * ディレクトリ選択画面を表示しhandleに格納する
     */
    showDirectoryPicker: Function 
}

/**
 * ディレクトリ取得・管理するカスタムフック
 * @returns 
 */
export const useDirecotryHandleStore = () : IUseDirecotryHandleStore =>
{
    /**
     * 選択したディレクトリのハンドルを保持するState
     */
    const [directoryHandle, setDirectoryHandle] = useState<FileSystemDirectoryHandle | null>(null);

    const getDirectoryHandle = () : FileSystemDirectoryHandle | null => directoryHandle;

    const showDirectoryPicker = async () : Promise<FileSystemDirectoryHandle> =>
    {
        const handle  = await showSelectDirectoryPicker();
        setDirectoryHandle(handle);
        return handle;
    }

    return {        
        handle: directoryHandle,
        showDirectoryPicker: showDirectoryPicker,        
    }
}