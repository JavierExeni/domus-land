import { Property } from "./property.type";

export type PropertyGallery = {
  id: number;
  is_banner: boolean;
  file_watermark: string;
  file?: string;
  property: Property;
}
