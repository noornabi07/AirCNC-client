import { AiOutlineMenu } from 'react-icons/ai'
import { useCallback, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../Provider/AuthProvider'
import Avatar from './Avatar'
import HostModal from '../../Modal/HostRequestModal'
import { becomeHost } from '../../../API/auth'
import Swal from 'sweetalert2'

const MenuDropdown = () => {
    const { user, logOut, role, setRole } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)
    const [modal, setModal] = useState(false);

    console.log("role result:", role);

    const toggleOpen = useCallback(() => {
        setIsOpen(value => !value)
    }, [])

    // modal handler
    const modalHandler = email => {
        becomeHost(email)
            .then(data => {
                console.log(data);
                Swal.fire("You are host now, post rooms!");
                setRole('host');
                closeModal()
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    // close handler
    const closeModal = () => {
        setModal(false)
    }


    return (
        <div className='relative'>
            <div className='flex flex-row items-center gap-3'>
                <div className='hidden md:block text-sm font-semibold py-3 px-8 rounded-full  transition'>
                    {!role && (
                        <button className='cursor-pointer p-2 rounded-full hover:bg-neutral-100' onClick={() => setModal(true)} disabled={!user}>AirCNC your home</button>
                    )}
                </div>
                <div
                    onClick={toggleOpen}
                    className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                >
                    <AiOutlineMenu />
                    <div className='hidden md:block'>
                        <Avatar></Avatar>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
                    <div className='flex flex-col cursor-pointer'>
                        <Link
                            to='/'
                            className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                            Home
                        </Link>
                        {user ? (
                            <>

                                <Link
                                    to='/dashboard'
                                    className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                >
                                    Dashboard
                                </Link>
                                <div
                                    onClick={()=>{
                                        setRole(null)
                                        logOut()
                                    }}
                                    className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                                >
                                    Logout
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to='/login'
                                    className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                >
                                    Login
                                </Link>
                                <Link
                                    to='/signup'
                                    className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}

            <HostModal closeModal={closeModal} email={user?.email} modalHandler={modalHandler} isOpen={modal}></HostModal>
        </div>
    )
}

export default MenuDropdown