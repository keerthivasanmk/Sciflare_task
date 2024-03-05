// Dependencies
import { useEffect, useState } from "react";

// Components
import EditModal from "./EditModal";

// Images
import EditIcon from '../images/edit.png'
import DeleteIcon from '../images/delete.png'

export default function Table() {
    const [profileData, setProfileData] = useState();
    const [loader, setLoader] = useState(false);
    const [currentProfileId, setCurrentProfileId] = useState();
    const [isModalVisible, setIsModalVisible] = useState();
    const [toastMessage, setToastMessage] = useState('');

    const fetchCall = async () => {
        try {
            setLoader(true);
            const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'GET',
                headers: { "Content-Type": "application/json" },
            });
            const responseData = await response.json();
            setProfileData(responseData);
            setLoader(false);
        }
        catch (err) {
            console.log(err);
        }
    }

    const addCall = async (data) => {
        try {
            await fetch('https://jsonplaceholder.typicode.com/users', {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });
            setToastMessage('Added Successfully');
            setTimeout(() => setToastMessage(''), 3000);
        }
        catch (err) {
            console.log(err);
        }
    }

    const deleteCall = async (id) => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: "DELETE"
            });
            setToastMessage('Deleted Successfully');
            setTimeout(() => setToastMessage(''), 3000);
        }
        catch (err) {
            console.log(err);
        }
    }

    const putCall = async (payload) => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/users/${currentProfileId}`, {
                method: "PUT",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" },
            });
            setToastMessage('Updated Successfully');
            setTimeout(() => setToastMessage(''), 3000);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchCall();
    }, [])

    const deleteRow = (id) => {
        const updatedData = profileData?.filter((item) => id !== item.id);
        setProfileData(updatedData);
        deleteCall(id);
    }

    return (
        <div className={'section-container'}>
            <div onClick={() => setIsModalVisible(true)} className={'add-button'}>+ Add</div>
            <div className={'table-container'}>
                <table width={'100%'}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Website</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loader ?
                            <tr>
                                <td colSpan="5"><div className={'loader'}></div></td>
                            </tr>
                            :
                            profileData?.map((item) => (
                                <tr key={item?.id}>
                                    <td>{item?.name}</td>
                                    <td>{item?.email}</td>
                                    <td>{item?.phone}</td>
                                    <td>{item?.website}</td>
                                    <td className="actions">
                                        <img src={EditIcon} alt={'edit'} width={16} onClick={() => { setCurrentProfileId(item?.id); setIsModalVisible(true) }} />
                                        <img src={DeleteIcon} alt={'delete'} width={16} onClick={() => deleteRow(item?.id)} />
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
            {isModalVisible && (
                <EditModal
                    currentProfileId={currentProfileId}
                    setCurrentProfileId={setCurrentProfileId}
                    profiles={profileData}
                    setProfiles={setProfileData}
                    isVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                    addCall={addCall}
                    fetchCall={fetchCall}
                    putCall={putCall}
                />
            )}
            {toastMessage &&
                <div className={`snackbar ${toastMessage ? 'show' : ''}`}>{toastMessage}</div>
            }
        </div>
    )
}
