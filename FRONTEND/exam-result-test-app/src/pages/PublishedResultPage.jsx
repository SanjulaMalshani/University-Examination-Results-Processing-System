import React from 'react'
import PublishedResultCollection from '../components/student/PublishedResultCollection'
import TopVerticalBar from '../components/TopVerticalBar'
import PublishedResultSheetsCollection from '../components/student/PublishedResultSheetsCollection'
import PublishedResultCollectionResult from '../components/student/PublishedResultCollectionResult'
import { useSelector } from 'react-redux'
import { BiSolidLogOut } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

function PublishedResultPage() {

  const publishedResultNavigation = useSelector((store) => store.publishedResultNavigationSlice)

  const navigate = useNavigate();
  
  const handleLogOut =()=>{
    navigate('/');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('faculty');
 }

  return (
    <div className="flex flex-col">
      <TopVerticalBar userType="student" />
      <div className="mt-14">
        {publishedResultNavigation.isClickedCollection ? (
          publishedResultNavigation.isClickedCollectionView ? (
            publishedResultNavigation.isClickedResultSheetsCollectionView ? (
              <PublishedResultCollectionResult />
            ) : (
              <PublishedResultSheetsCollection />
            )
          ) : (
            <PublishedResultCollection />
          )
        ) : (
          <></>
        )}
      </div>
      <div className="fixed bottom-5 w-2/12 flex justify-center">
        <button
          className="mt-10 w-1/2 h-12 flex items-center justify-center bg-blue-800 gap-3 rounded-lg"
          onClick={handleLogOut}
        >
          <BiSolidLogOut size={20} color="white" />
          <p className="text-white">Logout</p>
        </button>
      </div>
    </div>
  );
}

export default PublishedResultPage
