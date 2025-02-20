import React from 'react';
import { List, ListItem, ListItemText, Typography, Divider } from '@mui/material';
const QuestionnaireResults = ({ questionnaireResults, multiple }) => {
  if (!questionnaireResults || !questionnaireResults.length) {
    return <></>;
  }

  return (
    <div>
      <Divider />
      {!multiple && (
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          Questionnaire Results
        </Typography>
      )}
      {multiple ? (
        <>
          {questionnaireResults.map((item, index) => (
            <>
              <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                Questionnaire {index + 1}
              </Typography>
              <List>
                {item.questionnaire.map((questionnaire, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={questionnaire.question}
                      secondary={questionnaire.answer}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider />
            </>
          ))}
        </>
      ) : (
        <List>
          {questionnaireResults.map((questionnaire, index) => (
            <ListItem key={index}>
              <ListItemText primary={questionnaire.question} secondary={questionnaire.answer} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default QuestionnaireResults;
