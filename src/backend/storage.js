// storageService.js

import { createClient } from "@supabase/supabase-js";

class StorageService {
  constructor() {
    this.supabaseUrl = process.env.SUPABASE_URL;
    this.supabaseKey = process.env.SUPABASE_KEY;
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    this.bucketName = "complain-attachment";
  }

  async uploadFile(file) {
    try {
      const { data, error } = await this.supabase.storage
        .from(this.bucketName)
        .upload(`files/${file.name}`, file);

      if (error) {
        console.error(error);
        throw error;
      }
      console.log('Data: ', data)
      console.log('Url: ', data.path)
      return data.path; // Return the file key (URL) from Supabase Storage
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async downloadFile(filePath) {
    try {
      const { data, error } = await this.supabase.storage
        .from(this.bucketName)
        .download(filePath);

      if (error) {
        console.error(error);
        throw error;
      }

      // 'data' now contains the file content, you can handle it as needed
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteFile(filePath) {
    try {
      const { error } = await this.supabase.storage
        .from(this.bucketName)
        .remove([filePath]);

      if (error) {
        console.error(error);
        throw error;
      }

      console.log(`File at ${filePath} deleted successfully`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default StorageService;
