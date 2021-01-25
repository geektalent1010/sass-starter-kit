import React from 'react';
import styled from 'styled-components';
import Can from '../../../services/casl';
import { colors } from '../../../styles/theme';
import Button from '../../../components/Common/buttons/OriginalButton';
import Card from '../../../components/Common/Card';
import FieldLabel from '../../../components/Common/forms/FieldLabel';
import TextArea from '../../../components/Common/forms/TextArea';
import TextInput from '../../../components/Common/forms/TextInput';

const Wrapper = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  padding-bottom: 1rem;
`;

const DeleteButton = styled(Button)`
  margin-left: 1rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormButtonsWrapper = styled.div`
  padding: 1rem 0;
`;

const CancelButton = styled(Button)`
  margin-left: 1rem;
`;

const Todo = ({
  todo,
  isEditting,
  editTodoID,
  handleEditTitleChange,
  editTitle,
  handleEditDescChange,
  editDescription,
  editTodo,
  deleteTodo,
  putTodo,
  setEdit
}) => (
  <Wrapper>
    <h4>{todo.title}</h4>
    <p>{todo.description}</p>
    <ButtonsWrapper>
      <Button
        onClick={() => editTodo(todo)}
        backgroundColor={colors.indigo600}
        textColor={colors.white}
        hoverBackgroundColor={colors.indigo500}
        activeBackgroundColor={colors.indigo600}
      >
        Edit
      </Button>
      <Can I="delete" a="Post" passThrough>
        {(allowed) => (
          <DeleteButton
            disabled={!allowed}
            onClick={() => deleteTodo(todo)}
            backgroundColor={colors.red500}
            textColor={colors.white}
            hoverBackgroundColor={colors.indigo500}
            activeBackgroundColor={colors.indigo600}
          >
            Delete
          </DeleteButton>
        )}
      </Can>
    </ButtonsWrapper>
    {isEditting && todo.todo_id === editTodoID && (
      <form onSubmit={(event) => putTodo(event, todo)}>
        <Card>
          <TitleWrapper>
            <FieldLabel>Title</FieldLabel>
            <TextInput onChange={handleEditTitleChange} value={editTitle} name="title" />
          </TitleWrapper>
          <DescriptionWrapper>
            <FieldLabel>Description</FieldLabel>
            <TextArea onChange={handleEditDescChange} value={editDescription} name="description" />
          </DescriptionWrapper>
          <FormButtonsWrapper>
            <Button
              type="submit"
              backgroundColor={colors.indigo600}
              textColor={colors.white}
              hoverBackgroundColor={colors.indigo500}
              activeBackgroundColor={colors.indigo600}
            >
              Send
            </Button>
            <CancelButton
              onClick={() => setEdit(false)}
              backgroundColor={colors.red500}
              textColor={colors.white}
              hoverBackgroundColor={colors.indigo500}
              activeBackgroundColor={colors.indigo600}
            >
              Cancel
            </CancelButton>
          </FormButtonsWrapper>
        </Card>
      </form>
    )}
    <hr />
  </Wrapper>
);

export default Todo;
