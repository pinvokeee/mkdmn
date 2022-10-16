import { FileAccessJSModule } from "./module";

export const showDirectoryPicker = (options? : FileAccessDirectoryPickerOptions) : Promise<FileSystemDirectoryHandleEx> =>
{
    return FileAccessJSModule.showDirectoryPicker(options);
}

export const showSaveFilePicker = (options? : FileAccessSaveFilePickerOptions) : Promise<any> =>
{
    return FileAccessJSModule.showSaveFilePicker(options);
}

export interface FileSystemDirectoryHandleEx extends FileSystemDirectoryHandle
{
    entries() : any;
}

export interface FileSystemDirectoryIterator extends AsyncIterator<FileSystemHandle[], FileSystemHandle[]>
{

}

export interface FileAccessSaveFilePickerOptions
{
    excludeAcceptAllOption : boolean,
    suggestedName : string,
    types : Array<FileAccessSaveFilePickerType>,
}

export interface FileAccessSaveFilePickerType
{
    description : string,
    accept : Object
}

export interface FileAccessDirectoryPickerOptions
{
    id : string, 
    mode : FileAccessMode,
    startIn : FileAccessDirectoryStartIn
}

export enum FileAccessMode
{
    read,
    readwrite,
}

export enum FileAccessDirectoryStartIn
{
    desktop,
    documents,
    downloads,
    music,
    pictures,
    videos
}

// export interface IFileSystemFileHandle extends FileSystemHandle
// {
//     getFile() : File,
//     createWritable(FileSystemCreateWritableOptions? : FileSystemCreateWritableOptions) : IFileSystemWritableFileStream,
// }

// export class FileSystemFileHandle implements IFileSystemFileHandle
// {
//     kind: FileSystemHandleKind;
//     name: string;

//     constructor()
//     {
//         this.kind = "";
//         this.name = "";
//     }

//     getFile(): File {
//         throw new Error("Method not implemented.");
//     }
//     createWritable(FileSystemCreateWritableOptions?: FileSystemCreateWritableOptions | undefined): IFileSystemWritableFileStream {
//         throw new Error("Method not implemented.");
//     }

//     isSameEntry(other: FileSystemHandle): Promise<boolean> {
//         throw new Error("Method not implemented.");
//     }

// }

// export interface FileSystemCreateWritableOptions
// {
//     keepExistingData : boolean,
// }

// export interface IFileSystemWritableFileStream extends WritableStream
// {
//     write() : Promise<undefined>,
// }

// export interface WriteData
// {
//     type : WriteDataType,
//     data : ArrayBuffer | TypedArray | DataView | Blob | String | string,
//     position : Number,
//     size: Number,
// }

// export type TypedArray = | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;

// export enum WriteDataType
// {
//     write,
//     seek,
//     truncate,
// }

// export interface IFileSystemHandle
// {
//     readonly kind : string,
//     readonly name : string,

//     isSameEntry(FileSystemHandle : FileSystemHandle) : boolean,
//     queryPermission(FileSystemHandlePermissionDescriptor : FileSystemHandlePermissionDescriptor): PermissionStatus
//     requestPermission(FileSystemHandlePermissionDescriptor : FileSystemHandlePermissionDescriptor): PermissionStatus
// }

// export interface FileSystemHandlePermissionDescriptor
// {
//     mode : FileSystemHandlePermissionDescriptorMode
// }

// export enum FileSystemHandlePermissionDescriptorMode
// {
//     read,
//     readwrite,
// }

// export enum PermissionStatus
// {
//     granted,
//     denied,
//     prompt
// }