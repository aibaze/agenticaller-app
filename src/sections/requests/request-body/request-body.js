import { RequestTable } from '../request-table/request-table';
import { useState } from 'react';
import { RequestModal } from '../request-modal/request-modal';
import SvgColor from 'src/components/svg-color';

export function RequestBody({
  sx,
  data,
  currentCoach,
  mailsLoading,
  handleAnswer,
  handleDeleteRequest,
  ...other
}) {
  const TABLE_HEAD_QUESTION = [
    {
      id: 'nameservice',
      label: 'Name & Services',
      width: 350,
      icon: <SvgColor src={`/assets/icons/navbar/ic_calendar.svg`} />,
    },
    { id: 'questions', label: 'Question' },
    { id: 'date', label: 'Date/Time', width: 300 },
    { id: 'status', label: 'Status', width: 50 },
  ];

  const TABLE_HEAD_MESSAGE = [
    {
      id: 'nameservice',
      label: 'Name & Services',
      width: 350,
      icon: <SvgColor src={`/assets/icons/navbar/ic_ecommerce.svg`} />,
    },
    { id: 'message', label: 'Message' },
    { id: 'status', label: 'Status', width: 50 },
  ];
  const [open, setOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState({});
  const handleOpen = (messageData) => {
    setCurrentMessage(messageData);
    setOpen(true);
  };
  const filterDataType = (tableData, type) => {
    if (!tableData || typeof tableData !== 'object') {
      return [];
    }

    const dataArray = Object.values(tableData);

    return dataArray
      .filter((el) => el.priority.toLowerCase() === type.toLowerCase())
      .sort((a, b) => {
        const statusA = a.state === 'ANSWERED' ? 1 : 0;
        const statusB = b.state === 'ANSWERED' ? 1 : 0;

        if (statusA === statusB) {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        }

        return statusA - statusB;
      });
  };

  return (
    <>
      <RequestTable
        data={filterDataType(data, 'request')}
        head={TABLE_HEAD_QUESTION}
        currentCoach={currentCoach}
        openItem={handleOpen}
        deleteItem={handleDeleteRequest}
        noBottomRadius
      />

      <RequestTable
        data={filterDataType(data, 'question')}
        head={TABLE_HEAD_MESSAGE}
        currentCoach={currentCoach}
        openItem={handleOpen}
        deleteItem={handleDeleteRequest}
        noTopRadius
      />

      <RequestModal
        fromPage={'REQUEST_PAGE'}
        open={open}
        setOpen={setOpen}
        currentMessage={currentMessage}
        currentCoach={currentCoach}
        handleAnswer={handleAnswer}
        handleDeleteRequest={handleDeleteRequest}
      />
    </>
  );
}
