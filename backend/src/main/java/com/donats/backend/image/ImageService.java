package com.donats.backend.image;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ImageService {

    private final Cloudinary cloudinary;

    public ImageService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public List<String> uploadImages(List<MultipartFile> files) {
        List<String> imageUrls = new ArrayList<>();

        for (MultipartFile file : files) {
            if (file != null && !file.isEmpty()) {
                try {
                    var uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());

                    String secureUrl = uploadResult.get("secure_url").toString();
                    imageUrls.add(secureUrl);
                } catch (IOException e) {
                    throw new ImageUploadException("Помилка завантаження зображення");
                }
            }
        }

        return imageUrls;
    }
}
