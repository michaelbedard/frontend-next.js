

type blogType = {
    id: number,
    path: string,
    createdAt: string,
    title: string,
    subtitle: string,
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