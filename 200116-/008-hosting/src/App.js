import React, {useState, useEffect} from 'react';
import * as firebase from 'firebase'
import logo from './logo.svg';
import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyCXbAsVwIcQ1cwDqeMSlARiwkx5gQ8u0Zc",
  authDomain: "drawn2.firebaseapp.com",
  databaseURL: "https://drawn2.firebaseio.com",
  projectId: "drawn2",
  storageBucket: "drawn2.appspot.com",
  messagingSenderId: "372368414773",
  appId: "1:372368414773:web:ba532deece66df5bed797c",
  measurementId: "G-7J4QRSQWD5"
}
firebase.initializeApp(firebaseConfig);
firebase.analytics();



function App() {

  const [users, setUsers] = useState([])
  const [age, setAge] = useState([])
  const [userName, setUserName] = useState([])
  const [documentId, setDocumentId] = useState([])
  useEffect(() => {
    const db = firebase.firestore()
    const unsubscribe = db.collection('users').onSnapshot((querySnapshot) => {
      // console.log('更新検知')
      // querySnapshot.forEach(doc => {
      //   console.log(doc.id, doc.data())
      //   console.log('---------------')
      // })
      const _users = querySnapshot.docs.map(doc => {
        return {
          userId: doc.id,
          ...doc.data()
        }
      })
      setUsers(_users)
    })
    return () => {
      unsubscribe()
    };
  },[])
  const handleClickFetchButton = async () => {
    const db = firebase.firestore()
    const snapshot = await db
      .collection('users')
      .get()
    const _users = []
  
    snapshot.forEach(doc => {
      _users.push({
        userId: doc.id,
        ...doc.data()
      })
    })
      setUsers(_users)
    }
    const userListItems = users.map(user => {
      return (
      <li key={user.Id}>{user.userId}: {user.name}: {user.age} : {user.location}</li>
      )
    })

    const handleClickAddButton = async () => {
      if (!userName || !age) {
        alert('"userName" or "age" が 空欄です')
        return
      }
      const parseAge = parseInt(age, 10)
      if(isNaN(parseAge)){
        alert('"age" が 不正な値です')
        return
      }
      const db = firebase.firestore()
      await db
        .collection('users')
        .add({
          name: userName,
          age: parseAge
        })
        setUserName('')
        setAge('')
      }

      const handleClickUpdateButton= async () => {
        if(!documentId){
          alert ('documentIdをセットしてください')
          return
        }
        const newData = {}
        if(userName) {
          newData['name'] = userName
        } 
        if (age) {
          newData['age'] = parseInt(age, 10)
        }

        try {
        const db = firebase.firestore()
        await db.collection('users').doc(documentId).update(newData)
        setUserName('')
        setAge('')
        setDocumentId('')
        } catch (err) {
          console.error(err)
        }
      }

      const handleClickDeleteButton = async () => {
        if(documentId == ''){
          alert ('docuementIdをセットしてください')
          return
        }
        try {
        const db = firebase.firestore()
        await db.collection('users').doc(documentId).delete()
        setUserName('')
        setAge('')
        setDocumentId('')
        } catch (err) {
          console.error(err)
        }
      }

  return (
    <div className="App">
      <h1>Hello Chat</h1>
      <label htmlFor="username">userName : </label>
      <input
        type="text"
        id="username"
        value={userName}
        onChange={e => {setUserName(e.target.value)}}
      />
      <label htmlFor="age">age : </label>
      <input
        type="text"
        id="age"
        value={age}
        onChange={e => {setAge(e.target.value)}}
      />      
      <label htmlFor="documentId">documentId : </label>
      <input
        type="text"
        id="documentId"
        value={documentId}
        onChange={e => {setDocumentId(e.target.value)}}
      />
      <button onClick={handleClickFetchButton}>取得</button>
      <button onClick={handleClickAddButton}>追加</button>
      <button onClick={handleClickUpdateButton}>更新</button>
      <button onClick={handleClickDeleteButton}>削除</button>
      <ul>{userListItems}</ul>
    </div>
  );
}

export default App;
