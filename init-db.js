db.createUser({
    user: "vilteros-api-user",
    pwd: "vilteros-api-drowssap-1996",
    role: [{
        role: "readWrite",
        db: 'vilteros-api'
    }]
});