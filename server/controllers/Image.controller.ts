import Image from './../models/Image'
import {Request, Response} from 'express'

export const getImages = async (req: Request, res : Response) => {
    try{
      const images = await Image.find()
      return res.status(200).json({data : images})
    }catch(err){
        return res.status(500).send({err})
    }
}

export const getImageById = async (req: Request,res: Response) => {
    const id = req.params.id
    try{
        const image = await Image.findOne({_id : id})
        if(!image) return res.status(404).send({err: "Image not found"})
        return res.status(200).json({data: image})
    }catch(err){
        return res.status(500).send({err})
    }
}

export const postImage = async (req : Request,res: Response) : Promise<Response> => {
    let image = req.file.filename
    try{
        const img = new Image({image})
        const data = await img.save() 
        return res.status(201).json({data})
    }catch(err){
        console.log(err)
        return res.status(500).send({err});
    }
}


export const updateImageById = async (req: Request, res : Response) => {
    const id = req.params.id
    let image = req.file.filename
    try{
        const updateImage = await Image.findByIdAndUpdate({_id: id}, {image: image}) 
        if(!updateImage) return res.status(404).send({err: "Image not found"})
        return res.status(200).send({msg: "Image updated successfully"})
    }catch(err){
        return res.status(500).send({err})
    }
}

export const deleteImageById = async (req: Request, res : Response) => {
    const id = req.params.id
    try{
        const image = await Image.findByIdAndDelete({_id:id}) 
        if(!image) return res.status(404).send({err: "Image not found"})
        return res.status(204).send({msg: "Image deleted successfully"})
    }catch(err){
        return res.status(500).send({err})
    }
}