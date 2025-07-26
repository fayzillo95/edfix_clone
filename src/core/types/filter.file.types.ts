import { existsSync, mkdirSync } from "fs";
import { extname, join } from "path";

const imageExtensions = [
    '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg',
    '.tiff', '.ico', '.jfif', '.pjpeg', '.pjp', '.avif'
];

const videoExtensions = [
    '.mp4', '.avi', '.mov', '.mkv', '.flv', '.wmv', '.webm',
    '.mpeg', '.mpg', '.3gp', '.3g2', '.mts', '.m2ts', '.vob',
    '.ogv', '.ts', '.m4v'
];

const documentExtensions = [
    '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
    '.txt', '.rtf', '.odt', '.ods', '.odp', '.md', '.csv',
    '.json', '.xml', '.yml', '.yaml', '.epub'
];

const archiveExtensions = [
    '.zip', '.rar', '.7z', '.tar', '.gz', '.bz2', '.xz',
    '.iso', '.cab', '.lz', '.lzma', '.z', '.tgz', '.txz'
];

export function getPathInFileType(fileName: string) {
    const extract = extname(fileName).toLowerCase()
    let filePath = join(process.cwd(), "uploads", "unknown")
    
    if(imageExtensions.includes(extract)) {
        filePath = join(process.cwd(), "./uploads", "images")
    }
    if(videoExtensions.includes(extract)){
        filePath = join(process.cwd(), "./uploads", "videos")
    }
    if(documentExtensions.includes(extract)){
        filePath = join(process.cwd(), "./uploads", "docs")
    }
    if(archiveExtensions.includes(extract)){
        filePath = join(process.cwd(),"uploads","axrchive")
    }
    if (!existsSync(filePath)) {
        mkdirSync(filePath)
    }
    return filePath
}