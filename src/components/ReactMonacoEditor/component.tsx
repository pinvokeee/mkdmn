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
    
            // monaco.languages.registerInlineCompletionsProvider("markdown", {
            //     handleItemDidShow: () =>
            //     {
            //     },

            //     freeInlineCompletions: () =>
            //     {

            //     },

            //     provideInlineCompletions: ()=>
            //     {
            //         return {items: [{text: 'hellooooooo!'}]};
            //     }
            // });

            
                // provideInlineCompletions: (model, position) =>
                // {
                //     return {

                //     }
                // }

            // monaco.languages.registerCompletionItemProvider('markdown', {
            //     provideCompletionItems: (model, position, context) =>
            //     {
            //         context.triggerKind = monaco.languages.CompletionTriggerKind.Invoke;
            //         return {
            //             suggestions : []
            //         }
            //     },

            // });

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
                suggest: 
                {
                    showWords: false,
                },
                inlineSuggest: 
                {
                    enabled: false,
                }                     
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

    //-----------------------------------
    //画像をbase64として受け取るロジック

    let pastedRange : monaco.Range;

    const register_pasteEvent = () =>
    {        
        window.addEventListener("paste", async (e : any) =>
        {
            const img : any = await getPasteImageData(e.clipboardData);

            if (img != null)
            {
                const tag = `<img src="${img.base64}"></img>`;
                editor?.executeEdits("", [
                    {
                        range: pastedRange,
                        text: tag,
                    }
                ]);
            }
        });
    }

    const getPasteImageData = (pasteEventLiestener : any) =>
    {
        return new Promise((resolve, reject) =>
        {
            const f = pasteEventLiestener.files[0];
            if (f == null) resolve(null);
            
            const fr = new FileReader();
            // console.log(["image/png", "image/jpg", "image/jpeg", "image/gif"].find(a => a == f.type));

            fr.onload = ((e : any) =>
            {
                resolve(
                {
                    base64: e.target.result, 
                    type: "image"
                });
            });
    
            fr.readAsDataURL(f);
        });
    }

    const onDidPaste = (e : any) =>
    {
        pastedRange = e.range;
    }

	useEffect(() =>
    {
        if (editor == null) return ;
        editor.getModel()?.onDidChangeContent(onChangeContent);
        editor.onDidPaste(onDidPaste);

        register_pasteEvent();

    }, [editor]);


    useEffect(() =>
    {
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
