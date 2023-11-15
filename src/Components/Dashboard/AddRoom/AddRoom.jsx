import React, { useContext, useState } from 'react';
import AddRoomForm from '../../Form/AddRoomForm';
import { uploadImage } from '../../../API/utils';
import { AuthContext } from '../../../Provider/AuthProvider';
import { addRoom } from '../../../API/rooms';
import Swal from 'sweetalert2';

const AddRoom = () => {
    const { user } = useContext(AuthContext);
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }
    )
    const [loading, setLoading] = useState(false);
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image');

    const handleSubmit = event => {
        event.preventDefault()
        setLoading(true)
        const form = event.target;
        const location = form.location.value;
        const title = form.title.value;
        const from = dates.startDate;
        const to = dates.endDate;
        const price = form.price.value;
        const total_guest = form.total_guest.value;
        const bedrooms = form.bedrooms.value;
        const bathrooms = form.bathrooms.value;
        const description = form.description.value;
        const category = form.category.value;

        const image = event.target.image.files[0];

        // image upload here
        uploadImage(image)
            .then(data => {
                const roomData = {
                    location,
                    title,
                    from,
                    to,
                    price: parseFloat(price),
                    total_guest,
                    bedrooms,
                    bathrooms,
                    description,
                    image: data.data.display_url,
                    hose: {
                        name: user?.displayName,
                        image: user?.photoURL,
                        email: user?.email
                    },
                    category
                }

                // post room data in to the server
                addRoom(roomData)
                    .then(data => {
                        if (data.insertedId) {
                            Swal.fire({
                                position: "top-center",
                                icon: "success",
                                title: "Your room added successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                        console.log(data);
                    })
                    .catch(err => console.log(err))

                setLoading(false)
            })
            .catch(err => {
                console.log(err.message)
                setLoading(false);
            })

    }

    // handle image change 
    const handleImageChange = image => {
        setUploadButtonText(image.name);
    }

    // handle date select
    const handleDates = ranges => {
        setDates(ranges.selection);
        console.log(ranges.selection);
    }

    return (
        <AddRoomForm handleSubmit={handleSubmit} loading={loading} handleImageChange={handleImageChange} handleDates={handleDates} dates={dates} uploadButtonText={uploadButtonText}></AddRoomForm>
    );
};

export default AddRoom;