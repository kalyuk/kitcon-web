declare namespace NodeJS {
    interface Global {
        IS_BROWSER: boolean;
        IS_SSR: boolean;
        ROOT_PATH: string;
        PORT: number;
    }
}

declare module '*.svg' {
    const content: any;
    export default content;
}

declare module '*.scss' {
    const content: any;
    export = content;
}
