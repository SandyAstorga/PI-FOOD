const validate = (input) => {
    let errors = { hasErrors: false };


    if (!input.name.trim()) {
        errors.name = "Name is required";
        errors.hasErrors = true;
    } else if (/\d/.test(input.name)) {
        errors.name = "Name should not contain numbers";
        errors.hasErrors = true;
    } else if (!/^[a-zA-Z0-9\s]+$/.test(input.name)) {
        errors.name = "Name should not contain special characters";
        errors.hasErrors = true;
    }

    if (!input.image) {
        errors.image = "Image link is required";
        errors.hasErrors = true;
    } else if (!/\.(jpg|png|gif)$/i.test(input.image)) {
        errors.image = "The url is not valid";
        errors.hasErrors = true;

    }if (input.healthScore === "") {
        errors.healthScore = "Health Score is required";
        errors.hasErrors = true;
    }if (!input.diets || input.diets.length === 0) {
        errors.diets = "At least one diet must be selected";
        errors.hasErrors = true;
    } 

    return errors
}


export default validate;