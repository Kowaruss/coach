// sop/sop.js
import { db, collection, getDocs } from '../firebase.js';

export async function loadSOPs() {
    try {
        const querySnapshot = await getDocs(collection(db, "sops"));
        const sops = [];
        querySnapshot.forEach((doc) => {
            sops.push(doc.data());
        });
        return sops;
    } catch (error) {
        console.error("Ошибка загрузки СОПов:", error);
        return [];
    }
}
