import { cardContentClasses, TextField } from "@mui/material";
import { render } from "@testing-library/react";
import { marked } from "marked";
import { ChangeEvent, createElement, FormEventHandler, useCallback, useEffect, useState } from "react"
import "./viewerstyle.css"
import Split from "react-split";
import styled from "@emotion/styled";
import { ReactMonacoEditor } from "../../ReactMonacoEditor/component";
import { CustomMarkedownParser } from "../../../markdown/CustomMarkedIt";
// import { CustomMarkedJs } from "../../../markdown/CustomMarkedJs";

export interface IMarkdownViewProps
{
    source : string,
    onUpdateSource : Function,
}

export const MarkdownView = (props : IMarkdownViewProps) =>
{
    const customMarked = new CustomMarkedownParser();
    const [frameElement, setFrameElement] = useState<HTMLIFrameElement | null>(null);

    const frameElementRef : any = useCallback((element : HTMLIFrameElement | null) =>
    {
        if (element == null) return;
        if (element.contentDocument == null) return;
        setFrameElement(element);
    }, []);

    useEffect(() =>
    {        
        if (frameElement != null && frameElement.contentDocument != null)
        {       
            const doc = previewHtml(props.source, frameElement);
            props.onUpdateSource(doc);
        }
    }, 
    [props.source])

    const previewHtml = async (source : string, frame : HTMLIFrameElement) =>
    {
       // const html = customMarked.parse(props.source);
 
        if (frame == null || frame.contentDocument == null) return ""; 

        const html = customMarked.parse(props.source);
        frame.contentDocument.head.innerHTML = `<style>${defaultStyle}</style>`;
        frame.contentDocument.body.innerHTML = html;

        const doc = `<html>${frame.contentDocument.documentElement.innerHTML}</html>`
        return doc;

        // customMarked.parse(props.source).then(html => 
        // {
        //     if (frame == null || frame.contentDocument == null) return ""; 

        //     frame.contentDocument.head.innerHTML = `<style>${defaultStyle}</style>`;
        //     frame.contentDocument.body.innerHTML = html;
    
        //     const doc = `<html>${frame.contentDocument.documentElement.innerHTML}</html>`
        //     return doc;
        // }); 
    }

    return (
        <MarkdownPreview>
            <FrameElement ref={frameElementRef} frameBorder="0" sandbox="allow-same-origin allow-pointer-lock allow-scripts allow-downloads">
            </FrameElement>
        </MarkdownPreview>
    )
}

const MarkdownPreview = styled.div`
    text-align: left;
    width: 100%;
    height: 100%;
`

const FrameElement = styled.iframe`
    width: 100%;
    height: 100%;
`

const defaultStyle = `
h1,h2,h3,h4,h5,h6
{
    border-bottom: 1px lightgray solid;
}

h1.error,h2.error,h3.error,h4.error,h5.error,h6.error
{
    background-color: lightyellow;
}


table
{
    border-collapse: collapse;
    border-color: gray;
}

table th
{
    padding: 6px 13px;
    font-weight: 600;
    border: 1px solid lightgray;
}

table td
{
    padding: 6px 13px;    
	border: 1px solid lightgray;
}

blockquote
{
	display: block;
	margin-block-start: 1em;
	margin-block-end: 1em;
	margin-inline-start: 40px;
	margin-inline-end: 40px;

    padding: 0 1em;
	color: gray;
	border-left: 0.25em solid lightblue;
}

div.note
{
    position: relative;
    padding: 4px;
    padding-left: 40px;
}

div.note:before
{
    content: "";
    display: inline-block;
    width: 16px;
    height: 16px;
    top: calc(4px + 16px);
    left: 16px;
    border-radius: 60%;
    position: absolute;
}

div.note:after
{
    display: inline-block;
    top: calc(4px + 16px);
    color: white;
    position: absolute;
    font-weight: bold;
    font-size: 9pt;
}

div.note.info
{
    background-color: #e3f7df;
}

div.note.info:before
{
    background-color: #55c500;
}

div.note.info:after
{
    content: "✓";
    left: 18px;
}

div.note.warn
{
    background-color: #fdf9e2;
}

div.note.warn:before
{
    background-color: #f7a535;
}

div.note.warn:after
{
    content: "!";
    left: 22px;
}

div.note.alert
{
    background-color: #feebee;
}

div.note.alert:before
{
    background-color: darkred;
}

div.note.alert:after
{
    content: "×";
    left: 19px;
}


.tooltip
{
    position: relative;
    cursor: pointer;
    display: inline-block;
}

.description
{
    display: none;
    position: absolute;
    padding: 10px;
    font-size: 12px;
    line-height: 1.6em;
    color: #fff;
    border-radius: 5px;
    background-color: #000000bd;
    width: auto;
    white-space: nowrap;
}

.tooltip:hover .description{
    display: inline-block;
    top: 30px;
    left: 0px;
}

hr
{
    background-color: gray;
    border: none;
    height: 1px;
}

code
{
    font-family: inherit;
    color: darkred;

}

`;