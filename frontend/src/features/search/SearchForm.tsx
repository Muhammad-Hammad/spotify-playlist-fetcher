import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Tabs from '../../components/Tabs';

const MAX_CHAR_LIMIT = 140;

const CharCount = styled.div<{ exceeded: boolean }>`
  font-size: 14px;
  color: ${({ exceeded }) => (exceeded ? 'red' : '#b3b3b3')};
  margin-top: 8px;
`;
const FormContainer = styled.div`
  text-align: center;
  margin: 50px auto;
  max-width: 600px;
`;

const SearchButton = styled(motion.button)`
  background: #1db954;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  &:hover {
    background: #1ed760;
  }
  &:disabled {
    background: #b3b3b3; /* Light grey background for disabled state */
    color: #666666; /* Darker grey text for disabled state */
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }
`;

const Input = styled(motion.input)`
  padding: 12px 15px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-top: 20px;
  width: 100%;
  font-size: 1rem;
  transition:
    background-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    border-color: #1db954;
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  }
`;

const schema = yup.object().shape({
  searchTerm: yup.string().required('Search term is required'),
  mode: yup.string().required('Mode is required'),
});

interface TabOption {
  content: JSX.Element;
  label: string;
}

interface SearchFormProps {
  onSubmit: (mode: string, term: string) => Promise<void>;
  setMode: (mode: string) => void;
  disabled: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
  onSubmit,
  setMode,
  disabled,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      searchTerm: '',
      mode: 'Song Match', // Default mode value
    },
    resolver: yupResolver(schema),
  });

  const searchTerm = watch('searchTerm');
  const mode = watch('mode');

  const tabs: TabOption[] = [
    {
      label: 'Mood Generator',
      content: <h2>Mood Generator Content</h2>,
    },
    {
      label: 'Song Match',
      content: <h2>Song Match Content</h2>,
    },
    {
      label: 'Artist Match',
      content: <h2>Artist Match Content</h2>,
    },
  ];

  const handleTabChange = (tab: string) => {
    setValue('mode', tab);
    setMode(tab);
  };

  const onSubmitHandler = async () => {
    try {
      await onSubmit(mode, searchTerm);
      reset({ searchTerm: '', mode });
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };
  const isExceeded = searchTerm.length > MAX_CHAR_LIMIT;
  return (
    <FormContainer>
      <Tabs tabs={tabs} value={mode} onTabChange={handleTabChange} />
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Controller
          name="searchTerm"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="Search..."
              {...field}
              whileFocus={{
                scale: 1.01,
                transformOrigin: 'left center',
                position: 'relative',
              }}
            />
          )}
        />

        <SearchButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit(onSubmitHandler)}
          disabled={disabled || !isValid || isExceeded}
        >
          Search
        </SearchButton>
      </div>
      <CharCount exceeded={isExceeded}>
        {searchTerm.length}/{MAX_CHAR_LIMIT}
      </CharCount>
      {errors?.searchTerm ? (
        <p style={{ color: 'red' }}>{errors?.searchTerm?.message}</p>
      ) : null}
    </FormContainer>
  );
};

export default SearchForm;
