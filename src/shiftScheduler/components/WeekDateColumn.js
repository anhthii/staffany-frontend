import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { QUARTER_HEIGHT } from '../constant'
import ShiftModal from './ShiftModal'
import Shift from './Shift'
import { getUserID } from '../../utils/user'
function WeekDateColumn({
  data,
  date,
  onShiftResize,
  onShiftDrag,
  onShiftUpdate,
  onShiftDelete,
  onClick,
}) {
  const [modalData, setModalData] = useState({
    title: 'No title',
    description: '',
  })
  const [hour, setHour] = useState(0)

  const createShift = (e) => {
    // get distance form the week date column to the top
    const rect = e.target.getBoundingClientRect()
    const y = e.clientY - rect.top

    const hourHeight = QUARTER_HEIGHT * 4
    // calculate current hour from the current mouse click position
    const hour = Math.floor(y / hourHeight)

    resetData()
    setHour(hour)
    setShowModal(true)
  }

  const handleOnSave = (data) => {
    // update
    if (data.id) {
      onShiftUpdate(data, data.id, date)
    } else {
      // create new
      const params = {
        // for example: hour - 0 => currentQuarter 1
        // hour - 1 => currentQuarter 5
        date,
        date_id: data ? data.id : 0,
        user_id: getUserID(),
        quarter_start: hour * 4,
        num_quarter: 4,
        title: data.title,
        description: data.description,
      }
      onClick(params)
    }
  }

  const [showModal, setShowModal] = useState(false)

  const onModalDelete = (shiftID) => {
    onShiftDelete(shiftID, date)
    setShowModal(false)
  }

  const resetData = () => {
    setModalData({ title: 'No Title', description: '' })
  }

  return (
    <>
      <div
        className="flex-1 border-solid flex flex-col day relative"
        onMouseDown={createShift}
      >
        {data &&
          data.shifts.map((shift) => (
            <Shift
              key={shift.id}
              data={shift}
              onResize={onShiftResize}
              onDrag={onShiftDrag}
              date={date}
              setModalData={setModalData}
              showModal={() => setShowModal(true)}
            />
          ))}
      </div>
      <ShiftModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleOnSave}
        onDelete={onModalDelete}
        data={modalData}
        setData={setModalData}
        resetData={resetData}
      />
    </>
  )
}

WeekDateColumn.propTypes = {}

export default WeekDateColumn
