import emailjs from "emailjs-com";

export function notifPermitRequest(values) {
    /* Send Email start */
    const templateParams = {
        name: values.name,
        type: values.type,
        reason: values.reason,
        from_date: values.from_date,
        to_date: values.to_date,
        total_days: values.total_days,
        work_date: values.work_date
    };

    emailjs
        .send(
            "gmail",
            "template_lWWmau5h",
            templateParams,
            "user_eSLT70utivabYk1qRYlEa"
        )
        .then(
            response => {
                console.log("SUCCESS!", response.status, response.text);
            },
            err => {
                console.log("FAILED...", err);
            }
        );
    /* Send Email End */
}

export function notifApprovePermit(values) {
    /* Send Email start */
    const templateParams = {
        name: values.name,
        type: values.type,
        reason: values.reason,
        from_date: values.from_date,
        to_date: values.to_date,
        total_days: values.total_days,
        work_date: values.work_date
    };

    emailjs
        .send(
            "gmail",
            "approvecutitemplate",
            templateParams,
            "user_eSLT70utivabYk1qRYlEa"
        )
        .then(
            response => {
                console.log("SUCCESS!", response.status, response.text);
            },
            err => {
                console.log("FAILED...", err);
            }
        );
    /* Send Email End */
}