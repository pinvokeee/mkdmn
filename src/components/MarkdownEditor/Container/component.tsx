import styled from "@emotion/styled";
import Context from "@mui/base/TabsUnstyled/TabsContext";
import { useCallback, useState } from "react";
import Split from "react-split";
import { IEditContext } from "../../../hooks/useEditContext";
import { ReactMonacoEditor } from "../../ReactMonacoEditor/component";
import { MarkdownView } from "../MarkdownViewer/component";

export interface IMarkdownEditorContainerProps
{
    context: IEditContext,
}

export const MarkDownEditorContainer = (props : IMarkdownEditorContainerProps) =>
{
    const onChange = (value : string, event : any) =>
    {
        props.context.onTextChange(value);
    }

    const onUpdateSource = (src : string) =>
    {
        props.context.setHtmlSource(src);
    }

    return (<>
            <FullContainer>
                <Split  cursor="col-resize" style={{ height: "100%", display: "flex" }} sizes={[50, 50]}             
                gutterSize={3}
                gutter={() => 
                { 
                    const g = document.createElement("div");
                    g.className = "gutter_style";
                    return g;
                }} 
                gutterStyle={() => ({})}>
                    <div>
                        <ReactMonacoEditor text={props.context.text} onChange={onChange}></ReactMonacoEditor>
                    </div>
                    <FullContainer>
                        <MarkdownView source={props.context.text} onUpdateSource={onUpdateSource}></MarkdownView>
                    </FullContainer>
                    
                </Split>

        </FullContainer>
    </>);
}

const FullContainer = styled.div`
    width: 100%;
    height: 100%;
`

const HContainer = styled.div`
    height: 100%;
`