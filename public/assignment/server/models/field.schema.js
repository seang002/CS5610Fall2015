module.exports = function(mongoose) {
    var fieldSchema = mongoose.Schema({
        "label": String,
        "type": {
            type: String,
            enum: ["TEXT", "TEXTAREA", "RADIO", "CHECKBOX", "SELECT", "DATE"]
        },
        "options": [{
            "label": String,
            "value": String
        }],
        "placeholder": String
    });

    return fieldSchema;
}