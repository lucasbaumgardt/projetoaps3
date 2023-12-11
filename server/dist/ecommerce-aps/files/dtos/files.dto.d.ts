/// <reference types="node" />
export declare class FilesCreateDTO {
    id: number;
    fileName: string;
    fileData: Buffer;
    contentLength: number;
    contentType: string;
    url: string;
}
