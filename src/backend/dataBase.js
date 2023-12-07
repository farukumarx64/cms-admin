import { createClient } from "@supabase/supabase-js";

export default class DataBase {
  constructor() {
    this.supabaseUrl = process.env.SUPABASE_URL;
    this.supabaseKey = process.env.SUPABASE_KEY;
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  async deleteRow(ticketID) {
    try {
      // Delete data using Supabase 'delete' method
      const { data, error } = await this.supabase
        .from("complainData")
        .delete()
        .eq("ticket", ticketID);

      if (error) {
        console.error("Error deleting data:", error);
      } else {
        console.log(`Deleted data for ticket ${ticketID}:`, data);
        return data;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async queryAll() {
    try {
      // Query data using Supabase 'select' method
      const { data, error } = await this.supabase
        .from("complainData")
        .select("*");

      if (error) {
        console.error("Error querying data:", error);
      } else {
        console.log("Fetched data:", data, typeof data);
        return data;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async queryData(ticketID) {
    try {
      // Query data using Supabase 'select' method with a filter for the ticketID
      const { data, error } = await this.supabase
        .from("complainData")
        .select("*")
        .eq("ticket", ticketID);

      if (error) {
        console.error("Error querying data:", error);
      } else {
        console.log(`Fetched data for ticket ${ticketID}:`, data);
        return data;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
