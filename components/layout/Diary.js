import React from 'react'
import moment from 'moment'

import DiaryController from '../diary/DiaryController'
import PreviousEntries from '../diary/PreviousEntries'
import leather from './dark_leather.png'
import './Diary.css'

const Diary = () => (
  <div className="Diary" style={{ background: `url('${leather}')` }}>
    <h1 className="Diary__title">Dear Rent Diary!</h1>
    <div className="Diary__paper">
      <span className="Diary__paper-number">{moment().format('D')}</span>
      <PreviousEntries />
      <DiaryController />
    </div>
  </div>
)

export default Diary
