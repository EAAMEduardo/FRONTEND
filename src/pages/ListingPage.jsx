import React, { useEffect } from 'react'
import {useAuth} from "../context/AuthContext"
import { useState } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import {app} from "../firebase"
import {useNavigate} from "react-router-dom"
import { useParams } from 'react-router-dom'
import {getUniquedListing} from "../api/listing"


function ListingPage() {


    const {user, createListing, fails, setFails} = useAuth()
    const [files, setFiles] = useState([])
    const [ successList, setSuccessList] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        salePrice: 0,
        offer: false,
        parking: false,
        furnished: false,
        userRef: user.id
    })
    
   

   

    function handleImg() {
        Object.values(files).map(file => {
            storageImg(file)
            
       })
    }


    const storageImg = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app)
            const fileName = new Date().getTime() + file.name
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                   console.log(progress)
                },
                (error) => {
                   reject(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                        setFormData({...formData, imageUrls: formData.imageUrls.concat(downloadURL)})
                     
                    })
                }
            )
        })
    }



    const handleForm = (e) => {
       
            
        if(e.target.id === "rent" || e.target.id === "sell") {
            setFormData({...formData,
                type: e.target.id
            })
        }
         

        if(e.target.id === "parking" || e.target.id === "offer" || e.target.id === "furnished") {
            setFormData({
                ...formData,
                [e.target.id] : e.target.checked
            })
        }

        if( e.target.type === "text" || e.target.type === "textarea") {
            setFormData({
                ...formData,
                [e.target.id] : e.target.value
            })
        }

        if(e.target.type === "number") {
            setFormData({
                ...formData,
                [e.target.id] : Number(e.target.value)
            })
        }
        
    }

    const deleteImg = (index) => {
        const newImgs = formData.imageUrls.filter((img, i) => i !== index)
 
        setFormData({
         ...formData,
         imageUrls: newImgs
        })
        
     }

    const handleSubmit = async () => {
        if(formData.imageUrls.length < 1) {
            setFails([...fails, "You need to upload at least a image"])
            return
        } else {
            await  createListing(formData)
       setSuccessList(true)
       navigate(`/listings/${user.id}`)
        }
       
    }

  

     
    useEffect(() => {
        if(successList) {
            setTimeout(() => {
                setSuccessList(false)
            }, 4000);
        }
    }, [successList])
    

    useEffect(()=> {
        if(fails) {
 
             setTimeout(()=> {
                setFails([])
             }, 4000)
           
        }
    }, [fails])
    


  return (
    <main className='main'>
        {id ? (
            <h1>Update Listing</h1>
        ): <h1>Create Listing</h1>}

        {successList ? (
            <div className='success-list'>Listing Was Created Successfully</div>
        ): <></>}

      <form className='form-listing'>

        <div className='uno'>
            <div className="inputs">
                <input  id='name' onChange={(e) => handleForm(e)} className='input' type='text' placeholder='Name'></input>
                <textarea   id='description' onChange={(e) => handleForm(e)} className='input' placeholder='Description'></textarea>
                <input   id='address' onChange={(e) => handleForm(e)} className='input' type='text' placeholder='Address'></input>
            </div>

            <div className="checkboxes">
                
              <div className="type">

              <div>
                 <input   onChange={(e) => handleForm(e)} name='type' id='sell' type='radio'></input>
                 <label>Sell</label>
              </div>

               <div>
                 <input   onChange={(e) => handleForm(e)} name='type' id='rent' type='radio'></input>
                  <label>Rent</label>
               </div>

              </div>

              

                <div className="items">
                <input   onChange={(e) => handleForm(e)} id='parking' type='checkbox'></input>
                <label> Parking</label>

                
                <input  onChange={(e) => handleForm(e)} id='furnished' type='checkbox'></input>
                <label> Furnished</label>

                
                <input  onChange={(e) => handleForm(e)} id='offer' type='checkbox'></input>
                <label> Offer</label>
                </div>
                
            </div>

            <div className="rooms">
               <div>
                 <input min={1} onChange={(e) => handleForm(e)} required id='bedrooms' defaultValue={1} type='number'></input>
                  <label> Beds</label>
               </div>

                <div>
                   <input min={1} onChange={(e) => handleForm(e)} required id='bathrooms' defaultValue={1} type='number'></input>
                   <label> Baths</label>
                </div>
            </div>

            {formData.offer ? (
                <div className="price">
                <input onChange={(e) => handleForm(e)} id='regularPrice' required defaultValue={1} type='number'></input>
                <label>Regular price
                    ($/Months)
                </label>

                <input min={1} onChange={(e) => handleForm(e)} id='salePrice' required defaultValue={1} type='number'></input>
                    <label>Disscounted Price price
                        ($/Months)
                    </label>
            </div>
            ): (
                <div className="price">
                     <input min={1} onChange={(e) => handleForm(e)} id='regularPrice' required defaultValue={1} type='number'></input>
                    <label>Regular price
                      ($/Months)
                   </label>
                </div>
            )}
        </div>

        <div className='dos'>
            <p className='dos-text'>Images: <span className='span'>The first image will be the cover (6 max)</span></p>
            <p className='dos-text'>(To make sure you upload the correct images, you have to do it one by one)</p>

            {fails.map(fail => {
                return(
                    <p className='fail'>{fail}</p>
                )
            })}

            <div>

                <div className="imgs-container">
                    {formData.imageUrls.map((img, i) => {
                        return (
                            <div className="img-form-container">
                                <img className='img-form' src={img} alt='img'></img>
                                <button onClick={() => deleteImg(i)} type='button'>Delete</button>
                            </div>
                        )
                    })}
                </div>

                <div className="file">
                    <input accept='image/*' multiple="multiple" onChange={(e) => setFiles(e.target.files)} id='images' type='file'></input>
                    <button onClick={handleImg}  type='button'>UPLOAD</button>
                </div>

                <div className="create">
                    <button onClick={handleSubmit} type='button'>CREATE LISTING</button>
                </div>
            </div>
        </div>
      </form>
    </main>
  )
}

export default ListingPage