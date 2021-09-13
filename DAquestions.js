const poolHandler = require('./poolhandler.js');

const getIdiot = async (client) => {
    let attatched;

    ({ client, attatched } = await poolHandler.checkClient(client, attatched));

    return new Promise((resolve, reject) => {

        let sql = 'SELECT type, a.id, name, simple, statement, img1, answer, img2 from bmb_idiot AS a ' +
            'INNER JOIN bmb_type AS b ON a.type = b.id';

        client.query(sql)
            .then((result) => {

                resolve(result.rows)
            })
            .catch((err) => {
                console.log("getIdiotError: " + err)

            })
            .finally(() => {
                if (attatched) {
                    client.release(true);
                }
            });

    });

};

const getNever = async (client) => {
    let attatched;
    ({ client, attatched } = await poolHandler.checkClient(client, attatched));

    return new Promise((resolve, reject) => {
        let sql = 'SELECT type, a.id, name, img1, simple, statement from bmb_never AS a ' +
            'INNER JOIN bmb_type AS b ON a.type = b.id';
        client.query(sql)
            .then((result) => {
                resolve(result.rows)
            })
            .catch((err) => {
                console.log("getNeverError: " + err)
            })
            .finally(() => {
                if (attatched) {
                    client.release(true);
                }
            });
    });
};

const getIsAlive = async (client) => {
    let attatched;
    ({ client, attatched } = await poolHandler.checkClient(client, attatched));

    return new Promise((resolve, reject) => {
        let sql = 'SELECT type, a.id, name, simple, img1, answer, img2 from bmb_isalive AS a ' +
            'INNER JOIN bmb_type AS b ON a.type = b.id';
        client.query(sql)
            .then((result) => {
                resolve(result.rows)
            })
            .catch((err) => {
                console.log("GetIsAliveError: " + err)
            })
            .finally(() => {
                if (attatched) {
                    client.release(true);
                }
            });
    });
};

const getLikely = async (client) => {
    let attatched;
    ({ client, attatched } = await poolHandler.checkClient(client, attatched));

    return new Promise((resolve, reject) => {
        let sql = 'SELECT type, a.id, name, img1, simple, statement from bmb_likely AS a ' +
            'INNER JOIN bmb_type AS b ON a.type = b.id';
        client.query(sql)
            .then((result) => {
                resolve(result.rows)
            })
            .catch((err) => {
                console.log("getLikelyError: " + err)
            })
            .finally(() => {
                if (attatched) {
                    client.release(true);
                }
            });
    });
};

const getTypes = async (client) => {
    let attatched;
    ({ client, attatched } = await poolHandler.checkClient(client, attatched));

    return new Promise((resolve, reject) => {
        let sql = 'SELECT t.id, name, simple from bmb_type AS t';
        client.query(sql)
            .then((result) => {
                resolve(result.rows)
            })
            .catch((err) => {
                console.log("getTypesError: " + err)
            })
            .finally(() => {
                if (attatched) {
                    client.release(true);
                }
            });
    });
};

const getReally = async (client) => {
    let attatched;

    ({ client, attatched } = await poolHandler.checkClient(client, attatched));

    return new Promise((resolve, reject) => {

        let sql = 'SELECT type, a.id, name, simple, statement, img1, answer, img2 from bmb_really AS a ' +
            'INNER JOIN bmb_type AS b ON a.type = b.id';

        client.query(sql)
            .then((result) => {

                resolve(result.rows)
            })
            .catch((err) => {
                console.log("getReallyError: " + err)

            })
            .finally(() => {
                if (attatched) {
                    client.release(true);
                }
            });

    });

};

const getAllQuestions = async (client) => {

    let attatched;

    ({ client, attatched } = await poolHandler.checkClient(client, attatched));

    return new Promise((resolve, reject) => {

        const neverPromise = getNever(client)
        const idiotPromise = getIdiot(client);

        const likelyPromise = getLikely(client);
        const isAlivePromise = getIsAlive(client);
        const reallyPromise = getReally(client);

        Promise.all([neverPromise, idiotPromise, isAlivePromise, likelyPromise, reallyPromise])
            .then((results) => {

                resolve(results);
            })
            .catch((err) => {
                reject(err)
            })
            .finally(() => {
                if (attatched) {
                    client.release(true);
                }
            });

    })


}

