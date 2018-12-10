export const environment  = {
    production: false,
    firebase: {
    apiKey: "AIzaSyB2nMSrWoQNKL08kz9Zd2DRlRTbCTICDTg",
    authDomain: "firsttrial-e833b.firebaseapp.com",
    databaseURL: "https://firsttrial-e833b.firebaseio.com",
    projectId: "firsttrial-e833b",
    storageBucket: "firsttrial-e833b.appspot.com",
    messagingSenderId: "724663330101"
    }
  };
export const snapshotToArray = snapshot =>{
  let returnArray = [] ;
  snapshot.forEach(element => {
    let item = element.val();
    item.key = element.key;
    returnArray.push(item);
  });
  return returnArray;
}
