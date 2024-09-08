import { z } from "zod";

const createHotelSchema = z.object({
  name: z.string().min(1, "Hotel name is required"),
  description: z.string().min(1, "Description is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  latitude: z.number().refine((lat) => lat >= -90 && lat <= 90, {
    message: "Invalid latitude",
  }),
  longitude: z.number().refine((lng) => lng >= -180 && lng <= 180, {
    message: "Invalid longitude",
  }),
  starRating: z
    .number()
    .min(1)
    .max(5, "Star rating must be between 1 and 5")
    .default(0)
    .optional(),
  amenities: z.array(z.string()).optional().default([]),
});

const updateHotelSchema = z.object({
  name: z.string().min(1, "Hotel name is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  address: z.string().min(1, "Address is required").optional(),
  city: z.string().min(1, "City is required").optional(),
  country: z.string().min(1, "Country is required").optional(),
  latitude: z
    .number()
    .refine((lat) => lat >= -90 && lat <= 90, {
      message: "Invalid latitude",
    })
    .optional(),
  longitude: z
    .number()
    .refine((lng) => lng >= -180 && lng <= 180, {
      message: "Invalid longitude",
    })
    .optional(),
  starRating: z
    .number()
    .min(1)
    .max(5, "Star rating must be between 1 and 5")
    .default(0)
    .optional(),
  amenities: z.array(z.string()).optional().default([]),
  images: z.array(z.string().url("Invalid image URL")).optional(),
});

const hotelSchema = {
  createHotelSchema,
  updateHotelSchema,
};

export default hotelSchema;
