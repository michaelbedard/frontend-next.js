

export function isBlogInfoType(obj: any): obj is blogInfoType {
    return (
        typeof obj === 'object' &&
        'id' in obj &&
        'path' in obj &&
        'title' in obj &&
        'subtitle' in obj &&
        'createdAt' in obj &&
        'tags' in obj &&
        'author' in obj
    );
}