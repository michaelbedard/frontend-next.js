import CommentForm from "@/components/comments/commentForm";
import Styles from "./comments.module.css"

interface CommentProps {
    comment: commentType
    replies: commentType[]
    currUserId: string | undefined
    onDeleteComment: (commentId: string) => void
    onUpdateComment: (comment: commentType) => void
    addComment: (body: string, parentId: string | null) => void
    activeComment: {id: string, type: 'replying' | 'editing'} | null
    setActiveComment: (activeComment: {id: string, type: 'replying' | 'editing'} | null) => void
    parentId ?: string
}

const Comment = ({comment, replies, currUserId, onDeleteComment, onUpdateComment, addComment, activeComment, setActiveComment, parentId}: CommentProps) => {
    const fiveMinutes = 300000;
    const timePassed =  new Date().getTime() - new Date(comment.createdAt).getTime() > fiveMinutes;
    const canReply = Boolean(currUserId) //CHANGE
    const canEdit = (currUserId && currUserId == comment.author.id.toString() && !timePassed)
    const canDelete = (currUserId && currUserId == comment.author.id.toString() && !timePassed)
    const createdAt = new Date(comment.createdAt).toLocaleDateString()

    const isReplying = activeComment && activeComment.type === 'replying' && activeComment.id === comment.id.toString()
    const isEditing = activeComment && activeComment.type === 'editing' && activeComment.id === comment.id.toString()
    const replyId = parentId ? parentId : comment.id

    return (
        <div className={Styles.comment}>
            <div className={Styles.commentRightPart}>
                <div className={Styles.commentContent}>
                    <div className={Styles.commentContentInfo}>
                        <img className={Styles.commentImg} src={"../../../assets/user.png"} alt={"user icon"}/>
                        <div className={Styles.commentAuthor}>{comment.author.name}</div>
                        <div className={Styles.commentCreatedAt}>{createdAt}</div>
                        <div className={Styles.commentContentActions}>
                            {canReply &&
                                <div
                                    className={Styles.commentContentAction}
                                    onClick={() => setActiveComment(
                                        {id: comment.id.toString(), type: 'replying'}
                                    )}
                                >
                                    Reply
                                </div>
                            }
                            {canEdit &&
                                <div
                                    className={Styles.commentContentAction}
                                    onClick={() => setActiveComment(
                                        {id: comment.id.toString(), type: 'editing'}
                                    )}
                                >
                                    Edit
                                </div>
                            }
                            {canDelete &&
                                <div
                                    className={Styles.commentContentAction}
                                    onClick={() => onDeleteComment(comment.id.toString())}
                                >
                                    Delete
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {isEditing ? (
                    <div>
                        <CommentForm
                            submitLabel={"Update"}
                            hasCancelButton={true}
                            handleSubmit={(text) => onUpdateComment({...comment, body: text})}
                            handleCancel={() => setActiveComment(null)}
                        />
                    </div>
                ) : (
                    <div className={Styles.commentText}>
                        {comment.body}
                    </div>
                )}
                {isReplying && (
                    <div>
                        <CommentForm
                            submitLabel={"Reply"}
                            hasCancelButton={true}
                            handleSubmit={(text) => addComment(text, replyId.toString())}
                            handleCancel={() => setActiveComment(null)}
                        />
                    </div>
                )}
                {replies.length > 0 && (
                    <div className={"replies"}>
                        {replies.map(reply => (
                            <Comment
                                key={reply.id}
                                comment={reply}
                                replies={[]}
                                currUserId={currUserId}
                                onDeleteComment={onDeleteComment}
                                onUpdateComment={onUpdateComment}
                                addComment={addComment}
                                activeComment={activeComment}
                                setActiveComment={setActiveComment}
                                parentId={comment.id.toString()}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Comment