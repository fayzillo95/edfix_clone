import { ConfigService } from "@nestjs/config";


export function urlGenerator(config : ConfigService,serverRot : string, param : string){
    const host = config.get<string>("HOST")
    const port = config.get<string>("PORT")
    const baseUrl = config.get<string>("APP_BASE_URL") || `htpp://${host}:${port}`
    const result = `${baseUrl}/api/${serverRot}/${param}`
    return result
}