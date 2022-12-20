import { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import NavBar from "../components/NavBar";

const TestPage = () => {

    const [users, setUsers] = useState([]);
    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);

    const usersCollectionRef = collection(db, "users")


    //create
    const createUser = async () => {
        await addDoc(usersCollectionRef, { username: newName, age: newAge, password: 123, createdAt: serverTimestamp() })
    }

    //read
    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getUsers();
    }, []
    )

    //update
    const updateUser = async (id, age) => {
        const userDoc = doc(db, "users", id)
        const newFields = { age: age + 1 }
        await updateDoc(userDoc, newFields)
    }

    //delete
    const deleteUser = async (id) => {
        const userDoc = doc(db, "users", id)
        await deleteDoc(userDoc)
    }

    return (
        <>
            <NavBar />
            <div style={{ marginTop: '8rem' }}>
                <input placeholder="username" onChange={(e) => setNewName(e.target.value)} />
                <input type="number" placeholder="age" onChange={(e) => setNewAge(e.target.value)} />
                <button onClick={createUser}>Create user</button>
                {users.map(
                    (user) => {
                        return <>
                            <h1>name: {user.username}</h1> <h1>password: {user.password}</h1> <h1>age: {user.age}</h1>
                            <button onClick={() => updateUser(user.id, user.age)}>increment age</button>
                            <button onClick={() => { deleteUser(user.id) }}>Delete user</button>
                        </>
                    }
                )}
            </div>
        </>
    )
}

export default TestPage