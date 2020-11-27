interface Original {
    width: string;
    height: string;
    url: string;
}

interface Small {
    width: string;
    height: string;
    url: string;
}

interface Images {
    original: Original;
    small: Small;
}

export interface MemeSchema {
    id: string;
    type: string;
    slug: string;
    giphyUrl: string;
    title: string;
    source_tld: string;
    source_post_url: string;
    import_datetime: string;
    username: string;
    images: Images;
    tags: string[];
}

export interface MemeSchemaPruebas {
    id?: string;
    type?: string;
    slug?: string;
    giphyUrl?: string;
    title?: string;
    source_tld?: string;
    source_post_url?: string;
    import_datetime?: string;
    username?: string;
    images?: Images;
    tags?: string[];
}

export const aMemeSchema = (data: MemeSchemaPruebas): MemeSchema => {
    let myMeme: MemeSchema = {
        id: "irrelevant",
        type: "irrelevant",
        slug: "irrelevant",
        giphyUrl: "irrelevant",
        title: "irrelevant",
        source_tld: "irrelevant",
        source_post_url: "irrelevant",
        import_datetime: "irrelevant",
        images: {
            original: {
                width: "0",
                url: "0",
                height: "0"
            },
            small: {
                width: "0",
                url: "0",
                height: "0"
            }
        },
        tags: ["irrelevant"],
        username: "irrelevant"
    }
    return myMeme
}