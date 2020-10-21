declare module namespace {

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

}
