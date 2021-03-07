import Image, { ImageInterface } from './../models/Image';
import { Request, Response } from 'express';

export const getImages = async (req: Request, res: Response): Promise<Response> => {
  try {
    const images = await Image.find();
    return res.status(200).json(images);
  } catch (err) {
    return res.status(500).send({ err });
  }
};

export const getImageById = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params.id;
  try {
    const image = await Image.findOne({ _id: id });
    if (!image) {
      return res.status(404).send({ err: 'Image not found' });
    }
    return res.status(200).json(image);
  } catch (err) {
    return res.status(500).send({ err });
  }
};

/**
 * Upload image to the server and save image url and type of saving
 * @param req
 * @param res
 */
export const postImage = async (req: Request, res: Response): Promise<Response> => {
  const image = req.file.filename;
  const uploadServer = 'server';
  try {
    const img: ImageInterface = new Image({ image, uploadServer });
    const data = await img.save();
    return res.status(201).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};


export const updateImageById = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params.id;
  const image = req.file.filename;
  try {
    const updateImage = await Image.findByIdAndUpdate({ _id: id }, { image: image });
    if (!updateImage) {
      return res.status(404).send({ err: 'Image not found' });
    }
    return res.status(200).send({ msg: 'Image updated successfully' });
  } catch (err) {
    return res.status(500).send({ err });
  }
};

export const deleteImageById = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params.id;
  try {
    const image = await Image.findByIdAndDelete({ _id: id });
    if (!image) {
      return res.status(404).send({ err: 'Image not found' });
    }
    return res.status(204).send({ msg: 'Image deleted successfully' });
  } catch (err) {
    return res.status(500).send({ err });
  }
};
