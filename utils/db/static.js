import 'firebase/firestore';
import { db } from '@/plugins/firebase';


export const getDropdownsData = (type, mutation, store) => {
    return db.collection('dropdowns').where('type', '==', type)
    .get()
    .then((snapshot) => {      
      if(snapshot.docs.length > 0){
      store.commit(`dropdowns/${mutation}`, snapshot.docs.map(doc => doc.data())[0]);
      }
    })
    .catch((error) => {
      console.log(error);
    }) 
}