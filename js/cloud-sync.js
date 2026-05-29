(function () {
    const config = window.firebaseConfig || {};
    const placeholderRegex = /(TU_API_KEY|REPLACE_ME|000000000000)/i;
    const hasValidConfig = Boolean(config.apiKey && !placeholderRegex.test(config.apiKey));
    let firebaseInitPromise = null;
    let cachedClient = null;

    function ensureFirebaseReady() {
        if (!hasValidConfig || !window.firebase) {
            return Promise.resolve(null);
        }
        if (cachedClient) {
            return Promise.resolve(cachedClient);
        }
        if (firebaseInitPromise) {
            return firebaseInitPromise;
        }
        firebaseInitPromise = new Promise((resolve) => {
            try {
                const app = firebase.apps && firebase.apps.length ? firebase.app() : firebase.initializeApp(config);
                const auth = firebase.auth();
                const db = firebase.firestore();
                const storage = firebase.storage();
                let resolved = false;

                auth.onAuthStateChanged((user) => {
                    if (user && !resolved) {
                        resolved = true;
                        cachedClient = { app, auth, db, storage };
                        resolve(cachedClient);
                    }
                });

                auth.signInAnonymously().catch((err) => {
                    console.warn('Firebase anon auth failed', err);
                    resolve(null);
                });
            } catch (error) {
                console.error('Firebase init error', error);
                resolve(null);
            }
        });
        return firebaseInitPromise;
    }

    async function getClient() {
        const client = await ensureFirebaseReady();
        return client;
    }

    async function saveProforma(datos) {
        if (!datos || !datos.proformaId || !datos.html) {
            return;
        }
        const client = await getClient();
        if (!client) {
            return;
        }
        const user = client.auth.currentUser || {};
        if (!user.uid) {
            return;
        }

        const storagePath = `proformas/${user.uid}/${datos.proformaId}.html`;
        try {
            const blob = new Blob([datos.html], { type: 'text/html' });
            await client.storage.ref(storagePath).put(blob, { cacheControl: 'private,max-age=0' });
        } catch (error) {
            console.warn('No se pudo subir HTML a Firebase Storage', error);
        }

        try {
            const docId = `${user.uid}_${datos.proformaId}`;
            const payload = {
                userId: user.uid,
                proformaId: datos.proformaId,
                name: datos.name,
                total: datos.total || 0,
                cliente: datos.nombreCliente || '',
                vendedor: datos.nombreVendedor || '',
                lastUpdate: datos.lastUpdate || '',
                savedAt: datos.savedAt || new Date().toISOString(),
                tipo: datos.isAutoSave ? 'auto' : 'manual',
                storagePath,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            await client.db.collection('proformas').doc(docId).set(payload, { merge: true });
        } catch (error) {
            console.warn('No se pudo registrar metadata en Firestore', error);
        }
    }

    async function fetchProformas(tipo = 'auto') {
        const client = await getClient();
        if (!client) {
            return [];
        }
        const user = client.auth.currentUser || {};
        if (!user.uid) {
            return [];
        }
        try {
            const snapshot = await client.db.collection('proformas')
                .where('userId', '==', user.uid)
                .where('tipo', '==', tipo)
                .orderBy('updatedAt', 'desc')
                .limit(tipo === 'auto' ? 50 : 200)
                .get();
            return snapshot.docs.map((doc) => {
                const data = doc.data() || {};
                return {
                    ...data,
                    id: doc.id,
                    isRemote: true,
                    savedAt: data.savedAt || (data.updatedAt ? data.updatedAt.toDate().toISOString() : null),
                    lastUpdate: data.lastUpdate || '',
                    storagePath: data.storagePath,
                    total: data.total || 0,
                    name: data.name || 'Proforma remota'
                };
            });
        } catch (error) {
            console.warn('No se pudo leer proformas remotas', error);
            return [];
        }
    }

    async function downloadProformaHtml(item) {
        if (!item || !item.storagePath) {
            throw new Error('Falta storagePath para descargar la proforma.');
        }
        const client = await getClient();
        if (!client) {
            throw new Error('Firebase no está configurado.');
        }
        try {
            const url = await client.storage.ref(item.storagePath).getDownloadURL();
            const response = await fetch(url);
            return await response.text();
        } catch (error) {
            console.warn('No se pudo descargar la proforma remota', error);
            throw error;
        }
    }

    async function deleteRemoteProforma(item) {
        if (!item) {
            return;
        }
        const client = await getClient();
        if (!client) {
            return;
        }
        try {
            if (item.id) {
                await client.db.collection('proformas').doc(item.id).delete();
            }
        } catch (error) {
            console.warn('No se pudo borrar metadata remota', error);
        }
        if (item.storagePath) {
            try {
                await client.storage.ref(item.storagePath).delete();
            } catch (error) {
                console.warn('No se pudo borrar la proforma en Storage', error);
            }
        }
    }

    window.CloudSync = {
        isConfigured: function () {
            return !!(window.firebase && hasValidConfig);
        },
        saveProforma,
        fetchProformas,
        downloadProformaHtml,
        deleteRemoteProforma,
        ensureFirebaseReady
    };
})();
