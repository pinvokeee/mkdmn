import { TextField } from "@mui/material";
import { render } from "@testing-library/react";
import { marked } from "marked";
import AceEditor from "react-ace";
import { ChangeEvent, FormEventHandler, useState } from "react"
import "./style.css"
import "./viewerstyle.css"

export const MarkdownView = () =>
{
    const [source, setSource] = useState("");
    const [vhtml, setHtml] = useState({ __html: "" });
    
    const renderer = new marked.Renderer();

    renderer.code = (text, lang) =>
    {
        return `<pre>${text}</pre>`;
        // return `<pre class="${lang}"><code>${text}</code></pre>`;
    }

    renderer.heading = (text, level, raw) =>
    {
        const regex = /{{(?<NAME>.+?)}}/;
        const match   = raw.match(regex);
        const name = match && match.groups ? match.groups["NAME"] : "";

        if (name.length == 0) 
        {
            return `<h${level}><a id="${text}">${text}</a></h${level}>\n`;
        }

        const source = text.replace(regex, '').replace(/\s{2}/g, '<br>');

        return `<div class="note ${name}">${source}</div>`;
    }

    renderer.strong = (text) =>
    {
        const regex = /{{(?<DESCRIPTION>.+?)}}/;
        const match   = text.match(regex);
        const description = match && match.groups ? match.groups["DESCRIPTION"] : "";

        if (description.length == 0) return `<b></b>`

        // const text = text.replace(regex, '').replace(/\s{2}/g, '<br>');
        
        return `<div class="tooltip">${text.replace(regex, '')}<div class="description">${description}</div></div>`;
    }

    const getParsedHtml = () : any =>
    {
        return {__html: marked.parse(source, { renderer: renderer })};
    }

    const onInput = (value : string, event : any) =>
    {
        setSource(value);    
    }

    return (
        <>     
        <div className="mdp_container">
            <AceEditor fontSize={"12pt"}  value={source} onChange={onInput}></AceEditor>
            {/* <TextField className="mdp_sourceEditor" 
            multiline value={source} onChange={onInput}></TextField> */}
            <div className="marked_preview" 
            dangerouslySetInnerHTML={getParsedHtml()}></div>
        </div>

        </>
    )

}