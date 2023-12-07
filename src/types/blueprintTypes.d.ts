

declare module "blueprint-types" {
    interface blueprintCommon {
        id : string
    }

    interface blueprintInfoType extends blueprintCommon{
        path: string,
        createdAt: string,
        title: string,
        subtitle: string,
        tags: tagType[],
        author: authorType,
    }

    interface blueprintType extends blueprintCommon {
        title : string,
        subtitle : string,
        createdAt: string,
        imageSource: string,
        introduction: string,
        status: string,
        body: string,
        conclusion: string,
        resources: resourceType[],
        tags: tagType[],
        author: authorType,
        comments: blogCommentType[]
    }
}