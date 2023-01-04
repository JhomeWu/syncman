export type CollectionItem = CollectionFolder | CollectionRequest;

export interface Collection {
    info: CollectionInfo
    item: Array<CollectionItem>
}

export interface CollectionInfo {
    name: string
    description?: string
}

export interface CollectionFolder {
    name: string
    item?: Array<CollectionItem>
}

export interface CollectionRequest {
    name: string
    request: CollectionRequestOption
    response: Array<CollectionResponseExample>
}

export interface CollectionRequestOption {
    method: string
    header: Array<CollectionRequestOptionHeader>
    body: CollectionRequestOptionBody
    url: CollectionRequestOptionUrl
    description?: string
}

export interface CollectionRequestOptionHeader {
    key: string| number
    value: string| number
}

export interface CollectionRequestOptionUrl {
    raw: string
    host: Array<string>
    path: Array<string>
}

export interface CollectionRequestOptionBody {
    mode: string
    raw: string
    options: any
}

export interface CollectionResponseExample {
    name: string
    method: string
}