import { unlinkSync } from "fs";
import { join } from "path";


export function unlinkFile(filename : string,directors : string[]){
    try {
        const fullPath = join(process.cwd(),...directors,filename)
        unlinkSync(fullPath)
    } catch (error) {
        console.log("File deltedted error",error)
    }
}