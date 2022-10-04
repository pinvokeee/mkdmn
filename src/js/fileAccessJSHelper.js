//FileAccessSystemAPIを使用する際にtypescriptだとうまくいかないので生JSから触るためヘルパー

/**
 * 何故かtypescriptだとうまくいかないので生javascriptで選択ダイアログを表示する
 * @returns 取得したディレクトリハンドル
 */
export const showSelectDirectoryPicker = async  () =>
{
    return await window.showDirectoryPicker();
}

/**
 * 何故かtypescriptだとうまくいかないので生javascriptでディレクトリハンドルからエントリを取得する
 * @returns 取得したエントリ
 */
export const getFileEntriesFromDirectoryHandle = async (handle) =>
{
    const entries = await handle.entries();
    return await handle.entries();
}