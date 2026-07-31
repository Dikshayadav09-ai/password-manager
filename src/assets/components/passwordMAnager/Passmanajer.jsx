import { data } from 'autoprefixer';
import { stringify } from 'postcss';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';

const Passmanajer = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [Url, setUrl] = useState('')
    const [userID, setuserID] = useState('')
    const [pass, setpass] = useState('')
    const [ShowPass, setShowPass] = useState(true)
    const [Data, setData] = useState([])

    // useEffect(() => {
    //     if (Data.length > 0) {
    //         console.log("workinh")
    //         localStorage.setItem('data', JSON.stringify(Data));
    //     } else {
    //         null
    //     }
    //     console.log("helo use effect")
    // }, [Data])
    useEffect(() => {
        const getData = async () => {
            let Rawdata = await fetch('http://localhost:3000/')
            console.log(Rawdata)
            if (Rawdata) {
                console.log("hello")
                let finaldata = await Rawdata.json()
                setData(finaldata)
            }
        }
        getData()

    }, [])

    const onSubmit = async (value) => {
        value.id = uuidv4();
        console.log(value)
        setUrl('')
        setuserID('')
        setpass('')
        setData([...Data, value])
        console.log(Data)
        let send_data = fetch('http://localhost:3000/', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        })
        toast.success('Password Saved Sucessfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    const HandleInputChnageURL = (e) => {
        setUrl(e.target.value)
    }
    const HandleInputChnagePASS = (e) => {
        setpass(e.target.value)
    }
    const HandleInputChnageUSERID = (e) => {
        setuserID(e.target.value)
    }
    const HandleEdit = async(value) => {

        // edit main func
        let index = Data.findIndex((item) => {
            return item.id == value
        })
        setUrl(Data[index].WebURL)
        setuserID(Data[index].UserID)
        setpass(Data[index].Password)
        // deleteing the item from db
        let deleteIndex = Data.findIndex((item) => {
            return item.id === value
        })
        let deleteItem = Data[deleteIndex]
        console.log(deleteItem)
        let DeleteRequest = await fetch('http://localhost:3000/', {

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deleteItem)
        })
        // deleting it from frontend
        let FilteredData = Data.filter((item) => {
            return item.id != value
        })
        setData(FilteredData)
        // toast
        toast('Editing', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    const HandleDelete = async (value) => {
        let val = confirm("are you sure you want to delete?")
        if (val) {
            let deleteIndex = Data.findIndex((item) => {
                return item.id === value
            })
            let deleteItem = Data[deleteIndex]
            console.log(deleteItem)
            let DeleteRequest = await fetch('http://localhost:3000/', {

                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(deleteItem)
            })
            console.log(await DeleteRequest.json())
            console.log("Dleted sucessfully")


            let FilteredData = Data.filter((item) => {
                return item.id != value
            })
            setData(FilteredData)

            // toastify code 
            toast.error('Delete Sucessfull', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const HandleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast('Copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div id='main' className='min-h-[85vh] w-full p-5 flex justify-center items-center'>
                {/* centering div */}
                <div id='CennteringDiv' className='w-[90%] min-h-[85vh] p-5'>
                    {/* title div */}
                    <div id='titleDiv' className='h-[13vh]'>
                        <h1 className='text-5xl text-yellow-50'>
                            Pass<p className='text-green-500 inline'>Op</p>
                        </h1>
                        <p className='text-yellow-50 mt-3'>
                            Your personal <span className='text-green-500'>password</span> manager
                        </p>
                    </div>
                    {/* input and entry div */}
                    <div id='Inputarea' className='h-[40vh] p-2'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Website URL input */}
                            <input
                                {...register('WebURL')}
                                value={Url}
                                onChange={HandleInputChnageURL}
                                className='w-full sm:w-[556px] h-[3em] rounded bg-zinc-600 border-zinc-600 text-yellow-50 p-2 text-xl block mt-3 focus:outline-none'
                                placeholder='Enter Website URL'
                                type="text"
                            />
                            <div className='flex gap-3 flex-row flex-wrap'>

                                {/* UserID input */}
                                <input
                                    {...register('UserID')}
                                    value={userID}
                                    onChange={HandleInputChnageUSERID}
                                    className='w-full sm:w-[556px] h-[3em] rounded bg-zinc-600 text-yellow-50 p-2 text-xl mt-3 focus:outline-none'
                                    placeholder='Enter UserID'
                                    type="text"
                                />
                                {/* Password input */}
                                <input
                                    {...register('Password')}
                                    onChange={HandleInputChnagePASS}
                                    value={pass}
                                    className=' w-full sm:w-[556px] h-[3em] rounded bg-zinc-600 text-yellow-50 p-2 text-xl mt-3 focus:outline-none'
                                    placeholder='Enter Password'
                                    type="password"
                                />
                            </div>
                            {Url && userID && pass ? (
                                <button type='submit' className=' flex items-center justify-center gap-1 mt-10 border w-[150px] h-[4rem] border-green-500 rounded text-2xl text-yellow-50'>Save
                                    <lord-icon
                                        src="https://cdn.lordicon.com/jectmwqf.json"
                                        trigger="hover"
                                        colors="primary:#ffffff,secondary:#08a88a"
                                    ></lord-icon></button>) : (
                                <button type='submit' disabled className=' flex items-center justify-center gap-1 mt-10 border w-[150px] h-[4rem] border-green-500 rounded text-2xl text-yellow-50'>Save
                                    <lord-icon
                                        src="https://cdn.lordicon.com/jectmwqf.json"
                                        trigger="hover"
                                        colors="primary:#ffffff,secondary:#08a88a"
                                    >
                                    </lord-icon></button>)
                            }
                        </form>
                    </div>
                    <div className="savedPassArea mt-[100px] text-yellow-50 min-h-[14vh] rounded p-5 w-full">
                        {

                            Data && Data.length > 0 ? (Data.map((item) => {
                                return (
                                    <div key={item.id} className=' bg-zinc-700 mt-2 rounded-xl border border-green-950 p-3 w-full flex items-center min-h-[10vh] '>
                                        <span className='w-[50%] gap-1 flex  items-center'><lord-icon
                                            src="https://cdn.lordicon.com/rpviwvwn.json"
                                            trigger="in"
                                            delay="200"
                                            state="in-reveal"
                                            colors="primary:#e4e4e4,secondary:#ffffff">
                                        </lord-icon>{item.WebURL}</span>
                                        <span className='w-[20%] inline-block font-bold'>{item.UserID}</span>
                                        <span type="password" className='w-[15%] inline-block'>{item.Password}</span>
                                        <span><button className='border border-purple-500 h-8 w-16 p-1 rounded' onClick={() => HandleCopy(item.Password)}>Copy</button></span>
                                        <span><button className='flex justify-center items-center rounded p-2  h-8 w-16 ml-2' onClick={() => HandleEdit(item.id)}><lord-icon
                                            src="https://cdn.lordicon.com/exymduqj.json"
                                            trigger="hover"
                                            colors="primary:#ffffff,secondary:#08a88a">
                                        </lord-icon></button></span>
                                        <span><button className='flex justify-center items-center rounded p-2 h-8 w-16 ml-2' onClick={() => HandleDelete(item.id)}><lord-icon
                                            src="https://cdn.lordicon.com/hwjcdycb.json"
                                            trigger="hover"
                                            colors="primary:#e83a30,secondary:#ee6d66">
                                        </lord-icon></button></span>
                                    </div>
                                )
                            })
                            ) : (
                                <p>no data</p>
                            )

                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Passmanajer
