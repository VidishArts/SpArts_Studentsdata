import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

const App = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

  useEffect(() => {
    axios.get('http://3.223.98.72:1337/api/students')
      .then(response => {
        setStudents(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const filteredStudents = students.filter(student =>
    student.attributes.firstName.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  if (loading) return <div className="text-center py-10">LOADING.......</div>;
  if (error) return <div className="text-center py-10">Error loading students: {error.message}</div>;

  return (
    <div className="min-h-screen bg-purple-100 flex">
      <div className="sidebar">

        <div className="sidebar-content">
          <div className="icon"><i className="fas  fa-paper-plane  plame" ></i></div>
          <div className="icon"><i className="fas fa-user-graduate"></i></div>
          <div className="icon"><i className="fas fa-chart-bar"></i></div>
          <div className="icon"><i className="fas fa-calendar-alt"></i></div>
          <div className="icon"><i className="fas fa-cog"></i></div>
          <div className='icons'>
            <i className="fas fa-code"></i>
          </div>
        </div>

      </div>
      <div className="main-content flex flex-col items-center py-10 w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl">
          <div className="flex flex-col md:flex-row items-center mb-5">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">Students</h1> &nbsp; &nbsp;
            <span className="text-lg border-2 border-grey text-purple-800 px-3 py-1 rounded-full">{students.length}</span>

            <div className="ico"><i className="fas fa-regular fa-receipt "></i></div>  <i class=""></i> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <div className="bell"><i className="fas fa-regular fa-bell "></i></div>  <i class=""></i> &nbsp;&nbsp;
            <div className="py-2 px-4">
              <img src="./image.jpg" alt="" className=" w-10 h-10 rounded-full" />

            </div>
            <div className="bell"><i className="fas  fa-chevron-down "></i></div>



          </div>
          <div className="flex flex-col justify-between  md:flex-row items-center mb-5">
            <input
              type="text"
              className="flex-grow p-2  border-0 border-b-2 border-purple-200  rounded-xl mb-5 md:mb-0 md:mr-20"
              placeholder="Search by name"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button className="bg-purple-500  text-white px-2 py-2 rounded-2xl fas fa-plus">    Add a student</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>

                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Dob</th>
                  <th className="py-2 px-4 border-b">Gender</th>
                  <th className="py-2 px-4 border-b">Phone</th>
                  <th className="py-2 px-4 border-b">Email</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(student => (
                  <tr key={student.id} className="border-b hover:bg-gray-100">
                    <td className="py-2 px-4">{student.id}</td>
                    <td className="py-2 px-4">{student.attributes.firstName}</td>
                    <td className="py-2 px-4">{student.attributes.dob}</td>
                    <td className="py-2 px-4">{student.attributes.gender}</td>
                    <td className="py-2 px-4">{student.attributes.parentContactNo}</td>
                    <td className="py-2 px-4">{student.attributes.parentEmailId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-center mt-5">
            <button
              className={`bg-purple-500 text-white px-4 py-2 rounded-3xl ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handleClick(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            &nbsp; &nbsp;
            <button
              className={`bg-purple-500 text-white px-4 py-2 rounded-3xl ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handleClick(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
            <div style={{ position: 'absolute', marginLeft: '50%' }}>
              <span className="text-lg bg-purple-200 text-purple-800 px-7 py-2 rounded-full"> 1 &nbsp; of &nbsp;  {currentPage}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
