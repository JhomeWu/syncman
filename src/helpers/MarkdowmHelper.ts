import { Collection, CollectionItem, CollectionRequest, CollectionRequestOptionBody, CollectionRequestOptionHeader } from "../types/collection"

class MarkdowmHelper {
    public static generate(collection: Collection): string {
        return `# Project: ${collection.info.name ?? ''}\n`
            + `${collection.info.description ?? ''}\n`
            + this.transformItems(collection.item, 2);
    }

    private static transformRequestHeaders(headers: Array<CollectionRequestOptionHeader>): string {
        return (!headers.length)
            ? ''
            :  `### Headers\n`
            + `|Content-Type|Value|\n`
            + `|---|---|\n`
            + headers.reduce((previous: string, header: CollectionRequestOptionHeader): string => {
                return previous + `|${header.key}|${header.value}|\n`
            }, '')
            + `\n`;
    }

    private static transformRequestBody(body: CollectionRequestOptionBody): string {
        return `### Request Example\n`
            + `\`\`\`json\n`
            + JSON.stringify(JSON.parse(body.raw), null, 2)
            + `\n`
            + `\`\`\`\n`
            + `\n`;
    }

    private static transformRequest(request: CollectionRequest): string {
        return `\n`
            + `## Request - ${request.name}\n`
            + `\n`
            + `\`${request.request.method ?? ''} ${request.request.url.raw ?? ''}\`\n`
            + `\n`
            + `${request.request.description ?? ''}`
            + this.transformRequestHeaders(request.request.header)
            + this.transformRequestBody(request.request.body)
            + `\n`

    }

    private static transformItems(items: Array<CollectionItem>, depth: number): string {
        let markdown = ''
        items.forEach((item: CollectionItem) => {
            if ('item' in item) {
                markdown += `${'#'.repeat(depth)} Folder - ${item.name} \n`
                markdown += this.transformItems(item.item, depth + 1)
            } else {
                markdown += this.transformRequest(item as CollectionRequest);
            }
        })

        return markdown
    }
}

export default MarkdowmHelper;