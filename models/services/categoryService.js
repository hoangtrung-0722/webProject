const categories = require("../categorySchema");

module.exports.get_categories = async () =>{
    const category_list = await categories.find();
    return category_list;
}