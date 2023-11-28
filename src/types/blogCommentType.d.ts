

type blogCommentType = {
    id: number;

    parentId: string | null;

    body : string;

    author : authorType;

    createdAt : string;
}