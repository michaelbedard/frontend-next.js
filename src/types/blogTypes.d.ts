

declare module "blog-types" {
    interface common {
        id: string
    }

    interface blogInfoType extends common{
        path: string,
        createdAt: string,
        title: string,
        subtitle: string,
        tags: tagType[],
        author: authorType,
    }

    interface imageSourceType extends common {
        imageSource: string
    }


    interface blogType extends common {
        path: string,
        createdAt: string,
        title: string,
        subtitle: string,
        status: string,
        imageSource: string,
        introduction: string,
        body: string,
        conclusion: string,
        resources: resourceType[],
        tags: tagType[],
        author: authorType,
        faqs: faqType[]
        comments: blogCommentType[]
    }
}