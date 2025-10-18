import ProductModel from "../models/Product.js"; 
import Joi from "joi";

// Hàm middleware validation tiện ích (Giữ nguyên)
const validateRequest = (schema) => (req, res, next) => {
    // ... logic validation (giữ nguyên)
};

// ====================================
// A. JOI VALIDATION SCHEMAS
// ====================================

// Schema Validation cho CREATE và UPDATE
const productSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            "any.required": "Tên sản phẩm là bắt buộc.",
            "string.min": "Tên phải có ít nhất 3 ký tự.",
            "string.max": "Tên không được vượt quá 255 ký tự.",
        }),
    
    // ĐÃ HOÀN THIỆN VALIDATION CHO GIÁ
    price: Joi.number()
        .min(0) // Giá trị phải lớn hơn hoặc bằng 0
        .required()
        .messages({
            "any.required": "Giá là bắt buộc.",
            "number.base": "Giá phải là số.",
            "number.min": "Giá phải lớn hơn hoặc bằng 0.", // Thông báo lỗi tùy chỉnh
        }),
    // END: VALIDATION GIÁ

    brand: Joi.string()
        .required()
        .messages({
            "any.required": "Thương hiệu là bắt buộc.",
        }),
        
    description: Joi.string()
        .optional()
        .allow("")
        .messages({
            "string.base": "Mô tả phải là chuỗi.",
        }),
});

