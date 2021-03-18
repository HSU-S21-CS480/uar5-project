import React from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/components/Navigation/style.css';
import logo from '../src/components/Navigation/logo.png';
import compose from '../src/components/Navigation/compose.png';
import star from './star.png';
import profile from './profile.png';
import styled from 'styled-components';
import {
  Navbar,
  Form,
  FormControl,
  Button,
  ListGroup,
  Modal,
  ModalTitle,
  ModalBody,
  ModalFooter
} from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { VoidExpression } from 'typescript';

const App = () => {

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "react");
  const [articles, dispatchArticles] = React.useReducer(articlesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });
  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);

  const handleFetchArticles = React.useCallback(async () => {
    dispatchArticles({ type: 'ARTICLES_FETCH_INIT' });

    try {
      const result = await axios.get(url);
      dispatchArticles({
        type: 'ARTICLES_FETCH_SUCCESS',
        payload: result.data.hits,
      });
    } catch {
      dispatchArticles({ type: 'ARTICLES_FETCH_FAILURE' });
    }
  }, [url]);

  const handleSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
    event.preventDefault();
  };

  React.useEffect(() => {
    handleFetchArticles();
  }, [handleFetchArticles]);

  return (
    <div>
      <Navbar bg="white" sticky='top' className='nav-bar'>
        <a href="/#"><img src={logo} alt="logo" /></a>
        <Navbar.Brand href="#">Bulletin</Navbar.Brand>
        <Navbar.Toggle />
        <SearchForm
          searchTerm={searchTerm}
          onSearchInput={handleSearchInput}
          onSearchSubmit={handleSearchSubmit}
        />
        {/* <Form inline className="center" >
                <FormControl type="text" placeholder="Search" />
                <Button variant="outline-primary">Search</Button>
            </Form > */}
        <Navbar.Collapse className="justify-content-end">
          <a href="#compose"><img src={compose} alt="compose" /></a>
          <Navbar.Text>
            Signed in as: <a href="#login">Uriyah Ann</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>


      <div className="intro">
        <h1 id="intro-header">Welcome to Bulletin</h1>
        <p id="intro-message">Our application allows you to read, create, edit and delete articles. Create an account to begin editing!</p>
      </div>

      {articles.isError && <p> Something went wrong...</p>}

      {articles.isLoading ? (
        <p>Loading...</p>
      ) : (
        <List list={articles.data} />
      )}

    </div>
  );
};

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

type SearchFormProps = {
  searchTerm: string,
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

type ListProps = {
  list: Articles;
};

type ItemProps = {
  item: Article;
  // showModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
  // hideModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

type InputWithLabelProps = {
  id: string;
  value: string;
  type?: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFocused?: boolean;
  children: React.ReactNode;
};

type Article = {
  objectID: string;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
}

type Articles = Array<Article>;

type ArticlesState = {
  data: Articles,
  isLoading: boolean,
  isError: boolean,
};

interface ArticlesFetchInitAction {
  type: 'ARTICLES_FETCH_INIT';
};

interface ArticlesFetchSuccessAction {
  type: 'ARTICLES_FETCH_SUCCESS';
  payload: Articles;
};

interface ArticlesFetchFailureAction {
  type: 'ARTICLES_FETCH_FAILURE';
};

interface ArticlesRemoveAction {
  type: 'REMOVE_ARTICLE';
  payload: Article;
};

type ArticlesAction =
  | ArticlesFetchInitAction
  | ArticlesFetchSuccessAction
  | ArticlesFetchFailureAction
  | ArticlesRemoveAction;


const StyledColumn = styled.span<{ width: string }>`
  padding: 0 5px;
  white-span: nowrap;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  a {
    color: inherit;
  }

  width: ${props => props.width};
`;

const StyledInput = styled.input`
  border: none;
  background-color: transparent;
  font-size: 16px;
`;

const StyledLabel = styled.label`
  border: none;
  background-color: transparent;
  font-size: 16px;
`;

const StyledSearchForm = styled.form`
  padding: 10px 0 20px 0;
  display: flex;
  align-items: baseline;
`;

// COMPONENTS
const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit }: SearchFormProps) => {
  return (
    <Form inline onSubmit={onSearchSubmit} className="center" >
    <FormControl type="text" placeholder="Search" id="search" value={searchTerm} onChange={onSearchInput} />
    <Button variant="outline-primary" type="submit">Search</Button>
  </Form>
  );
  
};


// <StyledSearchForm onSubmit={onSearchSubmit}>
//   <InputWithLabel 
//     id="search"
//     value={searchTerm}
//     isFocused
//     onInputChange={onSearchInput}
//   >
//     SEARCH
//   </InputWithLabel>
//   <Button variant="outline-primary" type="submit"> Search </Button>
// </StyledSearchForm>

const List = ({ list }: ListProps) => (
  <>
    <ListGroup variant="flush">
      {list.map(item => (
        <Item
          key={item.objectID}
          item={item}
        />
      ))}
    </ListGroup>
  </>
);

const Item = ({ item }: ItemProps) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const showModal = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setModalOpen(true);
  }

  const hideModal = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setModalOpen(false);
  }
  return (
    <>
      <ListGroup.Item variant="flush" className="listgroup-item">
        <StyledColumn width="40%" className="col">
          <button type="button" className="btn btn-light" onClick={showModal} ><span className="buttontext"> {item.title}</span></button>
          <Modal
            show={modalOpen}
            onHide={hideModal}
            size="lg"
            centered
            aria-labelledby="contained-modal-title-vcenter">
            <ModalHeader closeButton>
              <ModalTitle id="contained-modal-title-vcenter">{item.title}</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <h2>{ }</h2>
              <p></p>
            </ModalBody>
            <ModalFooter>
              <p>Footer</p>
            </ModalFooter>
          </Modal>
          {/* <p> <a href={item.url}> {item.title}</a></p> */}
        </StyledColumn>

        <StyledColumn width="30%" className="col">
          <img src={profile} alt="profile" className="icon" /><p>{item.author}</p>
        </StyledColumn>

        <StyledColumn width="20%" className="col">
          <img src={star} alt="like" className="icon" /><p>{item.points}</p>
        </StyledColumn>

      </ListGroup.Item>
    </>
  );

};
// UTILITIES

const useSemiPersistentState = (
  key: string,
  initialState: string): [string, (newValue: string) => void] => {
  /** useSemiPersistantState: custom hook
   *  - pass in a key in order to fix overwrite of the 'value' allocated in local storage
   *    when custom hook is used more than once
   *  - give custom hook initial state from outside
   *  - manages state yet synchronizes with the local storage
   *  - no fully consistent; clearing local storage browser deletes relevant data from application
   */

  const isMounted = React.useRef(false);

  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );
  React.useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      localStorage.setItem(key, value);
    }
  }, [value, key]);
  return [value, setValue];
};

const InputWithLabel = ({
  id,
  value,
  type = "text",
  onInputChange,
  isFocused,
  children
}: InputWithLabelProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null!);
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <StyledLabel htmlFor={id}>{children}</StyledLabel>
      <StyledInput
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};
const articlesReducer = (state: ArticlesState, action: ArticlesAction) => {
  switch (action.type) {
    case "ARTICLES_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "ARTICLES_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "ARTICLES_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "REMOVE_ARTICLE":
      return {
        ...state,
        data: state.data.filter(
          (article) => action.payload.objectID !== article.objectID
        ),
      };
    default:
      throw new Error();
  }
};
export default App;
