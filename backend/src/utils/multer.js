import multer from "multer";

export const fileType = {
    image: ['image/png', 'image/jpeg', 'image/webp'],
    pdf: ['application/pdf']
}

function fileUpload(customTypes = []) {
    const storage = multer.diskStorage({});

    function fileFilter(req, file, cb) {
        if (customTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid format'), false);
        }
    }

    const upload = multer({ fileFilter, storage });

    return upload;
}

export default fileUpload;