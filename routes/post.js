import PostModel from "../models/post.js"
import { Router } from 'express'

const router = Router()

router.get('/', async (req,res) => {
    //inside first {} --> content: /hello/i, num: { $gte: 1 }
    await PostModel.find({}, 'content num', (err, docs) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json(docs)
        }
    }).sort({ num: 1 }).limit(4)
})

router.get('/:id', async (req,res) => {
    const { id } = req.params

    await PostModel.findOne({ _id: id }, (err, docs) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json(docs)
        }
    })
})

router.post('/', async (req,res) => {
    const { content, num } = req.body

    const post = new PostModel({ content, num })
    await post.save((err, docs) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json(docs)
        }
    }) 
})

router.delete('/:id', async (req,res) => {
    const { id } = req.params

    await PostModel.findOneAndDelete({ _id: id }, (err, docs) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json(docs)
        }
    })
})

router.patch('/:id', async (req,res) => {
    const { id } = req.params 
    const { content, num } = req.body 

    await PostModel.findOneAndUpdate({ _id: id }, { content, num }, (err, docs) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json(docs)
        }
    })
})

router.patch('/:id/set', async (req,res) => {
    const { id } = req.params
    try {        
        const info = await PostModel.updateOne({ _id: id }, { $set: { content: 'Modified' } }, { new: true })
        res.status(200).json(info)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
})

router.patch('/:id/inc', async (req,res) => {
    const { id } = req.params
    try {
        const info = await PostModel.updateOne({ _id: id }, { $inc: { num: 1 } }, { new: true })
        res.status(200).json(info)        
    } catch (error) {
        res.status(404).json({ msg: error.message })        
    }
})

router.patch('/:id/dec', async (req,res) => {
    const { id } = req.params
    try {
        const info = await PostModel.updateOne({ _id: id }, { $inc: { num: -1 } }, { new: true })
        res.status(200).json(info)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
})

router.patch('/', async (req,res) => {
    try {
        const info = await PostModel.updateMany({ num: { $lt: 10 } }, { $set: { content: 'New Update' } })
        res.status(200).json(info)        
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
})

router.put('/:id', async (req,res) => {
    const { id } = req.params 
    const { content, num } = req.body 
    
    await PostModel.findOneAndReplace({ _id: id }, { content, num }, (err, docs) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json(docs)
        }
    })
})

export default router