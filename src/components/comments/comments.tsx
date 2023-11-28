'use client';

import {useState} from "react";
import {signIn, useSession} from "next-auth/react";
import {createComment, deleteComment, updateComment} from "@/service/CommentService";
import Comment from "./comment"
import CommentForm from "@/components/comments/commentForm";
import Styles from "./comments.module.css"

interface CommentsProps {
    commentsList: blogCommentType[]
    currUserId: string | undefined
    blogId: string
}

const Comments = ({commentsList, currUserId, blogId}: CommentsProps) => {
    const [comments, setComments] = useState<blogCommentType[]>(commentsList)
    const [activeComment, setActiveComment] = useState<{id: string, type: 'replying' | 'editing'} | null>(null)
    const { data : session} = useSession()

    const rootComments = comments.filter(
        (comment) => comment.parentId === null
    )

    function getReplies(commentId: string) {
        return comments
            .filter(comment => comment.parentId == commentId)
            .sort((a, b) =>
                new Date(a.createdAt).getTime() - new Date().getTime()
            )
    }

    function addComment(body: string, parentId: string | null) {

        if (session?.user != undefined) {
            const comment : blogCommentType = {
                id: 0,
                parentId: parentId,
                body: body,
                author: {id: 0, name: ""},
                createdAt: ""
            }
            createComment(blogId, comment, session.user.jwtToken)
                .then(comment => {
                    setComments([comment, ...comments])
                    setActiveComment(null)
                })
        } else {
            signIn().then(response => {
                console.log(response)

                // const comment : blogCommentType = {
                //     id: "0",
                //     parentId: parentId,
                //     body: body,
                //     author: {id: 0, name: ""},
                //     createdAt: ""
                // }
                // createComment(blogId, comment, ???)
                //     .then(comment => {
                //         setComments([comment, ...comments])
                //         setActiveComment(null)
                //         setBody("")
                //     })
            })
        }
    }

    function onUpdateComment(comment: blogCommentType) {
        const token = session?.user.jwtToken || "null";

        updateComment(comment, token)
            .then((data) => {
                const updatedComments = comments.map(prevComment => {
                    if (prevComment.id === data.id) {
                        console.log("SHOULD HAPPEN ONCE")
                        return data
                    }
                    return prevComment
                })
                console.log(updatedComments)
                setComments(updatedComments)
                setActiveComment(null)
            })
    }

    function onDeleteComment(commentId: string) {
        if (window.confirm("Are you sure you want to remove comment?")) {
            const token = session?.user.jwtToken || "null";

            deleteComment(commentId, token)
                .then(() => {
                    const updatedComments = comments.filter(
                        (comment) => comment.id.toString() != commentId
                    )
                    setComments(updatedComments)
                })
        }
    }

    return (
        <>
            <div className={Styles.comments}>
                <div className={Styles.commentsForm}>
                    {/*<div className={"comment__form-title"}>Write Comment</div>*/}
                    <CommentForm
                        submitLabel={"Write"}
                        handleSubmit={addComment}
                        hasCancelButton={false}
                    />
                </div>
                <div className={Styles.commentsContainer}>
                    {rootComments.map(rootComment=> (
                        <Comment
                            key={rootComment.id}
                            comment={rootComment}
                            replies={getReplies(rootComment.id.toString())}
                            currUserId={currUserId}
                            onDeleteComment={onDeleteComment}
                            onUpdateComment={onUpdateComment}
                            addComment={addComment}
                            activeComment={activeComment}
                            setActiveComment={setActiveComment}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Comments