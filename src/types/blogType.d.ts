

type blogType = {
    id: number,
    path: string,
    createdAt: string,
    title: string,
    subtitle: string,
    imageSource: string,
    tags: tagType[],
    author: authorType,
}