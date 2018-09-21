// todo, documentar
export const hasErrorsForm = (formArray = []) => {

    let flag = false;

    for (let i = 0; i < formArray.length; i += 1) {

        const {pattern, value, type, required = true} = formArray[i];

        if (type === "divider" || !required) {

            continue;

        }

        if (required && typeof value === "undefined") {

            return true;

        }

        switch (type) {
            case "select":

                if (typeof value !== "object") {

                    flag = true;

                }
                break;

            case "checkbox":
                break;

            case "file":

                if (typeof value !== "object") {

                    flag = true;

                }

                break;

            case "date":

                if (typeof value === "undefined" ||
                    value === null ||
                    value.length === 0) {

                    flag = true;

                }
                break;

            default:

                if (pattern && !pattern.test(value)) {

                    flag = true;

                }

                break;

        }

    }

    return flag;

};