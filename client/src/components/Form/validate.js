const validate = (input) => {
    let errors = {};


    if (!input.name.trim()) {
        errors.name = "Name is required";
    } else if (/\d/.test(input.name)) {
        errors.name = "Name should not contain numbers";
    } else if (!/^[a-zA-Z0-9\s]+$/.test(input.name)) {
        errors.name = "Name should not contain special characters";
    }

    if (!input.image.trim()) {
        errors.image = "Image link is required";

    }else if (!/\.(jpg|png|gif)$/i.test(input.image)){ 
        errors.image = "The url is not valid";

    } else if (!input.summary) {
        errors.summary = "Summary is required";

    } else if (input.healthScore === "") {
        errors.healthScore = "Health Score is required";

    } else if (!input.diets.length) {
        errors.diets = "At least one diet must be selected";

    } else if (!input.steps.length) {
        errors.steps = "Steps are required";
    }

    return errors
}


export default validate;