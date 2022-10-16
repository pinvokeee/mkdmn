import { useState } from "react";
import { showSaveFilePicker } from "../js/FileAccessTS/fileAccess";

export interface IEditContext
{
    fileHandle : any,
    text : string,
    outHtmlSource : string,
    
    setHtmlSource: Function,
    onTextChange: Function,
    onSelectFile: Function,
    saveFile : Function,
    exportHtmlFile: Function,
}

export const useEditContext = () : IEditContext =>
{
    const [text, setText] = useState("");
    const [html, setHtml] = useState("");
    const [fileHandle, setFileHandle] = useState<any>(null);

    const setHtmlSource = (source : string) =>
    {
        setHtml(source);
    }

    const onTextChange = (newValue : string) =>
    {
        setText(newValue);
    }

    const onSelectFile = async (handle : any) =>
    {
        // const handle

        // const file = await handle.getFile();
        // const text = await file.text();

        // setText(text);
        // setFileHandle(handle);

        // console.log(text);
    }

    const saveFile = async () =>
    {
        if (fileHandle == null) return;
        const writable = await fileHandle.createWritable();
        await writable.write(text);
        await writable.close();
    }

    const exportHtmlFile = async () =>
    {
        // console.log(html);
        const handle = await showSaveFilePicker();
        // // handle.getFile().
        // const writable = await handle.createWritable();
        // await writable.write(html);
        // await writable.close();
    }

    return {
        fileHandle: fileHandle,
        text: text,
        outHtmlSource: html,

        setHtmlSource: setHtmlSource,
        onSelectFile: onSelectFile,
        onTextChange: onTextChange,
        saveFile: saveFile,
        exportHtmlFile : exportHtmlFile
    }
}