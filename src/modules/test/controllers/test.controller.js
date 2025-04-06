const { supabase } = require("../../../configs/db.config");

exports.getAll = async (req, res) => {
  try {
    const { data, error } = await supabase.from('test').select('*');
    if (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}