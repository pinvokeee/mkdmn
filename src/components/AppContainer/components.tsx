import React from 'react';
import MainContainer from "../MainContainer/component";
import { AppToolBar } from "../AppToolBar/component";
import { IUseDirecotryHandleStore, useDirecotryHandleStore } from '../../hooks/useDirecotryHandleStore';
import { Button } from '@mui/material';
import { MarkdownView } from '../markdownView/component';

export const AppContainer = () =>
{
    const chook_dirctoryHandle : IUseDirecotryHandleStore = useDirecotryHandleStore();
    // const chook_useTemplatesStore : IUseTemplatesStore = useTemplatesStore();
    // const chook_useTemplatesState : IUseTemplatesState = useTemplatesState();

    return (
        <>
        <AppToolBar useDirecotryHandleStore={chook_dirctoryHandle}></AppToolBar>
        <MainContainer>
            <MarkdownView></MarkdownView>
        </MainContainer>
        </>
    );
}