// src/services/productService.js
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc 
} from "firebase/firestore";

// إضافة منتج جديد
export const addProduct = async (product) => {
  try {
    const docRef = await addDoc(collection(db, "products"), product);
    return { id: docRef.id, ...product };
  } catch (error) {
    console.error("Error adding product: ", error);
    throw error;
  }
};

// جلب جميع المنتجات
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting products: ", error);
    throw error;
  }
};

// تحديث منتج
export const updateProduct = async (id, product) => {
  try {
    await updateDoc(doc(db, "products", id), product);
  } catch (error) {
    console.error("Error updating product: ", error);
    throw error;
  }
};

// حذف منتج
export const deleteProduct = async (id) => {
  try {
    await deleteDoc(doc(db, "products", id));
  } catch (error) {
    console.error("Error deleting product: ", error);
    throw error;
  }
};