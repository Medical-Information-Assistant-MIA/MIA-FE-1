import { useQuery } from '@apollo/client';
import { Doctor, DoctorPageProps } from '../../types';
import { GET_DOCTORS } from '../../gql-queries';
import './DoctorPage.css';

export const DoctorPage = ({user}: DoctorPageProps) => {
  const id = user.id;

  const { loading, error, data } = useQuery(GET_DOCTORS, {
    variables: { id },
  });
  if (loading) return <p className='nav-spacing doctor-page'>Loading...</p>
  if (error) return <p className='nav-spacing doctor-page'>{error.message}</p>

  console.log( data.userDoctors)
  const docsDisp = data.userDoctors.map((doc: Doctor)=> {
    return (
      <div key={doc.id} className='doc-card'>
        <h2>{doc.name}</h2>
        {doc.category ? <p>{doc.category}</p> : null}
        {doc.phone ? <p>{doc.phone}</p> : null}
        {doc.address ? <p>{doc.address}</p> : null} 
      </div>
    )
  })

  return (
    <section className='nav-spacing doctor-page'>
      <h1>Your Doctors</h1>
      <div className='doc-card-conatiner'>
        {docsDisp}
      </div>
    </section>
  )
}