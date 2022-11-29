const createRequest = (req) => {
    const cloneReq = {};
    for (let key in req) {
        if (req[key]) {
            cloneReq[key] = req[key];
        }
    }
    return cloneReq;
};

export default createRequest;
