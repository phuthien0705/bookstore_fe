const createFormDataRequest = (req) => {
    const cloneReq = {};
    for (let key in req) {
        if (req[key]) {
            cloneReq[key] = req[key];
        }
    }
    let formData = new FormData();
    for (let key in cloneReq) {
        if (Array.isArray(cloneReq[key])) {
            const arrayJson = JSON.stringify(cloneReq[key]);
            formData.append(key, arrayJson);
        } else {
            formData.append(key, cloneReq[key]);
        }
    }
    return formData;
};

export default createFormDataRequest;
