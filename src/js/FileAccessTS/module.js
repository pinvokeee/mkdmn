//FileAccessSystemAPIを使用する際にtypescriptだとうまくいかないので生JSから触るためヘルパー

export class FileAccessJSModule
{
        /**
     * 何故かtypescriptだとうまくいかないので生javascriptで選択ダイアログを表示する
     * @returns 取得したディレクトリハンドル
     */
    static showDirectoryPicker = async (options) =>
    {
        return window.showDirectoryPicker(options);
    }

    /**
     * 何故かtypescriptだとうまくいかないので生javascriptでディレクトリハンドルからエントリを取得する
     * @returns 取得したエントリ
     */
    static getFileEntriesFromDirectoryHandle = async (handle) =>
    {
        const entries = await handle.entries();
        return await handle.entries();
    }

    static showOpenFilePicker = async (option) =>
    {
        return await window.showOpenFilePicker(option);
    }

    static showSaveFilePicker = async (options) =>
    {
        // const opts = {
        //     types: [{
        //     description: 'htmlドキュメント',
        //     accept: {'text/html': ['.html']},
        //     }],
        // };

        return await window.showSaveFilePicker(options);
    }
}