const addNever = async (data, client) => {
    let attatched;
    ({ client, attatched } = await poolHandler.checkClient(client, attatched));

    if (data.img1) {
        let sql = 'INSERT INTO bmb_never (statement, img1) values ($1, $2) RETURNING id;';

        return new Promise((resolve, reject) => {

            client.query(sql, [data.statement, data.img1])
                .then((result) => {
                    resolve(result.rows[0])
                })
                .catch((err) => {
                    console.log("addNeverError: " + err)
                })
                .finally(() => {
                    if (attatched) {
                        client.release(true);
                    }
                });
        });
    }else {
        let sql = 'INSERT INTO bmb_never (statement) values ($1) RETURNING id;';

        return new Promise((resolve, reject) => {

            client.query(sql, [data.statement])
                .then((result) => {
                    resolve(result.rows[0])
                })
                .catch((err) => {
                    console.log("addNeverError: " + err)
                })
                .finally(() => {
                    if (attatched) {
                        client.release(true);
                    }
                });
        });

    }
};

const addLikely = async (data, client) => {
    let attatched;
    ({ client, attatched } = await poolHandler.checkClient(client, attatched));

    if(data.img1){
    let sql = 'INSERT INTO bmb_likely (statement, img1) values ($1, $2) RETURNING id;';

    return new Promise((resolve, reject) => {

        client.query(sql, [data.statement, data.img1])
            .then((result) => {
                resolve(result.rows[0])
            })
            .catch((err) => {
                console.log("addLikelyError: " + err)
            })
            .finally(() => {
                if (attatched) {
                    client.release(true);
                }
            });
    });
} else {
    let sql = 'INSERT INTO bmb_likely (statement) values ($1) RETURNING id;';

    return new Promise((resolve, reject) => {

        client.query(sql, [data.statement])
            .then((result) => {
                resolve(result.rows[0])
            })
            .catch((err) => {
                console.log("addLikelyError: " + err)
            })
            .finally(() => {
                if (attatched) {
                    client.release(true);
                }
            });
    });
}

};

const addIdiot = async (data, client) => {
    let attatched;
    ({ client, attatched } = await poolHandler.checkClient(client, attatched));

    let sql = 'INSERT INTO bmb_idiot (statement, img1, answer, img2) ' +
        'values ($1, $2, $3, $4) RETURNING id;';

    return new Promise((resolve, reject) => {

        client.query(sql, [data.statement, data.img1, data.answer, data.img2])
            .then((result) => {
                resolve(result.rows[0])
            })
            .catch((err) => {
                console.log("addIdiotError: " + err)
            })
            .finally(() => {
                if (attatched) {
                    client.release(true);
                }
            });
    });
};

const addReally = async (data, client) => {
    let attatched;
    ({ client, attatched } = await poolHandler.checkClient(client, attatched));

    let sql = 'INSERT INTO bmb_really (statement, img1, answer, img2) ' +
        'values ($1, $2, $3, $4) RETURNING id;';

    return new Promise((resolve, reject) => {

        client.query(sql, [data.statement, data.img1, data.answer, data.img2])
            .then((result) => {
                resolve(result.rows[0])
            })
            .catch((err) => {
                console.log("addReallyError: " + err)
            })
            .finally(() => {
                if (attatched) {
                    client.release(true);
                }
            });
    });
};

const addIsalive = async (data, client) => {
    let attatched;
    ({ client, attatched } = await poolHandler.checkClient(client, attatched));

    let sql = 'INSERT INTO bmb_isalive (img1, answer, img2) ' +
        'values ($1, $2, $3) RETURNING id;';

    return new Promise((resolve, reject) => {

        client.query(sql, [data.img1, data.answer, data.img2])
            .then((result) => {
                resolve(result.rows[0])
            })
            .catch((err) => {
                console.log("addIsAliveError: " + err)
            })
            .finally(() => {
                if (attatched) {
                    client.release(true);
                }
            });
    });
};

const addRandomImg = async (data, client) => {
    let attatched;
    ({ client, attatched } = await poolHandler.checkClient(client, attatched));

    let sql = 'INSERT INTO bmb_randomimg (url) values ($1) RETURNING id;';

    return new Promise((resolve, reject) => {

        client.query(sql, [data.url])
            .then((result) => {
                resolve(result.rows[0])
            })
            .catch((err) => {
                console.log("addRandomImgError: " + err)
            })
            .finally(() => {
                if (attatched) {
                    client.release(true);
                }
            });
    });
};

const getRandomImages = async (client) => {
    let attatched;
    ({ client, attatched } = await poolHandler.checkClient(client, attatched));

    return new Promise((resolve, reject) => {
        let sql = 'SELECT r.id, url from bmb_randomimg AS r';
        client.query(sql)
            .then((result) => {
                resolve(result.rows)
            })
            .catch((err) => {
                console.log("getRandomImagesError: " + err)
            })
            .finally(() => {
                if (attatched) {
                    client.release(true);
                }
            });
    });
};


module.exports = {
    getIdiot,
    getNever,
    getIsAlive,
    getLikely,
    getAllQuestions,
    getTypes,
    getReally,
    addNever,
    addLikely,
    addIdiot,
    addIsalive,
    getRandomImages,
    addRandomImg,
    addReally
}