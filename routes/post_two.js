import PostModel from "../models/post.js"
import {Router} from 'express'

const router = Router()

router.get('/', async (req,res) => {
    await PostModel.find((err, docs) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json(docs)
        }
    }).countDocuments()
})

router.patch('/', async (req,res) => {
    try {
        const info = await PostModel.updateMany({}, { $set: { content: 'Another Update' } }, { new: true })
        res.status(200).json(info)        
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
})

router.delete('/:id', async (req,res) => {
    const { id } = req.params

    try {
        const info = await PostModel.deleteOne({ _id: id }, { new: true })
        res.status(200).json(info)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
})

router.delete('/', async (req,res) => {
    try {
        const info = await PostModel.deleteMany({}, { new: true })
        res.status(200).json(info)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
})

export default router