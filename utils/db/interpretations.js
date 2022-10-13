import "firebase/firestore";
import { db } from "@/plugins/firebase";

export const addInterpretation = async (uid, collection, selections, html) => {
  let data = {
    uid,
    text: html,
    created: new Date().getTime(),
    validated: false,
    likes: 0
  };

  switch (collection) {
    case "planets":
      data.planetId = selections[0];
      break;
    case "signs":
      data.signId = selections[0];
      break;
    case "houses":
      data.houseId = selections[0];
      break;
    case "aspects":
      data.aspectId = selections[0];
      break;
    case "planets-in-signs":
      data.planetId = selections[0];
      data.signId = selections[1];
      break;
    case "houses-in-signs":
      data.houseId = selections[0];
      data.signId = selections[1];
      break;
    case "planets-in-houses":
      data.planetId = selections[0];
      data.houseId = selections[1];
      break;
    case "planets-in-aspects":
      data.planetsId = `${selections[0]}-${selections[2]}`;
      data.aspectId = selections[1];
      break;
  }

  try {
    await db
      .collection(collection)
      .doc()
      .set(data);
    console.log("interpretation set");
    return Promise.resolve();
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const updateInterpretation = async (id, collection, data) => {
  const interpretations = db.collection(collection);
  return interpretations
    .doc(id)
    .update(data)
    .then(() => {
      console.log("interpretation updated");
      return Promise.resolve();
    })
    .catch(error => {
      console.log("Error updating interpretation: ", error);
      return Promise.reject();
    });
};

export const deleteInterpretation = async (id, collection) => {
  const interpretations = db.collection(collection);
  return interpretations
    .doc(id)
    .delete()
    .then(function() {
      console.log("interpretation deleted");
      return Promise.resolve();
    })
    .catch(function(error) {
      console.error("Error removing interpretation: ", error);
      return Promise.reject();
    });
};

export const getInterpretations = async (collection, selections) => {
  let snapshot1;
  switch (collection) {
    case "planets":
      snapshot1 = await db
        .collection(collection)
        .where("planetId", "==", selections[0])
        .get();
      break;
    case "signs":
      snapshot1 = await db
        .collection(collection)
        .where("signId", "==", selections[0])
        .get();
      break;
    case "houses":
      snapshot1 = await db
        .collection(collection)
        .where("houseId", "==", selections[0])
        .get();
      break;
    case "aspects":
      snapshot1 = await db
        .collection(collection)
        .where("aspectId", "==", selections[0])
        .get();
      break;
    case "planets-in-signs":
      snapshot1 = await db
        .collection(collection)
        .where("planetId", "==", selections[0])
        .where("signId", "==", selections[1])
        .get();
      break;

    case "houses-in-signs":
      snapshot1 = await db
        .collection(collection)
        .where("houseId", "==", selections[0])
        .where("signId", "==", selections[1])
        .get();
      break;

    case "planets-in-houses":
      snapshot1 = await db
        .collection(collection)
        .where("planetId", "==", selections[0])
        .where("houseId", "==", selections[1])
        .get();
      break;

    case "planets-in-aspects":
      snapshot1 = await db
        .collection(collection)
        .where("planetsId", "in", [
          `${selections[0]}-${selections[2]}`,
          `${selections[2]}-${selections[0]}`
        ])
        .where("aspectId", "==", selections[1])
        .get();
      break;
  }

  console.log("searching for ", collection, selections);

  try {
    const interpretations = snapshot1.docs.map(doc => {
      const interPretationsData = { ...doc.data(), id: doc.id };
      return interPretationsData;
    });
    console.log(interpretations);
    const uids = [];
    if (interpretations.length === 0) {
      return Promise.reject(
        "No interpretations found for those search criteria"
      );
    }
    interpretations.forEach(interpretation => {
      uids.push(interpretation.uid);
    });

    return Promise.all(getUsersData(uids)).then(usersData => {
      return Promise.resolve({ interpretations, usersData });
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserData = async uid => {
  try {
    const snapshot2 = await db
      .collection("users")
      .where("uid", "==", uid)
      .get();

    const userData = snapshot2.docs.map(doc => {
      const {
        uid,
        displayName,
        photoURL,
        websiteName,
        websiteURL,
        businessDescription
      } = doc.data();
      return {
        uid,
        displayName,
        photoURL,
        websiteName,
        websiteURL,
        businessDescription
      };
    });

    return Promise.resolve(userData[0]);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUsersData = uids => {
  const promises = [];
  uids.forEach(uid => {
    promises.push(getUserData(uid));
  });

  return promises;
};
