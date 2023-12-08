// supabaseDataProvider.js

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const convertDataProviderResponse = (response) => {
  if (response === undefined || response === null) {
    console.log("Response is undefined or null.");
    return {
      data: [],
      total: 0,
    };
  }

  console.log("Main response: ", response);

  // Convert the Supabase response to the format expected by React Admin
  return {
    data: response.data, // Add a unique identifier
    total: response.data.length, // Assuming the total count is the array length
  };
};

const getFileUrl = (filePath) => {
  return `${supabaseUrl}/storage/v1/object/public/${process.env.SUPABASE_COMPLAIN_ATTACHMENT}/${filePath}`;
};

const supabaseDataProvider = {
  getList: async (resource) => {
    const { data, error } = await supabase.from(resource).select("*");
    console.log(data);

    if (error) {
      throw new Error(error.message);
    }

    // Fetch file URLs for each record and add them to the response
    const dataWithFileUrls = await Promise.all(
      data.map(async (record) => {
        const fileUrl = JSON.parse(record.file).url; // Adjust this based on your data structure
        const fullFileUrl = getFileUrl(fileUrl);
        return { ...record, fileUrl: fullFileUrl };
      })
    );

    return convertDataProviderResponse({ data: dataWithFileUrls });
  },

  getOne: async (resource, params) => {
    const { data, error } = await supabase
      .from(resource)
      .select("*")
      .eq("id", params.id);
    if (error) {
      throw new Error(error.message);
    }
    console.log("getOne response: ", data[0]);
    const responseData = convertDataProviderResponse({ data: data[0] });
    const fileUrl = JSON.parse(data[0].file).url;
    responseData.data.fileUrl = getFileUrl(fileUrl); // Add fileUrl to the response
    return responseData;
  },

  getMany: async (resource, params) => {
    const { data, error } = await supabase
      .from(resource)
      .select("*")
      .in("id", params.ids);
    if (error) {
      throw new Error(error.message);
    }
    return convertDataProviderResponse({ data });
  },

  create: async (resource, params) => {
    console.log("create", resource, params.data.comment);
    try {
      const { data, error } = await supabase
        .from(resource)
        .upsert([params.data]);
      if (error) {
        throw new Error(error.message);
      }
      console.log({ data });
      return convertDataProviderResponse({ data });
    } catch (error) {
      console.error("Error in create method:", error);
      throw error;
    }
  },

  update: async (resource, params) => {
    console.log("update", resource, params);
    try {
      const { data, error } = await supabase
        .from(resource)
        .upsert([params.data]);
      if (error) {
        throw new Error(error.message);
      }
      return convertDataProviderResponse({ data });
    } catch (error) {
      console.error("Error in update method:", error);
      throw error;
    }
  },

  delete: async (resource, params) => {
    const { error } = await supabase
      .from(resource)
      .delete()
      .eq("id", params.id);
    if (error) {
      throw new Error(error.message);
    }
    return convertDataProviderResponse({ data: [] }); // React Admin expects a response
  },
};

export default supabaseDataProvider;
