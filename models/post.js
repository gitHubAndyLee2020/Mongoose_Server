import mongoose from 'mongoose' 

const postSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    num: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const PostModel = mongoose.model('PostModel', postSchema)

export default PostModel