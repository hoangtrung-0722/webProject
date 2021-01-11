const Category = require("../Category");

module.exports.get_categories = async () =>{
    return await Category.find();
}