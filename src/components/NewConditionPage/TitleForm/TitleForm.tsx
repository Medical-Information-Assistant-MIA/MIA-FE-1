import { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom';
import './TitleForm.css';


type TitleFormProps = {
  userId: number,
  setConditionId: Function
}


export const TitleForm = ({ userId, setConditionId }: TitleFormProps) => {
  const [conditionName, setConditionName] = useState('');
  const history = useHistory()

  const CREATE_CONDITION = gql`
  mutation {
    createCondition(input: {
      name: "${conditionName}"
      userId: ${userId}
    }) {
      condition {
        id
        name 
      }
    }
  }
  `
  
  const [mutateFunction, { data, loading, error }] = useMutation(CREATE_CONDITION)

  useEffect(() => {
    setConditionId(data?.createCondition.condition.id)
  }, [data?.createCondition.condition.id])

  useEffect(() => {
    if (data?.createCondition.condition.id) history.push('/add-condition/add-medication')
  }, [data?.createCondition.condition.id])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>
  
  console.log('response', data)

  return (
    <section className='condition-form nav-spacing'>
      <h3> Add Your Condition</h3>
      <form className='condition-form' onSubmit={async e => {
        e.preventDefault()
        await mutateFunction()
        setConditionName('')
        // 
      }}>
        <label className='med-label'>
          What is the name of your Condition?
          <input 
            type='text'
            value={conditionName} 
            name='condition name' 
            placeholder='Condition Name'
            required
            onChange={e => setConditionName(e.target.value)}/>
        </label>
          <button className='submit-button' type='submit'>Submit condition</button>
      </form>
    </section>
  )
}