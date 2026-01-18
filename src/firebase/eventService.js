import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    query,
    where,
    Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './config';

/**
 * Subir imagen de banner a Firebase Storage
 * @param {File} file - Archivo de imagen
 * @param {string} eventId - ID del evento
 * @returns {Promise<string>} URL de descarga de la imagen
 */
export const uploadBanner = async (file, eventId) => {
    if (!file) return null;

    const timestamp = Date.now();
    const fileName = `${eventId}-${timestamp}.${file.name.split('.').pop()}`;
    const storageRef = ref(storage, `event-banners/${fileName}`);

    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
};

/**
 * Crear un nuevo evento en Firestore
 * @param {Object} eventData - Datos del evento
 * @param {File} bannerFile - Archivo de imagen del banner (opcional)
 * @returns {Promise<string>} ID del evento creado
 */
export const createEvent = async (eventData, bannerFile) => {
    try {
        let bannerUrl = null;

        // Generar ID temporal para el banner
        const tempId = `temp-${Date.now()}`;

        // Subir banner si existe
        if (bannerFile) {
            bannerUrl = await uploadBanner(bannerFile, tempId);
        }

        // Guardar evento en Firestore
        const docRef = await addDoc(collection(db, 'events'), {
            ...eventData,
            bannerUrl,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
        });

        return docRef.id;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
};

/**
 * Obtener todos los eventos de un mes específico
 * @param {number} year - Año
 * @param {number} month - Mes (0-11)
 * @returns {Promise<Array>} Array de eventos
 */
export const getEventsByMonth = async (year, month) => {
    try {
        const q = query(
            collection(db, 'events'),
            where('año', '==', year),
            where('mes', '==', month)
        );

        const snapshot = await getDocs(q);
        const events = {};

        snapshot.docs.forEach(doc => {
            const data = doc.data();
            const eventKey = `${data.año}-${data.mes}-${data.dia}`;

            if (!events[eventKey]) {
                events[eventKey] = [];
            }

            events[eventKey].push({
                id: doc.id,
                ...data
            });
        });

        return events;
    } catch (error) {
        console.error('Error getting events:', error);
        throw error;
    }
};

/**
 * Eliminar un evento de Firestore y su banner de Storage
 * @param {string} eventId - ID del evento
 * @param {string} bannerUrl - URL del banner (opcional)
 */
export const deleteEvent = async (eventId, bannerUrl) => {
    try {
        // Eliminar imagen de Storage si existe
        if (bannerUrl) {
            try {
                const storageRef = ref(storage, bannerUrl);
                await deleteObject(storageRef);
            } catch (error) {
                console.warn('Error deleting banner from storage:', error);
                // Continuar aunque falle la eliminación del banner
            }
        }

        // Eliminar documento de Firestore
        await deleteDoc(doc(db, 'events', eventId));
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
};

/**
 * Obtener todos los eventos (útil para migración)
 * @returns {Promise<Array>} Array de todos los eventos
 */
export const getAllEvents = async () => {
    try {
        const snapshot = await getDocs(collection(db, 'events'));
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting all events:', error);
        throw error;
    }
};
