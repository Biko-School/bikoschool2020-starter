export interface Original {
    width: string;
    height: string;
    url: string;
}

export interface Small {
    width: string;
    height: string;
    url: string;
}

export interface Images {
    original: Original;
    small: Small;
}

export interface Meme {
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

export interface MemePruebas {
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

export interface MemeWeight {
    meme: Meme;
    weight: number;
}

export const aMeme = (data: MemePruebas): Meme => {
    let myMeme: Meme = {
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
        
    myMeme = {...myMeme, ...data}
    return myMeme

}
