import React from 'react';
import { AppToolBar } from "../AppToolBar/component";
import { IUseDirecotryHandleStore, useDirecotryHandleStore } from '../../hooks/useDirecotryHandleStore';
import { MarkdownView } from '../MarkdownEditor/MarkdownViewer/component';
import { MarkDownEditorContainer } from '../MarkdownEditor/Container/component';
import { MainContainer } from '../MainContainer/component';
import { IEditContext, useEditContext } from '../../hooks/useEditContext';

export const AppContainer = () =>
{
    const context : IEditContext = useEditContext();
    
    // const chook_dirctoryHandle : IUseDirecotryHandleStore = useDirecotryHandleStore();
    // const chook_useTemplatesStore : IUseTemplatesStore = useTemplatesStore();
    // const chook_useTemplatesState : IUseTemplatesState = useTemplatesState();

    return (
        <>
        {/* <MonacoEditor></MonacoEditor> */}
        {/* <AppToolBar useDirecotryHandleStore={chook_dirctoryHandle}></AppToolBar> */}
        <AppToolBar context={context}></AppToolBar>
        <MainContainer>
            <MarkDownEditorContainer context={context}></MarkDownEditorContainer>
        </MainContainer>
        </>
    );
}