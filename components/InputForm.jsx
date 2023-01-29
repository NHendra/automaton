import React, { useState, useEffect } from 'react';
import { submitQueries } from '../services';
import { v4 as uuid } from 'uuid';
import { getQueries } from '../services';

const InputForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({ caption: '', admin: '', image: '', postid: '', storeData: false });

  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initalFormData = {
      caption: '',
      admin: '',
      image: '',
      postid: '',
      storeData: false,
    };
    setFormData(initalFormData);
  }, []);

  const [queries, setQueries] = useState([]);

  useEffect(() => {
    getQueries().then((result) => {
      setQueries(result);
    });
  }, []);

  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (!formData.image) {
      setValid(false);
    } else {
    fetch(formData.image)
    .then((res) => {
      console.log(res.status);
      if (res.status == 404) {
        setValid(false);
      } else {
        setValid(true);
      }
    })
    .catch((err) => {
      setValid(false);
    });
    }
  }, [formData.image]);

  const onInputChange = (e) => {
    const { target } = e;
    if (target.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handlePostSubmission = () => {
    setError(false);
    const { caption, admin, image, storeData } = formData;
    if (!caption || !admin || !image && !valid) {
      setError(true);
      return;
    }
    const postObj = {
      unique: uuid(),
      caption,
      admin,
      image,
      slug,
      postid: '',
    };

    submitQueries(postObj)
      .then((res) => {
        if (res.createPagefb) {
          formData.caption = '';
          formData.admin = '';
          formData.image = '';
          setFormData((prevState) => ({
            ...prevState,
            ...formData,
          }));
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);
        }
      });
  };

  return (
    <div className="contact max-w-md">
      <div className="queriesform dark:bg-gray-900 transition duration-700 shadow-lg rounded-lg p-8 pb-12 mb-8 md:float-right">
        <div className='p-8 rounded-lg'>
          <div className='bg-gray-800 pb-10 rounded-lg'>
            <div className='p-4'>
              <span className='break-words'>{formData.caption}</span>
              <br/>
              <br/>
              <span className=''>{formData.admin ? '- ' + formData.admin : ''}</span>
            </div>
            {valid && <img className='pt-2' src={formData.image} alt="Thumbnail" />}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <textarea value={formData.caption} onChange={onInputChange} className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" name="caption" placeholder="Caption" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <input type="text" value={formData.image} onChange={onInputChange} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" placeholder="Image URL" name="image" />
          <input type="email" value={formData.admin} onChange={onInputChange} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" placeholder="Admin Name" name="admin" />
        </div>
        {error && <p className="text-xs text-red-500">All fields are mandatory</p>}
        <div className="mt-8">
          <button type="button" onClick={handlePostSubmission} className="float-right cbptext transition duration-500 ease transform hover:-translate-y-1 inline-block bg-blue-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
            Add
          </button>
          <button type="button" onClick={() => signOut() } className="float-left cbptext transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">logout</button>
          {showSuccessMessage && <span className="text-xl float-left font-semibold mt-3 text-green-500 cbptext">Queries submitted</span>}
        </div>
        <div className='pt-8 rounded-lg mt-20'>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Caption
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Admin
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Published
                        </th>
                    </tr>
                </thead>
                <tbody>
                {queries.map((queri, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <img className='rounded-lg' src={queri.image} alt="Thumbnail" />
                      </th>
                      <td className="px-6 py-4">
                        {queri.caption}
                      </td>
                      <td className="px-6 py-4">
                        {queri.admin}
                      </td>
                      <td className="px-6 py-4">
                        {queri.postid ? "YES" : "NO"}
                      </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
