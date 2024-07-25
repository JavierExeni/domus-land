export type System = {
  id: number;
  banner: string;
  header_logo: string;
  footer_logo: string;
  house_category_banner: string;
  building_category_banner: string;
  land_category_banner: string;
  store_category_banner: string;
  department_category_banner: string;
  shed_category_banner: string;
  shop_category_banner: string;
  office_category_banner: string;
  parking_category_banner: string;
  watermark_logo: string;
  facebook: string | null;
  instagram: string | null;
  linkedin: string | null;
  pinterest: string | null;
  twitter: string | null;
  tiktok: string | null;
  title: string | null;
}

export type SystemRequest = {
  banner: File;
  header_logo: File;
  footer_logo: File;
  house_category_banner: File;
  building_category_banner: File;
  land_category_banner: File;
  store_category_banner: File;
  department_category_banner: File;
  shed_category_banner: File;
  shop_category_banner: File;
  office_category_banner: File;
  parking_category_banner: File;
  watermark_logo: File;
  facebook: string | null;
  instagram: string | null;
  linkedin: string | null;
  pinterest: string | null;
  twitter: string | null;
  tiktok: string | null;
  title: string | null;
}
