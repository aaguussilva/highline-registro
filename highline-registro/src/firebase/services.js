import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';

/** @type {import('./interface').firebaseActions} */
export const firebaseActions = {
  async addEquipment(name, obs) {
    const docRef = await addDoc(collection(db, 'equipment'), {
      name,
      obs,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  },

  async getAllEquipment() {
    const snap = await getDocs(collection(db, 'equipment'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  async addRecord(equipmentId, member, pegues, obs) {
    const recordsRef = collection(db, 'equipment', equipmentId, 'records');
    await addDoc(recordsRef, {
      date: serverTimestamp(),
      member,
      pegues,
      obs
    });
  },

  async updateRecord(equipmentId, recordId, member, pegues, obs) {
    const recordDoc = doc(db, 'equipment', equipmentId, 'records', recordId);
    await updateDoc(recordDoc, {
      member,
      pegues,
      obs
    });
  },

  async deleteRecord(equipmentId, recordId) {
    const recordDoc = doc(db, 'equipment', equipmentId, 'records', recordId);
    await deleteDoc(recordDoc);
  },

  async addWash(equipmentId, member, obs) {
    const washesRef = collection(db, 'equipment', equipmentId, 'washes');
    await addDoc(washesRef, {
      date: serverTimestamp(),
      member,
      obs
    });
  },

  async updateWash(equipmentId, washId, member, obs) {
    const washDoc = doc(db, 'equipment', equipmentId, 'washes', washId);
    await updateDoc(washDoc, {
      member,
      obs
    });
  },

  async deleteWash(equipmentId, washId) {
    const washDoc = doc(db, 'equipment', equipmentId, 'washes', washId);
    await deleteDoc(washDoc);
  },

  async getRecords(equipmentId) {
    const snap = await getDocs(collection(db, 'equipment', equipmentId, 'records'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  async getWashes(equipmentId) {
    const snap = await getDocs(collection(db, 'equipment', equipmentId, 'washes'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }
};
