import { Schema, model, Model, Document } from 'mongoose';

export interface ImageInterface extends Document {
  image: string
  uploadServer: string
}

const ImageSchema = new Schema({
  image: {
    type: String,
    required: true,
    trim: true
  },
  uploadServer: {
    type: String,
    required: true,
    trim: true
  }
});

const ImageModel: Model<ImageInterface> = model('Image', ImageSchema);

export default ImageModel;
