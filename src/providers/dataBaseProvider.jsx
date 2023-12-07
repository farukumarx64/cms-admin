// supabaseDataProvider.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const convertDataProviderResponse = (response) => {
  response === null ? '' : console.log('main response: ', response.data[0])
  // Convert the Supabase response to the format expected by React Admin
  return {
    data: response.data, // Add a unique identifier
    total: response.data.length, // Assuming the total count is the array length
  };
};

const supabaseDataProvider = {
  getList: async (resource, params) => {
    const { data, error } = await supabase.from(resource).select('*');
    console.log(data)
    if (error) {
      throw new Error(error.message);
    }
    return convertDataProviderResponse({ data });
  },

  getOne: async (resource, params) => {
    const { data, error } = await supabase.from(resource).select('*').eq('id', params.id);
    if (error) {
      throw new Error(error.message);
    }
    console.log("getOne response: ", data)
    return convertDataProviderResponse({ data: data[0] });
  },

  getMany: async (resource, params) => {
    const { data, error } = await supabase.from(resource).select('*').in('id', params.ids);
    if (error) {
      throw new Error(error.message);
    }
    return convertDataProviderResponse({ data });
  },

  create: async (resource, params) => {
    const { data, error } = await supabase.from(resource).upsert([params.data]);
    if (error) {
      throw new Error(error.message);
    }
    return convertDataProviderResponse({ data });
  },

  update: async (resource, params) => {
    const { data, error } = await supabase.from(resource).upsert([params.data]);
    if (error) {
      throw new Error(error.message);
    }
    return convertDataProviderResponse({ data });
  },

  delete: async (resource, params) => {
    const { error } = await supabase.from(resource).delete().eq('id', params.id);
    if (error) {
      throw new Error(error.message);
    }
    return convertDataProviderResponse({ data: [] }); // React Admin expects a response
  },
};

export default supabaseDataProvider;
