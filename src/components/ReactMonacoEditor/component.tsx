import * as monaco from "monaco-editor";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { getMarkdownHighlightContext } from "./highlighter";
import "./style.css";

export interface IMonacoEditorProps
{
    text?: string,
    onChange? : Function,
}

export const ReactMonacoEditor = (Props : IMonacoEditorProps) =>
{
    const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    // const [text, setText] = useState<string>("");

    const editor_element : any = useCallback((element: HTMLDivElement | null) => 
    {
        if(element != null) 
        {
            monaco.languages.register({id: "markdown"});
            monaco.languages.setMonarchTokensProvider("markdown", getMarkdownHighlightContext());

            setEditor(monaco.editor.create(element,
			{
				value: "",
				automaticLayout: true,
				minimap: {
					enabled: false,
				},
                wordWrap: "on",
				// theme: 'vs-dark',
				language: "markdown",
                fontSize: 14,
			}));
        }
    }, []);

    const onChangeContent = (event : monaco.editor.IModelContentChangedEvent) =>
    {
        const newText : string = getText();
        Props?.onChange?.call(this, newText, event);
    }

    const getText = () : string =>
    {
        const value = editor?.getModel()?.getValue();
        const text : string = value != null ? value : ""
        
        return text;
    }

    const setSourceText = (txt : string) =>
    {
        editor?.setValue(txt);
    }

	useEffect(() =>
    {
        if (editor == null) return ;
        editor.getModel()?.onDidChangeContent(onChangeContent);
    }, [editor]);


    useEffect(() =>
    {
        console.log(Props.text, getText());

        if (Props.text != getText())
        {
            const s : string = Props.text != null ? Props.text : "";
            editor?.setValue(s);
        }

        // if (Props?.text == null) 
        // {
        //     setText("");
        //     return;
        // }

        // // setText(Props?.text);

    }, [Props.text]);

    return (
        <div ref={editor_element} className="aaa">
            <div ></div>
        </div>
    )
}
