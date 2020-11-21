export interface MemeDetails {
    title: string
    id: string
    url: string
    tags: string[],
    author?: {
        displayName: string,
        avatarUrl: string
    }
}  