// @PostMapping("/private/createComment")
// public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto payload, @RequestParam int BLOG_ID) {
//
//
// @PutMapping("/private/updateComment")
// public ResponseEntity<CommentDto> updateComment(@RequestBody CommentDto payload) {
//
//
//     @DeleteMapping("/private/deleteComment")
//     public ResponseEntity<Void> deleteComment(@RequestParam int COMMENT_ID) {

import useAxios from "@/utils/axiosInterceptor";

//PRIVATE
export async function createComment(blogId : string, comment : commentType, token: string) : Promise<commentType> {
    const axiosInstance = await useAxios(token);
    const response = await axiosInstance.post("/private/createComment",
        comment,
    {
        params: {
            BLOG_ID: blogId
        }
    })

    console.log("createComment::" + JSON.stringify(response.data))
    return response.data === "" ? null : response.data
}

export async function updateComment(comment : commentType, token: string) : Promise<commentType> {
    const axiosInstance = await useAxios(token);
    const response = await axiosInstance.post("/private/updateComment", {
        payload: comment
    })

    console.log("updateComment::" + JSON.stringify(response.data))
    return response.data === "" ? null : response.data
}

export async function deleteComment(commentId : string, token: string) : Promise<commentType> {
    const axiosInstance = await useAxios(token);
    const response = await axiosInstance.post("/private/deleteComment", {
        params : {
            COMMENT_ID : commentId
        }
    })

    console.log("deleteComment::" + JSON.stringify(response.data))
    return response.data === "" ? null : response.data
}